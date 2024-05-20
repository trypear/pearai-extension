"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.errorSchema = zod_1.default.union([
    zod_1.default.string(),
    zod_1.default.object({
        title: zod_1.default.string(),
        message: zod_1.default.string(),
        level: zod_1.default
            .union([zod_1.default.literal("error"), zod_1.default.literal("warning")])
            .default("error")
            .optional(),
        disableRetry: zod_1.default.boolean().optional(),
        disableDismiss: zod_1.default.boolean().optional(),
    }),
]);
//# sourceMappingURL=ErrorSchema.js.map