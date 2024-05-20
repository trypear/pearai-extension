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
exports.executeRetrievalAugmentation = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const secure_json_parse_1 = __importDefault(require("secure-json-parse"));
const vscode = __importStar(require("vscode"));
const readFileContent_1 = require("../../vscode/readFileContent");
const cosineSimilarity_1 = require("./cosineSimilarity");
const EmbeddingFile_1 = require("./EmbeddingFile");
async function executeRetrievalAugmentation({ retrievalAugmentation, initVariables, variables, ai, }) {
    const file = retrievalAugmentation.file;
    const fileUri = vscode.Uri.joinPath(vscode.workspace.workspaceFolders?.[0]?.uri ?? vscode.Uri.file(""), ".pearai/embedding", file);
    const fileContent = await (0, readFileContent_1.readFileContent)(fileUri);
    const parsedContent = secure_json_parse_1.default.parse(fileContent);
    const { chunks } = EmbeddingFile_1.embeddingFileSchema.parse(parsedContent);
    // expand query with variables:
    const query = handlebars_1.default.compile(retrievalAugmentation.query, {
        noEscape: true,
    })({
        ...initVariables,
        ...variables,
    });
    const result = await ai.generateEmbedding({
        input: query,
    });
    if (result.type === "error") {
        console.log(result.errorMessage);
        return undefined;
    }
    const queryEmbedding = result.embedding;
    const similarityChunks = chunks
        .map(({ start_position, end_position, content, file, embedding }) => ({
        file,
        startPosition: start_position,
        endPosition: end_position,
        content,
        similarity: (0, cosineSimilarity_1.cosineSimilarity)(embedding, queryEmbedding),
    }))
        .filter(({ similarity }) => similarity >= retrievalAugmentation.threshold);
    similarityChunks.sort((a, b) => b.similarity - a.similarity);
    return similarityChunks
        .slice(0, retrievalAugmentation.maxResults)
        .map((chunk) => ({
        file: chunk.file,
        startPosition: chunk.startPosition,
        endPosition: chunk.endPosition,
        content: chunk.content,
    }));
}
exports.executeRetrievalAugmentation = executeRetrievalAugmentation;
//# sourceMappingURL=executeRetrievalAugmentation.js.map