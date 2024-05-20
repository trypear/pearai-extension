import { webviewApi } from "@pearai/common";
import * as vscode from "vscode";
export declare class WebviewContainer {
  private readonly webview;
  private readonly panelId;
  private readonly panelCssId;
  private readonly extensionUri;
  private readonly isStateReloadingEnabled;
  readonly onDidReceiveMessage: vscode.Event<any>;
  constructor({
    panelId,
    panelCssId,
    webview,
    extensionUri,
    isStateReloadingEnabled,
  }: {
    panelId: "chat" | "diff";
    panelCssId?: string;
    webview: vscode.Webview;
    extensionUri: vscode.Uri;
    isStateReloadingEnabled: boolean;
  });
  updateState(state: webviewApi.PanelState): Promise<boolean>;
  private getUri;
  private createHtml;
}
