"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguage = void 0;
const getActiveEditor_1 = require("../../vscode/getActiveEditor");
const getLanguage = async () => (0, getActiveEditor_1.getActiveEditor)()?.document?.languageId;
exports.getLanguage = getLanguage;
//# sourceMappingURL=getLanguage.js.map