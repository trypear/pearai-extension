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
exports.AIClient = void 0;
const modelfusion_1 = require("modelfusion");
const vscode = __importStar(require("vscode"));
const zod_1 = require("zod");
function getOpenAIBaseUrl() {
    return (vscode.workspace
        .getConfiguration("pearai.openAI")
        .get("baseUrl", "https://api.openai.com/v1/")
        // Ensure that the base URL doesn't have a trailing slash:
        .replace(/\/$/, ""));
}
function getModel() {
    return zod_1.z
        .enum([
        "gpt-4",
        "gpt-4-32k",
        "gpt-4-1106-preview",
        "gpt-4-0125-preview",
        "gpt-4-turbo-preview",
        "gpt-3.5-turbo",
        "gpt-3.5-turbo-16k",
        "gpt-3.5-turbo-1106",
        "gpt-3.5-turbo-0125",
        "llama.cpp",
    ])
        .parse(vscode.workspace.getConfiguration("pearai").get("model"));
}
class AIClient {
    constructor({ apiKeyManager, logger, }) {
        this.apiKeyManager = apiKeyManager;
        this.logger = logger;
    }
    async getOpenAIApiConfiguration() {
        const apiKey = await this.apiKeyManager.getOpenAIApiKey();
        if (apiKey == undefined) {
            throw new Error("No OpenAI API key found. " +
                "Please enter your OpenAI API key with the 'PearAI: Enter OpenAI API key' command.");
        }
        return modelfusion_1.openai.Api({
            baseUrl: getOpenAIBaseUrl(),
            apiKey,
        });
    }
    async getTextStreamingModel({ maxTokens, stop, temperature = 0, }) {
        const modelConfiguration = getModel();
        return modelConfiguration === "llama.cpp"
            ? modelfusion_1.llamacpp
                .CompletionTextGenerator({
                // TODO the prompt format needs to be configurable for non-Llama2 models
                promptTemplate: modelfusion_1.llamacpp.prompt.Llama2,
                maxGenerationTokens: maxTokens,
                stopSequences: stop,
                temperature,
            })
                .withInstructionPrompt()
            : modelfusion_1.openai
                .ChatTextGenerator({
                api: await this.getOpenAIApiConfiguration(),
                model: modelConfiguration,
                maxGenerationTokens: maxTokens,
                stopSequences: stop,
                temperature,
                frequencyPenalty: 0,
                presencePenalty: 0,
            })
                .withInstructionPrompt();
    }
    async streamText({ prompt, maxTokens, stop, temperature = 0, }) {
        this.logger.log(["--- Start prompt ---", prompt, "--- End prompt ---"]);
        return (0, modelfusion_1.streamText)({
            model: await this.getTextStreamingModel({ maxTokens, stop, temperature }),
            prompt: { instruction: prompt },
        });
    }
    async generateEmbedding({ input }) {
        try {
            const { embedding, rawResponse } = await (0, modelfusion_1.embed)({
                model: modelfusion_1.openai.TextEmbedder({
                    api: await this.getOpenAIApiConfiguration(),
                    model: "text-embedding-ada-002",
                }),
                value: input,
                fullResponse: true,
            });
            return {
                type: "success",
                embedding,
                totalTokenCount: rawResponse.usage
                    ?.total_tokens,
            };
        }
        catch (error) {
            console.log(error);
            return {
                type: "error",
                errorMessage: error?.message,
            };
        }
    }
}
exports.AIClient = AIClient;
//# sourceMappingURL=AIClient.js.map