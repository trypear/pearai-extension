"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.panelStateSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const ConversationSchema_1 = require("./ConversationSchema");
const ErrorSchema_1 = require("./ErrorSchema");
exports.panelStateSchema = zod_1.default
    .discriminatedUnion("type", [
    zod_1.default.object({
        type: zod_1.default.literal("chat"),
        conversations: zod_1.default.array(ConversationSchema_1.conversationSchema),
        selectedConversationId: zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()]),
        hasOpenAIApiKey: zod_1.default.boolean(),
        surfacePromptForOpenAIPlus: zod_1.default.boolean(),
        error: ErrorSchema_1.errorSchema.optional(),
    }),
    zod_1.default.object({
        type: zod_1.default.literal("diff"),
        oldCode: zod_1.default.string(),
        newCode: zod_1.default.string(),
        languageId: zod_1.default.string().optional(),
    }),
])
    .optional();
//# sourceMappingURL=PanelState.js.map