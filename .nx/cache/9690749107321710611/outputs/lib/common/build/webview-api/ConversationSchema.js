"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationSchema = exports.messageSchema = exports.selectionSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const ErrorSchema_1 = require("./ErrorSchema");
exports.selectionSchema = zod_1.default.object({
    filename: zod_1.default.string(),
    startLine: zod_1.default.number(),
    endLine: zod_1.default.number(),
    text: zod_1.default.string(),
});
exports.messageSchema = zod_1.default.object({
    author: zod_1.default.union([zod_1.default.literal("user"), zod_1.default.literal("bot")]),
    content: zod_1.default.string(),
});
const messageExchangeContentSchema = zod_1.default.object({
    type: zod_1.default.literal("messageExchange"),
    messages: zod_1.default.array(exports.messageSchema),
    error: ErrorSchema_1.errorSchema.optional(),
    state: zod_1.default.discriminatedUnion("type", [
        zod_1.default.object({
            type: zod_1.default.literal("userCanReply"),
            responsePlaceholder: zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()]),
        }),
        zod_1.default.object({
            type: zod_1.default.literal("waitingForBotAnswer"),
            botAction: zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()]),
        }),
        zod_1.default.object({
            type: zod_1.default.literal("botAnswerStreaming"),
            partialAnswer: zod_1.default.string(),
        }),
    ]),
});
const instructionRefinementContentSchema = zod_1.default.object({
    type: zod_1.default.literal("instructionRefinement"),
    instruction: zod_1.default.string(),
    error: ErrorSchema_1.errorSchema.optional(),
    state: zod_1.default.discriminatedUnion("type", [
        zod_1.default.object({
            type: zod_1.default.literal("userCanRefineInstruction"),
            label: zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()]),
            responseMessage: zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()]),
        }),
        zod_1.default.object({
            type: zod_1.default.literal("waitingForBotAnswer"),
            botAction: zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()]),
        }),
    ]),
});
exports.conversationSchema = zod_1.default.object({
    id: zod_1.default.string(),
    header: zod_1.default.object({
        title: zod_1.default.string(),
        isTitleMessage: zod_1.default.boolean(),
        codicon: zod_1.default.string(),
    }),
    content: zod_1.default.discriminatedUnion("type", [
        messageExchangeContentSchema,
        instructionRefinementContentSchema,
    ]),
});
//# sourceMappingURL=ConversationSchema.js.map