import { Telemetry } from "core/util/posthog";
import * as vscode from "vscode";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { getExtensionVersion } from "./util/util";

const pearAISettingsDir = path.join(os.homedir(), '.pearai');
const firstLaunchFlag = path.join(pearAISettingsDir, 'firstLaunch.flag');

async function dynamicImportAndActivate(context: vscode.ExtensionContext) {
  const { activateExtension } = await import("./activation/activate");
  try {
    await activateExtension(context);
  } catch (e) {
    console.log("Error activating extension: ", e);
    vscode.window
      .showInformationMessage(
        "Error activating the PearAI extension.",
        "View Logs",
        "Retry",
      )
      .then((selection) => {
        if (selection === "View Logs") {
          vscode.commands.executeCommand("continue.viewLogs");
        } else if (selection === "Retry") {
          // Reload VS Code window
          vscode.commands.executeCommand("workbench.action.reloadWindow");
        }
      });
  }
}

function getVSCodeSettingsDir() {
  const platform = process.platform;
  if (platform === 'win32') {
    return path.join(os.homedir(), 'AppData', 'Roaming', 'Code', 'User');
  } else if (platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Application Support', 'Code', 'User');
  } else {
    return path.join(os.homedir(), '.config', 'Code', 'User');
  }
}

function promptUserToCopySettings() {
  vscode.window.showInformationMessage('Do you want to copy your current VSCode settings to PearAI?', 'Yes', 'No')
    .then(selection => {
      if (selection === 'Yes') {
        copyVSCodeSettingsToPearAI();
      }
      fs.writeFileSync(firstLaunchFlag, 'This is the first launch flag file');
    });
}

function copyVSCodeSettingsToPearAI() {
  const vscodeSettingsDir = getVSCodeSettingsDir();
  const pearAIUserSettingsDir = path.join(pearAISettingsDir, 'User');

  if (!fs.existsSync(pearAIUserSettingsDir)) {
    fs.mkdirSync(pearAIUserSettingsDir, { recursive: true });
  }

  const filesToCopy = ['settings.json', 'keybindings.json', 'snippets'];
  filesToCopy.forEach(file => {
    const source = path.join(vscodeSettingsDir, file);
    const destination = path.join(pearAIUserSettingsDir, file);
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, destination);
    }
  });

  vscode.window.showInformationMessage('Your VSCode settings have been copied to PearAI.');
}

export function activate(context: vscode.ExtensionContext) {
  if (!fs.existsSync(firstLaunchFlag)) {
    promptUserToCopySettings();
  }
  dynamicImportAndActivate(context);
}

export function deactivate() {
  Telemetry.capture("deactivate", {
    extensionVersion: getExtensionVersion(),
  });

  Telemetry.shutdownPosthogClient();
}