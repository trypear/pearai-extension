import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as vscode from "vscode";

import { ContextMenuConfig, IDE } from "core";
import { CompletionProvider } from "core/autocomplete/completionProvider";
import { ConfigHandler } from "core/config/handler";
import { fetchwithRequestOptions } from "core/util/fetchWithOptions";
import { getConfigJsonPath } from "core/util/paths";
import { ContinueGUIWebviewViewProvider } from "./debugPanel";
import { DiffManager } from "./diff/horizontal";
import { VerticalPerLineDiffManager } from "./diff/verticalPerLine/manager";
import { getPlatform } from "./util/util";
import { VsCodeWebviewProtocol } from "./webviewProtocol";

function getFullScreenTab() {
  const tabs = vscode.window.tabGroups.all.flatMap((tabGroup) => tabGroup.tabs);
  return tabs.find((tab) =>
    (tab.input as any)?.viewType?.endsWith("pearai.continueGUIView"),
  );
}

async function addHighlightedCodeToContext(
  edit: boolean,
  webviewProtocol: VsCodeWebviewProtocol | undefined,
) {
  // Capture highlighted terminal text
  // const activeTerminal = vscode.window.activeTerminal;
  // if (activeTerminal) {
  //   // Copy selected text
  //   const tempCopyBuffer = await vscode.env.clipboard.readText();
  //   await vscode.commands.executeCommand(
  //     "workbench.action.terminal.copySelection",
  //   );
  //   await vscode.commands.executeCommand(
  //     "workbench.action.terminal.clearSelection",
  //   );
  //   const contents = (await vscode.env.clipboard.readText()).trim();
  //   await vscode.env.clipboard.writeText(tempCopyBuffer);

  //   // Add to context
  //   const rangeInFileWithContents = {
  //     filepath: activeTerminal.name,
  //     contents,
  //     range: {
  //       start: {
  //         line: 0,
  //         character: 0,
  //       },
  //       end: {
  //         line: contents.split("\n").length,
  //         character: 0,
  //       },
  //     },
  //   };

  //   webviewProtocol?.request("highlightedCode", {
  //     rangeInFileWithContents,
  //   });
  // }

  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    if (selection.isEmpty) return;
    const range = new vscode.Range(selection.start, selection.end);
    const contents = editor.document.getText(range);
    const rangeInFileWithContents = {
      filepath: editor.document.uri.fsPath,
      contents,
      range: {
        start: {
          line: selection.start.line,
          character: selection.start.character,
        },
        end: {
          line: selection.end.line,
          character: selection.end.character,
        },
      },
    };

    webviewProtocol?.request("highlightedCode", {
      rangeInFileWithContents,
    });
  }
}

async function addEntireFileToContext(
  filepath: vscode.Uri,
  edit: boolean,
  webviewProtocol: VsCodeWebviewProtocol | undefined,
) {
  // If a directory, add all files in the directory
  const stat = await vscode.workspace.fs.stat(filepath);
  if (stat.type === vscode.FileType.Directory) {
    const files = await vscode.workspace.fs.readDirectory(filepath);
    for (const [filename, type] of files) {
      if (type === vscode.FileType.File) {
        addEntireFileToContext(
          vscode.Uri.joinPath(filepath, filename),
          edit,
          webviewProtocol,
        );
      }
    }
    return;
  }

  // Get the contents of the file
  const contents = (await vscode.workspace.fs.readFile(filepath)).toString();
  const rangeInFileWithContents = {
    filepath: filepath.fsPath,
    contents: contents,
    range: {
      start: {
        line: 0,
        character: 0,
      },
      end: {
        line: contents.split(os.EOL).length - 1,
        character: 0,
      },
    },
  };

  webviewProtocol?.request("highlightedCode", {
    rangeInFileWithContents,
  });
}

