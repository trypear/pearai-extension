"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilename = void 0;
const getActiveEditor_1 = require("../../vscode/getActiveEditor");
const getFilename = async () => (0, getActiveEditor_1.getActiveEditor)()?.document?.fileName.split("/").pop();
exports.getFilename = getFilename;
//# sourceMappingURL=getFilename.js.map