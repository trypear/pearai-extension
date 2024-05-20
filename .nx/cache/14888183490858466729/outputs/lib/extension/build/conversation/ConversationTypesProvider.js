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
exports.ConversationTypesProvider = void 0;
const vscode = __importStar(require("vscode"));
const ConversationType_1 = require("./ConversationType");
const loadPearAITemplateFromFile_1 = require("./template/loadPearAITemplateFromFile");
const loadPearAITemplatesFromWorkspace_1 = require("./template/loadPearAITemplatesFromWorkspace");
const parsePearAITemplate_1 = require("./template/parsePearAITemplate");
class ConversationTypesProvider {
    constructor({ extensionUri }) {
        this.extensionTemplates = [];
        this.conversationTypes = new Map();
        this.extensionUri = extensionUri;
    }
    getConversationType(id) {
        return this.conversationTypes.get(id);
    }
    getConversationTypes() {
        return [...this.conversationTypes.values()];
    }
    registerExtensionTemplate({ template }) {
        this.extensionTemplates.push(template);
    }
    async loadConversationTypes() {
        this.conversationTypes.clear();
        await this.loadBuiltInTemplates();
        this.loadExtensionTemplates();
        await this.loadWorkspaceTemplates();
    }
    async loadBuiltInTemplates() {
        const builtInConversationTypes = [
            await this.loadBuiltinTemplate("chat", "chat-en.rdt.md"),
            await this.loadBuiltinTemplate("task", "diagnose-errors.rdt.md"),
            await this.loadBuiltinTemplate("task", "document-code.rdt.md"),
            await this.loadBuiltinTemplate("task", "edit-code.rdt.md"),
            await this.loadBuiltinTemplate("task", "explain-code.rdt.md"),
            await this.loadBuiltinTemplate("task", "explain-code-w-context.rdt.md"),
            await this.loadBuiltinTemplate("task", "find-bugs.rdt.md"),
            await this.loadBuiltinTemplate("task", "generate-code.rdt.md"),
            await this.loadBuiltinTemplate("task", "generate-unit-test.rdt.md"),
            await this.loadBuiltinTemplate("task", "improve-readability.rdt.md"),
        ];
        for (const conversationType of builtInConversationTypes) {
            this.conversationTypes.set(conversationType.id, conversationType);
        }
    }
    async loadBuiltinTemplate(...path) {
        const fileUri = vscode.Uri.joinPath(this.extensionUri, "template", ...path);
        const result = await (0, loadPearAITemplateFromFile_1.loadConversationFromFile)(fileUri);
        if (result.type === "error") {
            throw new Error(`Failed to load chat template '${fileUri.toString()}': ${result.error}`);
        }
        return new ConversationType_1.ConversationType({
            template: result.template,
            source: "built-in",
        });
    }
    loadExtensionTemplates() {
        for (const templateText of this.extensionTemplates) {
            try {
                const result = (0, parsePearAITemplate_1.parsePearAITemplate)(templateText);
                if (result.type === "error") {
                    vscode.window.showErrorMessage("Could not load extension template");
                    continue;
                }
                const template = result.template;
                this.conversationTypes.set(template.id, new ConversationType_1.ConversationType({
                    template,
                    source: "extension",
                }));
            }
            catch (error) {
                vscode.window.showErrorMessage("Could not load extension template");
            }
        }
    }
    async loadWorkspaceTemplates() {
        const workspaceTemplateLoadingResults = await (0, loadPearAITemplatesFromWorkspace_1.loadPearAITemplatesFromWorkspace)();
        for (const loadingResult of workspaceTemplateLoadingResults) {
            if (loadingResult.type === "error") {
                vscode.window.showErrorMessage(`Error loading conversation template from ${loadingResult.file.path}: ${loadingResult.error}`);
                continue;
            }
            if (loadingResult.template.isEnabled === false) {
                continue;
            }
            const type = new ConversationType_1.ConversationType({
                template: loadingResult.template,
                source: "local-workspace",
            });
            this.conversationTypes.set(type.id, type);
        }
    }
}
exports.ConversationTypesProvider = ConversationTypesProvider;
//# sourceMappingURL=ConversationTypesProvider.js.map