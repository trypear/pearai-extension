"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.embeddingFileSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const chunkSchema = zod_1.default.object({
    start_position: zod_1.default.number(),
    end_position: zod_1.default.number(),
    content: zod_1.default.string(),
    file: zod_1.default.string(),
    embedding: zod_1.default.array(zod_1.default.number()),
});
exports.embeddingFileSchema = zod_1.default.object({
    version: zod_1.default.literal(0),
    embedding: zod_1.default.object({
        source: zod_1.default.literal("openai"),
        model: zod_1.default.literal("text-embedding-ada-002"),
    }),
    chunks: zod_1.default.array(chunkSchema),
});
//# sourceMappingURL=EmbeddingFile.js.map