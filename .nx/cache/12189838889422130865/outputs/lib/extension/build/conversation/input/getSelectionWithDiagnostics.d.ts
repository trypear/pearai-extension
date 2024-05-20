import * as vscode from "vscode";
export declare const getSelectedTextWithDiagnostics: ({
  diagnosticSeverities,
}: {
  diagnosticSeverities: Array<"error" | "warning" | "information" | "hint">;
}) => Promise<string | undefined>;
export type DiagnosticInRange = {
  code?: string | number | undefined;
  source?: string | undefined;
  message: string;
  line: number;
  severity: vscode.DiagnosticSeverity;
};
