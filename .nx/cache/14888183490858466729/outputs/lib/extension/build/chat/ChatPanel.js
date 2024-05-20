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
exports.ChatPanel = void 0;
const vscode = __importStar(require("vscode"));
const WebviewContainer_1 = require("../webview/WebviewContainer");
function getConfigSurfacePromptForOpenAIPlus() {
    return vscode.workspace
        .getConfiguration("pearai.openAI")
        .get("surfacePromptForPlus", false);
}
class ChatPanel {
    constructor({ extensionUri, apiKeyManager, hasOpenAIApiKey, }) {
        this.disposables = [];
        this.messageEmitter = new vscode.EventEmitter();
        this.onDidReceiveMessage = this.messageEmitter.event;
        this.extensionUri = extensionUri;
        this.apiKeyManager = apiKeyManager;
        const surfacePromptForOpenAIPlus = getConfigSurfacePromptForOpenAIPlus();
        this.state = {
            type: "chat",
            selectedConversationId: undefined,
            conversations: [],
            hasOpenAIApiKey,
            surfacePromptForOpenAIPlus,
        };
        this.apiKeyManager.onUpdate(async () => {
            if (this.state?.type !== "chat") {
                return;
            }
            const hasOpenAIApiKey = await this.apiKeyManager.hasOpenAIApiKey();
            if (this.state.hasOpenAIApiKey === hasOpenAIApiKey) {
                return;
            }
            this.state.hasOpenAIApiKey = hasOpenAIApiKey;
            this.renderPanel();
        });
    }
    async renderPanel() {
        return this.webviewPanel?.updateState(this.state);
    }
    async resolveWebviewView(webviewView) {
        this.webviewPanel = new WebviewContainer_1.WebviewContainer({
            panelId: "chat",
            isStateReloadingEnabled: false,
            webview: webviewView.webview,
            extensionUri: this.extensionUri,
        });
        const receiveMessageDisposable = this.webviewPanel.onDidReceiveMessage((message) => {
            this.messageEmitter.fire(message);
        });
        this.disposables.push(webviewView.onDidDispose(() => {
            receiveMessageDisposable.dispose();
            this.webviewPanel = undefined;
        }));
        this.disposables.push(webviewView.onDidChangeVisibility(async () => {
            if (webviewView.visible) {
                return this.renderPanel();
            }
        }));
        // not using await here, to avoid having an infinite load-in-progress indicator
        this.renderPanel();
    }
    async update(model) {
        const conversations = [];
        for (const conversation of model.conversations) {
            conversations.push(await conversation.toWebviewConversation());
        }
        const surfacePromptForOpenAIPlus = getConfigSurfacePromptForOpenAIPlus();
        const hasOpenAIApiKey = await this.apiKeyManager.hasOpenAIApiKey();
        this.state = {
            type: "chat",
            selectedConversationId: model.selectedConversationId,
            conversations,
            hasOpenAIApiKey,
            surfacePromptForOpenAIPlus,
        };
        return this.renderPanel();
    }
    dispose() {
        this.disposables.forEach((disposable) => disposable.dispose());
    }
}
exports.ChatPanel = ChatPanel;
ChatPanel.id = "pearai.chat";
//# sourceMappingURL=ChatPanel.js.map