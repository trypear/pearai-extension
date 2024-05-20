import * as vscode from "vscode";
export declare class DiffEditor {
  private container;
  private messageEmitter;
  private messageHandler;
  constructor({
    title,
    editorColumn,
    extensionUri,
    conversationId,
  }: {
    title: string;
    editorColumn: vscode.ViewColumn;
    extensionUri: vscode.Uri;
    conversationId: string;
  });
  onDidReceiveMessage: vscode.Event<unknown>;
  updateDiff({
    oldCode,
    newCode,
    languageId,
  }: {
    oldCode: string;
    newCode: string;
    languageId?: string;
  }): Promise<void>;
}
