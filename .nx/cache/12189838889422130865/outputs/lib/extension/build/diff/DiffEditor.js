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
exports.DiffEditor = void 0;
const vscode = __importStar(require("vscode"));
const WebviewContainer_1 = require("../webview/WebviewContainer");
class DiffEditor {
    constructor({ title, editorColumn, extensionUri, conversationId, }) {
        this.messageEmitter = new vscode.EventEmitter();
        this.onDidReceiveMessage = (listener, thisArg, disposables) => {
            // We only want to execute the last listener to apply the latest change.
            this.messageHandler?.dispose();
            this.messageHandler = this.messageEmitter.event(listener, thisArg, disposables);
            return this.messageHandler;
        };
        const panel = vscode.window.createWebviewPanel(`pearai.diff.${conversationId}`, title, editorColumn);
        const useVisualStudioCodeColors = vscode.workspace
            .getConfiguration("pearai.syntaxHighlighting")
            .get("useVisualStudioCodeColors", false);
        this.container = new WebviewContainer_1.WebviewContainer({
            panelId: "diff",
            panelCssId: useVisualStudioCodeColors
                ? "diff-vscode-colors"
                : "diff-hardcoded-colors",
            isStateReloadingEnabled: true,
            webview: panel.webview,
            extensionUri,
        });
        this.container.onDidReceiveMessage((message) => {
            this.messageEmitter.fire(message);
        });
    }
    async updateDiff({ oldCode, newCode, languageId, }) {
        await this.container.updateState({
            type: "diff",
            oldCode,
            newCode,
            languageId,
        });
    }
}
exports.DiffEditor = DiffEditor;
//# sourceMappingURL=DiffEditor.js.map