"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedRange = void 0;
const getActiveEditor_1 = require("../../vscode/getActiveEditor");
const getSelectedRange = async () => (0, getActiveEditor_1.getActiveEditor)()?.selection;
exports.getSelectedRange = getSelectedRange;
//# sourceMappingURL=getSelectedRange.js.map