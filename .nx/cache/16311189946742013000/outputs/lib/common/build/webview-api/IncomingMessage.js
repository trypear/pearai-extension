"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomingMessageSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const PanelState_1 = require("./PanelState");
exports.incomingMessageSchema = zod_1.default.object({
    data: zod_1.default.object({
        type: zod_1.default.literal("updateState"),
        state: PanelState_1.panelStateSchema,
    }),
});
//# sourceMappingURL=IncomingMessage.js.map