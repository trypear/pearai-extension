import * as vscode from "vscode";
import { DiffEditor } from "./DiffEditor";
export declare class DiffEditorManager {
  private extensionUri;
  constructor({ extensionUri }: { extensionUri: vscode.Uri });
  createDiffEditor({
    title,
    editorColumn,
    conversationId,
  }: {
    title: string;
    editorColumn: vscode.ViewColumn;
    conversationId: string;
  }): DiffEditor;
}
