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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const AIClient_1 = require("./ai/AIClient");
const ApiKeyManager_1 = require("./ai/ApiKeyManager");
const ChatController_1 = require("./chat/ChatController");
const ChatModel_1 = require("./chat/ChatModel");
const ChatPanel_1 = require("./chat/ChatPanel");
const ConversationTypesProvider_1 = require("./conversation/ConversationTypesProvider");
const DiffEditorManager_1 = require("./diff/DiffEditorManager");
const indexRepository_1 = require("./index/indexRepository");
const logger_1 = require("./logger");
const activate = async (context) => {
    const apiKeyManager = new ApiKeyManager_1.ApiKeyManager({
        secretStorage: context.secrets,
    });
    const mainOutputChannel = vscode.window.createOutputChannel("PearAI");
    const indexOutputChannel = vscode.window.createOutputChannel("PearAI Index");
    const vscodeLogger = new logger_1.LoggerUsingVSCodeOutput({
        outputChannel: mainOutputChannel,
        level: (0, logger_1.getVSCodeLogLevel)(),
    });
    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration("pearai.logger.level")) {
            vscodeLogger.setLevel((0, logger_1.getVSCodeLogLevel)());
        }
    });
    const hasOpenAIApiKey = await apiKeyManager.hasOpenAIApiKey();
    const chatPanel = new ChatPanel_1.ChatPanel({
        extensionUri: context.extensionUri,
        apiKeyManager,
        hasOpenAIApiKey,
    });
    const chatModel = new ChatModel_1.ChatModel();
    const conversationTypesProvider = new ConversationTypesProvider_1.ConversationTypesProvider({
        extensionUri: context.extensionUri,
    });
    await conversationTypesProvider.loadConversationTypes();
    const ai = new AIClient_1.AIClient({
        apiKeyManager,
        logger: vscodeLogger,
    });
    const chatController = new ChatController_1.ChatController({
        chatPanel,
        chatModel,
        ai,
        diffEditorManager: new DiffEditorManager_1.DiffEditorManager({
            extensionUri: context.extensionUri,
        }),
        getConversationType(id) {
            return conversationTypesProvider.getConversationType(id);
        },
        basicChatTemplateId: "chat-en",
    });
    chatPanel.onDidReceiveMessage(chatController.receivePanelMessage.bind(chatController));
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("pearai.chat", chatPanel), vscode.commands.registerCommand("pearai.enterOpenAIApiKey", apiKeyManager.enterOpenAIApiKey.bind(apiKeyManager)), vscode.commands.registerCommand("pearai.clearOpenAIApiKey", async () => {
        await apiKeyManager.clearOpenAIApiKey();
        vscode.window.showInformationMessage("OpenAI API key cleared.");
    }), vscode.commands.registerCommand("pearai.startConversation", (templateId) => chatController.createConversation(templateId)), vscode.commands.registerCommand("pearai.diagnoseErrors", () => {
        chatController.createConversation("diagnose-errors");
    }), vscode.commands.registerCommand("pearai.explainCode", () => {
        chatController.createConversation("explain-code");
    }), vscode.commands.registerCommand("pearai.findBugs", () => {
        chatController.createConversation("find-bugs");
    }), vscode.commands.registerCommand("pearai.generateCode", () => {
        chatController.createConversation("generate-code");
    }), vscode.commands.registerCommand("pearai.generateUnitTest", () => {
        chatController.createConversation("generate-unit-test");
    }), vscode.commands.registerCommand("pearai.startChat", () => {
        chatController.createConversation("chat-en");
    }), vscode.commands.registerCommand("pearai.editCode", () => {
        chatController.createConversation("edit-code");
    }), vscode.commands.registerCommand("pearai.touchBar.startChat", () => {
        chatController.createConversation("chat-en");
    }), vscode.commands.registerCommand("pearai.showChatPanel", async () => {
        await chatController.showChatPanel();
    }), vscode.commands.registerCommand("pearai.getStarted", async () => {
        await vscode.commands.executeCommand("workbench.action.openWalkthrough", {
            category: `pearai.pearai-extension#pearai`,
        });
    }), vscode.commands.registerCommand("pearai.reloadTemplates", async () => {
        await conversationTypesProvider.loadConversationTypes();
        vscode.window.showInformationMessage("PearAI templates reloaded.");
    }), vscode.commands.registerCommand("pearai.showLogs", () => {
        mainOutputChannel.show(true);
    }), vscode.commands.registerCommand("pearai.indexRepository", () => {
        (0, indexRepository_1.indexRepository)({
            ai: ai,
            outputChannel: indexOutputChannel,
        });
    }));
    return Object.freeze({
        async registerTemplate({ template }) {
            conversationTypesProvider.registerExtensionTemplate({ template });
            await conversationTypesProvider.loadConversationTypes();
        },
    });
};
exports.activate = activate;
const deactivate = async () => {
    // noop
};
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map