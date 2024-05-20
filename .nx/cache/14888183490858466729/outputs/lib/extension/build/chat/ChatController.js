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
exports.ChatController = void 0;
const common_1 = require("@pearai/common");
const vscode = __importStar(require("vscode"));
const resolveVariables_1 = require("../conversation/input/resolveVariables");
class ChatController {
    constructor({ chatPanel, chatModel, ai, getConversationType, diffEditorManager, basicChatTemplateId, }) {
        this.chatPanel = chatPanel;
        this.chatModel = chatModel;
        this.ai = ai;
        this.getConversationType = getConversationType;
        this.diffEditorManager = diffEditorManager;
        this.basicChatTemplateId = basicChatTemplateId;
        this.generateConversationId = common_1.util.createNextId({
            prefix: "conversation-",
        });
    }
    async updateChatPanel() {
        await this.chatPanel.update(this.chatModel);
    }
    async addAndShowConversation(conversation) {
        this.chatModel.addAndSelectConversation(conversation);
        await this.showChatPanel();
        await this.updateChatPanel();
        return conversation;
    }
    async showChatPanel() {
        await vscode.commands.executeCommand("pearai.chat.focus");
    }
    async receivePanelMessage(rawMessage) {
        const message = common_1.webviewApi.outgoingMessageSchema.parse(rawMessage);
        const type = message.type;
        switch (type) {
            case "enterOpenAIApiKey": {
                await vscode.commands.executeCommand("pearai.enterOpenAIApiKey");
                break;
            }
            case "clickCollapsedConversation": {
                this.chatModel.selectedConversationId = message.data.id;
                await this.updateChatPanel();
                break;
            }
            case "sendMessage": {
                await this.chatModel
                    .getConversationById(message.data.id)
                    ?.answer(message.data.message);
                break;
            }
            case "startChat": {
                await this.createConversation(this.basicChatTemplateId);
                break;
            }
            case "deleteConversation": {
                this.chatModel.deleteConversation(message.data.id);
                await this.updateChatPanel();
                break;
            }
            case "exportConversation": {
                await this.chatModel
                    .getConversationById(message.data.id)
                    ?.exportMarkdown();
                break;
            }
            case "retry": {
                await this.chatModel.getConversationById(message.data.id)?.retry();
                break;
            }
            case "dismissError":
                await this.chatModel
                    .getConversationById(message.data.id)
                    ?.dismissError();
                break;
            case "insertPromptIntoEditor":
                await this.chatModel
                    .getConversationById(message.data.id)
                    ?.insertPromptIntoEditor();
                break;
            case "applyDiff":
            case "reportError": {
                // Architecture debt: there are 2 views, but 1 outgoing message type
                // These are handled in the Conversation
                break;
            }
            default: {
                const exhaustiveCheck = type;
                throw new Error(`unsupported type: ${exhaustiveCheck}`);
            }
        }
    }
    async createConversation(conversationTypeId) {
        try {
            const conversationType = this.getConversationType(conversationTypeId);
            if (conversationType == undefined) {
                throw new Error(`No conversation type found for ${conversationTypeId}`);
            }
            const variableValues = await (0, resolveVariables_1.resolveVariables)(conversationType.variables, {
                time: "conversation-start",
            });
            const result = await conversationType.createConversation({
                conversationId: this.generateConversationId(),
                ai: this.ai,
                updateChatPanel: this.updateChatPanel.bind(this),
                diffEditorManager: this.diffEditorManager,
                initVariables: variableValues,
            });
            if (result.type === "unavailable") {
                if (result.display === "info") {
                    await vscode.window.showInformationMessage(result.message);
                }
                else if (result.display === "error") {
                    await vscode.window.showErrorMessage(result.message);
                }
                else {
                    await vscode.window.showErrorMessage("Required input unavailable");
                }
                return;
            }
            await this.addAndShowConversation(result.conversation);
            if (result.shouldImmediatelyAnswer) {
                await result.conversation.answer();
            }
        }
        catch (error) {
            console.log(error);
            await vscode.window.showErrorMessage(error?.message ?? error);
        }
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=ChatController.js.map