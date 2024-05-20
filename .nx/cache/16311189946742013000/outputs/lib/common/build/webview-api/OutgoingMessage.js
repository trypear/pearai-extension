"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outgoingMessageSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const ErrorSchema_1 = require("./ErrorSchema");
exports.outgoingMessageSchema = zod_1.default.discriminatedUnion("type", [
    zod_1.default.object({
        type: zod_1.default.literal("startChat"),
    }),
    zod_1.default.object({
        type: zod_1.default.literal("enterOpenAIApiKey"),
    }),
    zod_1.default.object({
        type: zod_1.default.literal("clickCollapsedConversation"),
        data: zod_1.default.object({
            id: zod_1.default.string(),
        }),
    }),
    zod_1.default.object({
        type: zod_1.default.literal("deleteConversation"),
        data: zod_1.default.object({
            id: zod_1.default.string(),
        }),
    }),
    zod_1.default.object({
        type: zod_1.default.literal("exportConversation"),
        data: zod_1.default.object({
            id: zod_1.default.string(),
        }),
    }),
    zod_1.default.object({
        type: zod_1.default.literal("sendMessage"),
        data: zod_1.default.object({
            id: zod_1.default.string(),
            message: zod_1.default.string(),
        }),
    }),
    zod_1.default.object({
        type: zod_1.default.literal("reportError"),
        error: ErrorSchema_1.errorSchema,
    }),
    zod_1.default.object({
        type: zod_1.default.literal("dismissError"),
        data: zod_1.default.object({
            id: zod_1.default.string(),
        }),
    }),
    zod_1.default.object({
        type: zod_1.default.literal("retry"),
        data: zod_1.default.object({
            id: zod_1.default.string(),
        }),
    }),
    zod_1.default.object({
        type: zod_1.default.literal("applyDiff"),
    }),
    zod_1.default.object({
        type: zod_1.default.literal("insertPromptIntoEditor"),
        data: zod_1.default.object({
            id: zod_1.default.string(),
        }),
    }),
]);
//# sourceMappingURL=OutgoingMessage.js.map