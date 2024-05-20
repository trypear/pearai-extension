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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRepository = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const simple_git_1 = require("simple-git");
const vscode = __importStar(require("vscode"));
const splitLinearLines_1 = require("./chunk/splitLinearLines");
async function indexRepository({ ai, outputChannel, }) {
    const repositoryPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (repositoryPath == undefined) {
        vscode.window.showErrorMessage("PearAI: No workspace folder is open.");
        return;
    }
    outputChannel.show(true);
    outputChannel.appendLine(`Indexing repository ${repositoryPath}`);
    const git = (0, simple_git_1.simpleGit)({
        baseDir: repositoryPath,
        binary: "git",
        maxConcurrentProcesses: 6,
        trimmed: false,
    });
    const files = (await git.raw(["ls-files"])).split("\n");
    const chunksWithEmbedding = [];
    let tokenCount = 0;
    let cancelled = false;
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Indexing repository",
        cancellable: true,
    }, async (progress, cancellationToken) => {
        for (const file of files) {
            progress.report({
                message: `Indexing ${file}`,
                increment: 100 / files.length,
            });
            if (cancellationToken.isCancellationRequested) {
                cancelled = true;
                break;
            }
            if (!isSupportedFile(file)) {
                continue;
            }
            // TODO potential bug on windows
            const content = await promises_1.default.readFile(`${repositoryPath}/${file}`, "utf8");
            const chunks = (0, splitLinearLines_1.createSplitLinearLines)({
                maxChunkCharacters: 500, // ~4 char per token
            })(content);
            for (const chunk of chunks) {
                if (cancellationToken.isCancellationRequested) {
                    cancelled = true;
                    break;
                }
                outputChannel.appendLine(`Generating embedding for chunk '${file}' ${chunk.startPosition}:${chunk.endPosition}`);
                try {
                    const embeddingResult = await ai.generateEmbedding({
                        input: chunk.content,
                    });
                    if (embeddingResult.type === "error") {
                        outputChannel.appendLine(`Failed to generate embedding for chunk '${file}' ${chunk.startPosition}:${chunk.endPosition} - ${embeddingResult.errorMessage}}`);
                        console.error(embeddingResult.errorMessage);
                        continue;
                    }
                    chunksWithEmbedding.push({
                        file,
                        start_position: chunk.startPosition,
                        end_position: chunk.endPosition,
                        content: chunk.content,
                        embedding: embeddingResult.embedding,
                    });
                    tokenCount += embeddingResult?.totalTokenCount ?? 0;
                }
                catch (error) {
                    console.error(error);
                    outputChannel.appendLine(`Failed to generate embedding for chunk '${file}' ${chunk.startPosition}:${chunk.endPosition}`);
                }
            }
        }
    });
    if (!cancelled) {
        // TODO potential bug on windows
        const filename = `${repositoryPath}/.pearai/embedding/repository.json`;
        // TODO potential bug on windows
        await promises_1.default.mkdir(`${repositoryPath}/.pearai/embedding`, {
            recursive: true,
        });
        await promises_1.default.writeFile(filename, JSON.stringify({
            version: 0,
            embedding: {
                source: "openai",
                model: "text-embedding-ada-002",
            },
            chunks: chunksWithEmbedding,
        }));
    }
    outputChannel.appendLine("");
    if (cancelled) {
        outputChannel.appendLine("Indexing cancelled");
    }
    outputChannel.appendLine(`Tokens used: ${tokenCount}`);
    outputChannel.appendLine(`Cost: ${(tokenCount / 1000) * 0.0004} USD`);
}
exports.indexRepository = indexRepository;
function isSupportedFile(file) {
    return ((file.endsWith(".js") ||
        file.endsWith(".ts") ||
        file.endsWith(".tsx") ||
        file.endsWith(".sh") ||
        file.endsWith(".yaml") ||
        file.endsWith(".yml") ||
        file.endsWith(".md") ||
        file.endsWith(".css") ||
        file.endsWith(".json") ||
        file.endsWith(".toml") ||
        file.endsWith(".config")) &&
        !(file.endsWith(".min.js") ||
            file.endsWith(".min.css") ||
            file.endsWith("yarn.lock")));
}
//# sourceMappingURL=indexRepository.js.map