// Copy everything over from extension.ts
const commandsMap: (
  ide: IDE,
  extensionContext: vscode.ExtensionContext,
  sidebar: ContinueGUIWebviewViewProvider,
  configHandler: ConfigHandler,
  diffManager: DiffManager,
  verticalDiffManager: VerticalPerLineDiffManager,
) => { [command: string]: (...args: any) => any } = (
  ide,
  extensionContext,
  sidebar,
  configHandler,
  diffManager,
  verticalDiffManager,
) => {
  async function streamInlineEdit(
    promptName: keyof ContextMenuConfig,
    fallbackPrompt: string,
    onlyOneInsertion?: boolean,
  ) {
    const config = await configHandler.loadConfig();
    const modelTitle =
      config.experimental?.modelRoles?.inlineEdit ??
      (await sidebar.webviewProtocol.request(
        "getDefaultModelTitle",
        undefined,
      ));
    await verticalDiffManager.streamEdit(
      config.experimental?.contextMenuPrompts?.[promptName] ?? fallbackPrompt,
      modelTitle,
      onlyOneInsertion,
    );
  }
  return {
    "pearai.debug2": async () => {
      const extensionUrl = `${vscode.env.uriScheme}://pearai.pearai/auth?token=TOKEN&refresh=REFRESH`;
      const extensionUrlParsed = vscode.Uri.parse(extensionUrl);
      const callbackUri = await vscode.env.asExternalUri(
        vscode.Uri.parse(extensionUrl),
      );

      vscode.window.showInformationMessage(`${callbackUri.toString(true)}`);

      const creds = await vscode.commands.executeCommand("pearai.getPearAuth");
      console.log("auth:", creds);
    },
    "pearai.getPearAuth": async () => {
      // TODO: This may need some work, for now we dont have vscode ExtensionContext access in the ideProtocol.ts so this will do
      const accessToken = await extensionContext.secrets.get("pearai-token");
      const refreshToken = await extensionContext.secrets.get("pearai-refresh");

      const creds = {
        accessToken: accessToken ? accessToken.toString() : null,
        refreshToken: refreshToken ? refreshToken.toString() : null,
      };

      return creds;
    },
    "pearai.login": async () => {
      const extensionUrl = `${vscode.env.uriScheme}://pearai.pearai/auth`;
      const callbackUri = await vscode.env.asExternalUri(
        vscode.Uri.parse(extensionUrl),
      );

      // TODO: Open the proxy location with vscode redirect
      await vscode.env.openExternal(
        await vscode.env.asExternalUri(
          vscode.Uri.parse(
            `http://localhost:3000/signin?redirect=${callbackUri.toString()}`,
          ),
        ),
      );
    },
    "pearai.updateUserAuth": async (data: {
      accessToken: string;
      refreshToken: string;
    }) => {
      // Ensure that refreshToken and accessToken are both present
      if (!data || !(data.refreshToken && data.accessToken)) {
        vscode.window.showWarningMessage(
          "PearAI: Failed to parse user auth request!",
        );
        return;
      }

      extensionContext.secrets.store("pearai-token", data.accessToken);
      extensionContext.secrets.store("pearai-refresh", data.refreshToken);

      vscode.window.showInformationMessage("PearAI: Successfully logged in!");
    },
    "pearai.acceptDiff": async (newFilepath?: string | vscode.Uri) => {
      if (newFilepath instanceof vscode.Uri) {
        newFilepath = newFilepath.fsPath;
      }
      verticalDiffManager.clearForFilepath(newFilepath, true);
      await diffManager.acceptDiff(newFilepath);
    },
    "pearai.rejectDiff": async (newFilepath?: string | vscode.Uri) => {
      if (newFilepath instanceof vscode.Uri) {
        newFilepath = newFilepath.fsPath;
      }
      verticalDiffManager.clearForFilepath(newFilepath, false);
      await diffManager.rejectDiff(newFilepath);
    },
    "pearai.acceptVerticalDiffBlock": (filepath?: string, index?: number) => {
      verticalDiffManager.acceptRejectVerticalDiffBlock(true, filepath, index);
    },
    "pearai.rejectVerticalDiffBlock": (filepath?: string, index?: number) => {
      verticalDiffManager.acceptRejectVerticalDiffBlock(false, filepath, index);
    },
    "pearai.quickFix": async (message: string, code: string, edit: boolean) => {
      sidebar.webviewProtocol?.request("newSessionWithPrompt", {
        prompt: `${
          edit ? "/edit " : ""
        }${code}\n\nHow do I fix this problem in the above code?: ${message}`,
      });

      if (!edit) {
        vscode.commands.executeCommand("pearai.continueGUIView.focus");
      }
    },
    "pearai.focusContinueInput": async () => {
      if (!getFullScreenTab()) {
        vscode.commands.executeCommand("pearai.continueGUIView.focus");
      }
      sidebar.webviewProtocol?.request("focusContinueInput", undefined);
      await addHighlightedCodeToContext(false, sidebar.webviewProtocol);
    },
    "pearai.focusContinueInputWithoutClear": async () => {
      if (!getFullScreenTab()) {
        vscode.commands.executeCommand("pearai.continueGUIView.focus");
      }
      sidebar.webviewProtocol?.request(
        "focusContinueInputWithoutClear",
        undefined,
      );
      await addHighlightedCodeToContext(true, sidebar.webviewProtocol);
    },
    "pearai.toggleAuxiliaryBar": () => {
      vscode.commands.executeCommand("workbench.action.toggleAuxiliaryBar");
    },
    "pearai.quickEdit": async (prompt?: string) => {
      const selectionEmpty = vscode.window.activeTextEditor?.selection.isEmpty;

      const editor = vscode.window.activeTextEditor;
      const existingHandler = verticalDiffManager.getHandlerForFile(
        editor?.document.uri.fsPath ?? "",
      );
      const previousInput = existingHandler?.input;

      const config = await configHandler.loadConfig();
      let defaultModelTitle =
        config.experimental?.modelRoles?.inlineEdit ??
        (await sidebar.webviewProtocol.request(
          "getDefaultModelTitle",
          undefined,
        ));
      if (!defaultModelTitle) {
        defaultModelTitle = config.models[0]?.title!;
      }
      const quickPickItems =
        config.contextProviders
          ?.filter((provider) => provider.description.type === "normal")
          .map((provider) => {
            return {
              label: provider.description.displayTitle,
              description: provider.description.title,
              detail: provider.description.description,
            };
          }) || [];

      const addContextMsg = quickPickItems.length
        ? " (or press enter to add context first)"
        : "";
      const textInputOptions: vscode.InputBoxOptions = {
        placeHolder: selectionEmpty
          ? `Type instructions to generate code${addContextMsg}`
          : `Describe how to edit the highlighted code${addContextMsg}`,
        title: `${getPlatform() === "mac" ? "Cmd" : "Ctrl"}+I`,
        prompt: `[${defaultModelTitle}]`,
        value: prompt,
      };
      if (previousInput) {
        textInputOptions.value = previousInput + ", ";
        textInputOptions.valueSelection = [
          textInputOptions.value.length,
          textInputOptions.value.length,
        ];
      }

      let text = await vscode.window.showInputBox(textInputOptions);

      if (text === undefined) {
        return;
      }

      if (text.length > 0 || quickPickItems.length === 0) {
        await verticalDiffManager.streamEdit(text, defaultModelTitle);
      } else {
        // Pick context first
        const selectedProviders = await vscode.window.showQuickPick(
          quickPickItems,
          {
            title: "Add Context",
            canPickMany: true,
          },
        );

        let text = await vscode.window.showInputBox(textInputOptions);
        if (text) {
          const llm = await configHandler.llmFromTitle();
          const config = await configHandler.loadConfig();
          const context = (
            await Promise.all(
              selectedProviders?.map((providerTitle) => {
                const provider = config.contextProviders?.find(
                  (provider) =>
                    provider.description.title === providerTitle.description,
                );
                if (!provider) {
                  return [];
                }

                return provider.getContextItems("", {
                  embeddingsProvider: config.embeddingsProvider,
                  reranker: config.reranker,
                  ide,
                  llm,
                  fullInput: text || "",
                  selectedCode: [],
                  fetch: (url, init) =>
                    fetchwithRequestOptions(url, init, config.requestOptions),
                });
              }) || [],
            )
          ).flat();

          text =
            context.map((item) => item.content).join("\n\n") +
            "\n\n---\n\n" +
            text;

          await verticalDiffManager.streamEdit(text, defaultModelTitle);
        }
      }
    },
    "pearai.writeCommentsForCode": async () => {
      streamInlineEdit(
        "comment",
        "Write comments for this code. Do not change anything about the code itself.",
      );
    },
    "pearai.writeDocstringForCode": async () => {
      streamInlineEdit(
        "docstring",
        "Write a docstring for this code. Do not change anything about the code itself.",
        true,
      );
    },
    "pearai.fixCode": async () => {
      streamInlineEdit("fix", "Fix this code");
    },
    "pearai.optimizeCode": async () => {
      streamInlineEdit("optimize", "Optimize this code");
    },
    "pearai.fixGrammar": async () => {
      streamInlineEdit(
        "fixGrammar",
        "If there are any grammar or spelling mistakes in this writing, fix them. Do not make other large changes to the writing.",
      );
    },
    "pearai.viewLogs": async () => {
      // Open ~/.continue/pearai.log
      const logFile = path.join(os.homedir(), ".continue", "pearai.log");
      // Make sure the file/directory exist
      if (!fs.existsSync(logFile)) {
        fs.mkdirSync(path.dirname(logFile), { recursive: true });
        fs.writeFileSync(logFile, "");
      }

      const uri = vscode.Uri.file(logFile);
      await vscode.window.showTextDocument(uri);
    },
    "pearai.debugTerminal": async () => {
      const terminalContents = await ide.getTerminalContents();
      vscode.commands.executeCommand("pearai.continueGUIView.focus");
      sidebar.webviewProtocol?.request("userInput", {
        input: `I got the following error, can you please help explain how to fix it?\n\n${terminalContents.trim()}`,
      });
    },
    "pearai.hideInlineTip": () => {
      vscode.workspace
        .getConfiguration("continue")
        .update("showInlineTip", false, vscode.ConfigurationTarget.Global);
    },

    // Commands without keyboard shortcuts
    "pearai.addModel": () => {
      vscode.commands.executeCommand("pearai.continueGUIView.focus");
      sidebar.webviewProtocol?.request("addModel", undefined);
    },
    "pearai.openSettingsUI": () => {
      vscode.commands.executeCommand("pearai.continueGUIView.focus");
      sidebar.webviewProtocol?.request("openSettings", undefined);
    },
    "pearai.sendMainUserInput": (text: string) => {
      sidebar.webviewProtocol?.request("userInput", {
        input: text,
      });
    },
    "pearai.shareSession": () => {
      sidebar.sendMainUserInput("/share");
    },
    "pearai.selectRange": (startLine: number, endLine: number) => {
      if (!vscode.window.activeTextEditor) {
        return;
      }
      vscode.window.activeTextEditor.selection = new vscode.Selection(
        startLine,
        0,
        endLine,
        0,
      );
    },
    "pearai.foldAndUnfold": (
      foldSelectionLines: number[],
      unfoldSelectionLines: number[],
    ) => {
      vscode.commands.executeCommand("editor.unfold", {
        selectionLines: unfoldSelectionLines,
      });
      vscode.commands.executeCommand("editor.fold", {
        selectionLines: foldSelectionLines,
      });
    },
    "pearai.sendToTerminal": (text: string) => {
      ide.runCommand(text);
    },
    "pearai.newSession": () => {
      sidebar.webviewProtocol?.request("newSession", undefined);
    },
    "pearai.viewHistory": () => {
      sidebar.webviewProtocol?.request("viewHistory", undefined);
    },
    "pearai.toggleFullScreen": () => {
      // Check if full screen is already open by checking open tabs
      const fullScreenTab = getFullScreenTab();

      // Check if the active editor is the Continue GUI View
      if (fullScreenTab && fullScreenTab.isActive) {
        //Full screen open and focused - close it
        vscode.commands.executeCommand("workbench.action.closeActiveEditor"); //this will trigger the onDidDispose listener below
        return;
      }

      if (fullScreenTab) {
        //Full screen open, but not focused - focus it
        // Focus the tab
        const openOptions = {
          preserveFocus: true,
          preview: fullScreenTab.isPreview,
          viewColumn: fullScreenTab.group.viewColumn,
        };

        vscode.commands.executeCommand(
          "vscode.open",
          (fullScreenTab.input as any).uri,
          openOptions,
        );
        return;
      }

      //Full screen not open - open it

      // Close the sidebar.webviews
      // vscode.commands.executeCommand("workbench.action.closeSidebar");
      vscode.commands.executeCommand("workbench.action.closeAuxiliaryBar");
      // vscode.commands.executeCommand("workbench.action.toggleZenMode");

      //create the full screen panel
      let panel = vscode.window.createWebviewPanel(
        "pearai.continueGUIView",
        "PearAI",
        vscode.ViewColumn.One,
      );

      //Add content to the panel
      panel.webview.html = sidebar.getSidebarContent(
        extensionContext,
        panel,
        ide,
        configHandler,
        verticalDiffManager,
        undefined,
        undefined,
        true,
      );

      //When panel closes, reset the webview and focus
      panel.onDidDispose(
        () => {
          sidebar.resetWebviewProtocolWebview();
          vscode.commands.executeCommand("pearai.focusContinueInput");
        },
        null,
        extensionContext.subscriptions,
      );
    },
    "pearai.openConfigJson": () => {
      ide.openFile(getConfigJsonPath());
    },
    "pearai.selectFilesAsContext": (
      firstUri: vscode.Uri,
      uris: vscode.Uri[],
    ) => {
      vscode.commands.executeCommand("pearai.continueGUIView.focus");

      for (const uri of uris) {
        addEntireFileToContext(uri, false, sidebar.webviewProtocol);
      }
    },
    "pearai.updateAllReferences": (filepath: vscode.Uri) => {
      // Get the cursor position in the editor
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const position = editor.selection.active;
      sidebar.sendMainUserInput(
        `/references ${filepath.fsPath} ${position.line} ${position.character}`,
      );
    },
    "pearai.logAutocompleteOutcome": (
      completionId: string,
      completionProvider: CompletionProvider,
    ) => {
      completionProvider.accept(completionId);
    },
    "pearai.toggleTabAutocompleteEnabled": () => {
      const config = vscode.workspace.getConfiguration("continue");
      const enabled = config.get("enableTabAutocomplete");
      config.update(
        "enableTabAutocomplete",
        !enabled,
        vscode.ConfigurationTarget.Global,
      );
    },
  };
};

export function registerAllCommands(
  context: vscode.ExtensionContext,
  ide: IDE,
  extensionContext: vscode.ExtensionContext,
  sidebar: ContinueGUIWebviewViewProvider,
  configHandler: ConfigHandler,
  diffManager: DiffManager,
  verticalDiffManager: VerticalPerLineDiffManager,
) {
  for (const [command, callback] of Object.entries(
    commandsMap(
      ide,
      extensionContext,
      sidebar,
      configHandler,
      diffManager,
      verticalDiffManager,
    ),
  )) {
    context.subscriptions.push(
      vscode.commands.registerCommand(command, callback),
    );
  }
}
