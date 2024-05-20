"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedTextWithDiagnostics = void 0;
const vscode = __importStar(require("vscode"));
const getActiveEditor_1 = require("../../vscode/getActiveEditor");
const getSelectedTextWithDiagnostics = async ({ diagnosticSeverities, }) => {
    const activeEditor = (0, getActiveEditor_1.getActiveEditor)();
    if (activeEditor == undefined) {
        return undefined;
    }
    const { document, selection } = activeEditor;
    // expand range to beginning and end of line, because ranges tend to be inaccurate:
    const range = new vscode.Range(new vscode.Position(selection.start.line, 0), new vscode.Position(selection.end.line + 1, 0));
    const includedDiagnosticSeverities = diagnosticSeverities.map((diagnostic) => {
        switch (diagnostic) {
            case "error":
                return vscode.DiagnosticSeverity.Error;
            case "warning":
                return vscode.DiagnosticSeverity.Warning;
            case "information":
                return vscode.DiagnosticSeverity.Information;
            case "hint":
                return vscode.DiagnosticSeverity.Hint;
        }
    });
    const diagnostics = vscode.languages
        .getDiagnostics(document.uri)
        .filter((diagnostic) => includedDiagnosticSeverities.includes(diagnostic.severity) &&
        // line based filtering, because the ranges tend to be to inaccurate:
        diagnostic.range.start.line >= range.start.line &&
        diagnostic.range.end.line <= range.end.line)
        .map((diagnostic) => ({
        line: diagnostic.range.start.line,
        message: diagnostic.message,
        source: diagnostic.source,
        code: typeof diagnostic.code === "object"
            ? diagnostic.code.value
            : diagnostic.code,
        severity: diagnostic.severity,
    }));
    if (diagnostics.length === 0) {
        return undefined;
    }
    return annotateSelectionWithDiagnostics({
        selectionText: document.getText(selection),
        selectionStartLine: range.start.line,
        diagnostics,
    });
};
exports.getSelectedTextWithDiagnostics = getSelectedTextWithDiagnostics;
function annotateSelectionWithDiagnostics({ selectionText, selectionStartLine, diagnostics, }) {
    return selectionText
        .split(/[\r\n]+/)
        .map((line, index) => {
        const actualLineNumber = selectionStartLine + index;
        const lineDiagnostics = diagnostics.filter((diagnostic) => diagnostic.line === actualLineNumber);
        return lineDiagnostics.length === 0
            ? line
            : `${line}\n${lineDiagnostics
                .map((diagnostic) => `${getLabel(diagnostic.severity)} ${diagnostic.source}${diagnostic.code}: ${diagnostic.message}`)
                .join("\n")}`;
    })
        .join("\n");
}
function getLabel(severity) {
    switch (severity) {
        case vscode.DiagnosticSeverity.Error:
            return "ERROR";
        case vscode.DiagnosticSeverity.Warning:
            return "WARNING";
        case vscode.DiagnosticSeverity.Information:
            return "INFO";
        case vscode.DiagnosticSeverity.Hint:
            return "HINT";
    }
}
//# sourceMappingURL=getSelectionWithDiagnostics.js.map