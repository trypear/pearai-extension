import * as vscode from "vscode";
import { ApiKeyManager } from "../ai/ApiKeyManager";
import { ChatModel } from "./ChatModel";
export declare class ChatPanel implements vscode.WebviewViewProvider {
  static readonly id = "pearai.chat";
  private readonly disposables;
  private messageEmitter;
  readonly onDidReceiveMessage: vscode.Event<unknown>;
  private readonly extensionUri;
  private webviewPanel;
  private apiKeyManager;
  private state;
  constructor({
    extensionUri,
    apiKeyManager,
    hasOpenAIApiKey,
  }: {
    readonly extensionUri: vscode.Uri;
    apiKeyManager: ApiKeyManager;
    /** Needed since retrieving it is an async operation */
    hasOpenAIApiKey: boolean;
  });
  private renderPanel;
  resolveWebviewView(webviewView: vscode.WebviewView): Promise<void>;
  update(model: ChatModel): Promise<boolean | undefined>;
  dispose(): void;
}
