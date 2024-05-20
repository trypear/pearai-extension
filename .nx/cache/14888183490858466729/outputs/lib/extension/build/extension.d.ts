import * as vscode from "vscode";
export declare const activate: (context: vscode.ExtensionContext) => Promise<
  Readonly<{
    registerTemplate({ template }: { template: string }): Promise<void>;
  }>
>;
export declare const deactivate: () => Promise<void>;
