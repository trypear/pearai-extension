"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConversationFromFile = void 0;
const parsePearAITemplate_1 = require("./parsePearAITemplate");
const readFileContent_1 = require("../../vscode/readFileContent");
const loadConversationFromFile = async (file) => {
    try {
        const parseResult = (0, parsePearAITemplate_1.parsePearAITemplate)(await (0, readFileContent_1.readFileContent)(file));
        if (parseResult.type === "error") {
            return {
                type: "error",
                file,
                error: parseResult.error,
            };
        }
        return {
            type: "success",
            file,
            template: parseResult.template,
        };
    }
    catch (error) {
        return {
            type: "error",
            file,
            error,
        };
    }
};
exports.loadConversationFromFile = loadConversationFromFile;
//# sourceMappingURL=loadPearAITemplateFromFile.js.map