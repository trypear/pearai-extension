"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedLocationText = void 0;
const getActiveEditor_1 = require("../../vscode/getActiveEditor");
const getFilename_1 = require("./getFilename");
const getSelectedLocationText = async () => {
    const activeEditor = (0, getActiveEditor_1.getActiveEditor)();
    if (activeEditor == undefined) {
        return undefined;
    }
    const selectedRange = activeEditor.selection;
    return `${await (0, getFilename_1.getFilename)()} ${selectedRange.start.line + 1}:${selectedRange.end.line + 1}`;
};
exports.getSelectedLocationText = getSelectedLocationText;
//# sourceMappingURL=getSelectedLocationText.js.map