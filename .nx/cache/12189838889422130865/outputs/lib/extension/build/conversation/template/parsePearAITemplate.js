"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePearAITemplate = exports.parsePearAITemplateOrThrow = exports.extractNamedCodeSnippets = void 0;
const marked_1 = require("marked");
const secure_json_parse_1 = __importDefault(require("secure-json-parse"));
const PearAITemplate_1 = require("./PearAITemplate");
class NamedCodeSnippetMap {
    constructor() {
        this.contentByLangInfo = new Map();
    }
    set(langInfo, content) {
        this.contentByLangInfo.set(langInfo, content);
    }
    get(langInfo) {
        const content = this.contentByLangInfo.get(langInfo);
        if (content == null) {
            throw new Error(`Code snippet for lang info '${langInfo}' not found.`);
        }
        return content;
    }
    resolveTemplate(prompt, templateId) {
        prompt.template = this.getHandlebarsTemplate(templateId);
    }
    getHandlebarsTemplate(templateName) {
        return this.get(`template-${templateName}`).replace(/\\`\\`\\`/g, "```");
    }
}
const extractNamedCodeSnippets = (content) => {
    const codeSnippets = new NamedCodeSnippetMap();
    marked_1.marked
        .lexer(content)
        .filter((token) => token.type === "code")
        .forEach((token) => {
        const codeToken = token;
        if (codeToken.lang != null) {
            codeSnippets.set(codeToken.lang, codeToken.text);
        }
    });
    return codeSnippets;
};
exports.extractNamedCodeSnippets = extractNamedCodeSnippets;
function parsePearAITemplateOrThrow(templateAsRdtMarkdown) {
    const parseResult = parsePearAITemplate(templateAsRdtMarkdown);
    if (parseResult.type === "error") {
        throw parseResult.error;
    }
    return parseResult.template;
}
exports.parsePearAITemplateOrThrow = parsePearAITemplateOrThrow;
function parsePearAITemplate(templateAsRdtMarkdown) {
    try {
        const namedCodeSnippets = (0, exports.extractNamedCodeSnippets)(templateAsRdtMarkdown);
        const templateText = namedCodeSnippets.get("json conversation-template");
        const template = PearAITemplate_1.pearaiTemplateSchema.parse(secure_json_parse_1.default.parse(templateText));
        if (template.initialMessage != null) {
            namedCodeSnippets.resolveTemplate(template.initialMessage, "initial-message");
        }
        namedCodeSnippets.resolveTemplate(template.response, "response");
        return {
            type: "success",
            template: template,
        };
    }
    catch (error) {
        return {
            type: "error",
            error,
        };
    }
}
exports.parsePearAITemplate = parsePearAITemplate;
//# sourceMappingURL=parsePearAITemplate.js.map