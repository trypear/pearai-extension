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
exports.ApiKeyManager = void 0;
const vscode = __importStar(require("vscode"));
const OPEN_AI_API_KEY_SECRET_KEY = "pearai.openAI.apiKey";
class ApiKeyManager {
    constructor({ secretStorage }) {
        this.messageEmitter = new vscode.EventEmitter();
        this.onUpdate = (listener, thisArg, disposables) => {
            // We only want to execute the last listener to apply the latest change.
            this.messageHandler?.dispose();
            this.messageHandler = this.messageEmitter.event(listener, thisArg, disposables);
            return this.messageHandler;
        };
        this.secretStorage = secretStorage;
    }
    async clearOpenAIApiKey() {
        await this.secretStorage.delete(OPEN_AI_API_KEY_SECRET_KEY);
        this.messageEmitter.fire("clear key");
    }
    async getOpenAIApiKey() {
        return this.secretStorage.get(OPEN_AI_API_KEY_SECRET_KEY);
    }
    async hasOpenAIApiKey() {
        const key = await this.getOpenAIApiKey();
        return key !== undefined;
    }
    async storeApiKey(apiKey) {
        return this.secretStorage.store(OPEN_AI_API_KEY_SECRET_KEY, apiKey);
    }
    async enterOpenAIApiKey() {
        await this.clearOpenAIApiKey();
        const apiKey = await vscode.window.showInputBox({
            title: "Enter your Open AI API key",
            ignoreFocusOut: true,
            placeHolder: "Open AI API key",
        });
        if (apiKey == null) {
            return; // user aborted input
        }
        await this.storeApiKey(apiKey);
        this.messageEmitter.fire("set key");
        vscode.window.showInformationMessage("OpenAI API key stored.");
    }
}
exports.ApiKeyManager = ApiKeyManager;
//# sourceMappingURL=ApiKeyManager.js.map