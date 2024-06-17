import { Telemetry } from "core/util/posthog";
import * as vscode from "vscode";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { getExtensionVersion } from "./util/util";

const pearAISettingsDir = path.join(os.homedir(), '.pearai-dev');
const firstLaunchFlag = path.join(pearAISettingsDir, 'firstLaunch.flag');

function getPearAIDevSettingsDir() {
  const platform = process.platform;
  if (platform === 'win32') {
    return path.join(process.env.APPDATA || '', 'pearai-dev', 'User');
  } else if (platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Application Support', 'pearai-dev', 'User');
  } else {
    return path.join(os.homedir(), '.config', 'pearai-dev', 'User');
  }
}

async function dynamicImportAndActivate(context: vscode.ExtensionContext) {
  try {
    const { activateExtension } = await import("./activation/activate");
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

function promptUserToCopySettings() {
  vscode.window.showInformationMessage('Do you want to copy your current VSCode settings to the PearAI settings directory?', 'Yes', 'No')
    .then(selection => {
      if (selection === 'Yes') {
        copyVSCodeSettingsToPearAIDir();
      }
      fs.writeFileSync(firstLaunchFlag, 'This is the first launch flag file');
    });
}

function copyVSCodeSettingsToPearAIDir() {
  const vscodeSettingsDir = getVSCodeSettingsDir();
  const pearAIDevSettingsDir = getPearAIDevSettingsDir();

  if (!fs.existsSync(pearAIDevSettingsDir)) {
    fs.mkdirSync(pearAIDevSettingsDir, { recursive: true });
  }

  const itemsToCopy = ['settings.json', 'keybindings.json', 'snippets', 'sync'];
  itemsToCopy.forEach(item => {
    const source = path.join(vscodeSettingsDir, item);
    const destination = path.join(pearAIDevSettingsDir, item);
    if (fs.existsSync(source)) {
      if (fs.lstatSync(source).isDirectory()) {
        copyDirectoryRecursiveSync(source, destination);
      } else {
        fs.copyFileSync(source, destination);
      }
    }
  });
  vscode.window.showInformationMessage('Your VSCode settings have been copied to the PearAI settings directory.');
}

function getVSCodeSettingsDir() {
  const platform = process.platform;
  if (platform === 'win32') {
    return path.join(process.env.APPDATA || '', 'Code', 'User');
  } else if (platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Application Support', 'Code', 'User');
  } else {
    return path.join(os.homedir(), '.config', 'Code', 'User');
  }
}

function copyDirectoryRecursiveSync(source: string, destination: string) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  fs.readdirSync(source).forEach(item => {
    const sourcePath = path.join(source, item);
    const destinationPath = path.join(destination, item);
    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyDirectoryRecursiveSync(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
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
