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
exports.ConversationType = void 0;
const vscode = __importStar(require("vscode"));
const Conversation_1 = require("./Conversation");
class ConversationType {
    constructor({ template, source, }) {
        this.template = template;
        this.id = template.id;
        this.label = template.label;
        this.description = template.description;
        this.source = source;
        this.variables = template.variables;
    }
    get tags() {
        return this.template.tags;
    }
    async createConversation({ conversationId, ai, updateChatPanel, initVariables, diffEditorManager, }) {
        return {
            type: "success",
            conversation: new Conversation_1.Conversation({
                id: conversationId,
                initVariables,
                ai: ai,
                updateChatPanel,
                template: this.template,
                diffEditorManager,
                diffData: await this.getDiffData(),
            }),
            shouldImmediatelyAnswer: this.template.initialMessage != null,
        };
    }
    hasDiffCompletionHandler() {
        const template = this.template;
        return (template.initialMessage?.completionHandler?.type ===
            "active-editor-diff" ||
            template.response.completionHandler?.type === "active-editor-diff");
    }
    async getDiffData() {
        if (!this.hasDiffCompletionHandler()) {
            return undefined;
        }
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor == null) {
            throw new Error("active editor required");
        }
        const document = activeEditor.document;
        const range = activeEditor.selection;
        const selectedText = document.getText(range);
        if (selectedText.trim().length === 0) {
            throw new Error("no selection");
        }
        const filename = document.fileName.split("/").pop();
        if (filename == undefined) {
            throw new Error("no filename");
        }
        return {
            filename,
            language: document.languageId,
            selectedText,
            range,
            editor: activeEditor,
        };
    }
}
exports.ConversationType = ConversationType;
//# sourceMappingURL=ConversationType.js.map