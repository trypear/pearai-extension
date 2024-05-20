"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pearaiTemplateSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const completionHandlerSchema = zod_1.default.discriminatedUnion("type", [
    zod_1.default.object({
        type: zod_1.default.literal("message"),
    }),
    zod_1.default.object({
        type: zod_1.default.literal("update-temporary-editor"),
        botMessage: zod_1.default.string(),
        language: zod_1.default.string().optional(),
    }),
    zod_1.default.object({
        type: zod_1.default.literal("active-editor-diff"),
    }),
]);
const retrievalAugmentationSchema = zod_1.default.object({
    variableName: zod_1.default.string(),
    type: zod_1.default.literal("similarity-search"),
    source: zod_1.default.literal("embedding-file"),
    file: zod_1.default.string(),
    query: zod_1.default.string(),
    threshold: zod_1.default.number().min(0).max(1),
    maxResults: zod_1.default.number().int().min(1),
});
const promptSchema = zod_1.default.object({
    placeholder: zod_1.default.string().optional(),
    retrievalAugmentation: retrievalAugmentationSchema.optional(),
    maxTokens: zod_1.default.number(),
    stop: zod_1.default.array(zod_1.default.string()).optional(),
    temperature: zod_1.default.number().optional(),
    completionHandler: completionHandlerSchema.optional(),
});
const variableBaseSchema = zod_1.default.object({
    name: zod_1.default.string(),
    constraints: zod_1.default
        .array(zod_1.default.discriminatedUnion("type", [
        zod_1.default.object({
            type: zod_1.default.literal("text-length"),
            min: zod_1.default.number(),
        }),
    ]))
        .optional(),
});
const variableSchema = zod_1.default.discriminatedUnion("type", [
    variableBaseSchema.extend({
        type: zod_1.default.literal("constant"),
        time: zod_1.default.literal("conversation-start"),
        value: zod_1.default.string(),
    }),
    variableBaseSchema.extend({
        type: zod_1.default.literal("message"),
        time: zod_1.default.literal("message"),
        index: zod_1.default.number(),
        property: zod_1.default.enum(["content"]),
    }),
    variableBaseSchema.extend({
        type: zod_1.default.literal("context"),
        time: zod_1.default.enum(["conversation-start"]),
    }),
    variableBaseSchema.extend({
        type: zod_1.default.literal("selected-text"),
        time: zod_1.default.enum(["conversation-start", "message"]),
    }),
    variableBaseSchema.extend({
        type: zod_1.default.literal("selected-location-text"),
        time: zod_1.default.enum(["conversation-start"]),
    }),
    variableBaseSchema.extend({
        type: zod_1.default.literal("filename"),
        time: zod_1.default.enum(["conversation-start"]),
    }),
    variableBaseSchema.extend({
        type: zod_1.default.literal("language"),
        time: zod_1.default.enum(["conversation-start"]),
    }),
    variableBaseSchema.extend({
        type: zod_1.default.literal("selected-text-with-diagnostics"),
        time: zod_1.default.literal("conversation-start"),
        severities: zod_1.default.array(zod_1.default.enum(["error", "warning", "information", "hint"])),
    }),
]);
exports.pearaiTemplateSchema = zod_1.default.object({
    id: zod_1.default.string(),
    engineVersion: zod_1.default.literal(0),
    label: zod_1.default.string(),
    description: zod_1.default.string(),
    tags: zod_1.default.array(zod_1.default.string()).optional(),
    header: zod_1.default.object({
        title: zod_1.default.string(),
        useFirstMessageAsTitle: zod_1.default.boolean().optional(),
        icon: zod_1.default.object({
            type: zod_1.default.literal("codicon"),
            value: zod_1.default.string(),
        }),
    }),
    chatInterface: zod_1.default
        .enum(["message-exchange", "instruction-refinement"])
        .optional(),
    isEnabled: zod_1.default.boolean().optional(),
    variables: zod_1.default.array(variableSchema).optional(),
    initialMessage: promptSchema.optional(),
    response: promptSchema,
});
//# sourceMappingURL=PearAITemplate.js.map