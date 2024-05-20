"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedText = void 0;
const getActiveEditor_1 = require("../../vscode/getActiveEditor");
const getSelectedText = async () => {
    const activeEditor = (0, getActiveEditor_1.getActiveEditor)();
    return activeEditor?.document?.getText(activeEditor?.selection);
};
exports.getSelectedText = getSelectedText;
//# sourceMappingURL=getSelectedText.js.map