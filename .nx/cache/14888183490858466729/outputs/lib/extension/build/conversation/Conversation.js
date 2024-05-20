"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const common_1 = require("@pearai/common");
const handlebars_1 = __importDefault(require("handlebars"));
const vscode = __importStar(require("vscode"));
const resolveVariables_1 = require("./input/resolveVariables");
const executeRetrievalAugmentation_1 = require("./retrieval-augmentation/executeRetrievalAugmentation");
handlebars_1.default.registerHelper({
    eq: (v1, v2) => v1 === v2,
    neq: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
});
class Conversation {
    constructor({ id, initVariables, ai, updateChatPanel, template, diffEditorManager, diffData, }) {
        this.id = id;
        this.ai = ai;
        this.updateChatPanel = updateChatPanel;
        this.messages = [];
        this.initVariables = initVariables;
        this.template = template;
        this.diffEditorManager = diffEditorManager;
        this.diffData = diffData;
        this.state =
            template.initialMessage == null
                ? { type: "userCanReply" }
                : {
                    type: "waitingForBotAnswer",
                    botAction: template.initialMessage.placeholder ?? "Answering",
                };
    }
    async getTitle() {
        const header = this.template.header;
        try {
            const firstMessageContent = this.messages[0]?.content;
            if (header.useFirstMessageAsTitle === true &&
                firstMessageContent != null) {
                return firstMessageContent;
            }
            return await this.evaluateTemplate(header.title);
        }
        catch (error) {
            console.error(error);
            return header.title; // not evaluated
        }
    }
    isTitleMessage() {
        return this.template.header.useFirstMessageAsTitle ?? false
            ? this.messages.length > 0
            : false;
    }
    getCodicon() {
        return this.template.header.icon.value;
    }
    async insertPromptIntoEditor() {
        const prompt = this.messages[0] == null && this.template.initialMessage != null
            ? this.template.initialMessage
            : this.template.response;
        const variables = await this.resolveVariablesAtMessageTime();
        const text = await this.evaluateTemplate(prompt.template, variables);
        const document = await vscode.workspace.openTextDocument({
            language: "markdown",
            content: text,
        });
        await vscode.window.showTextDocument(document);
    }
    async exportMarkdown() {
        const document = await vscode.workspace.openTextDocument({
            language: "markdown",
            content: this.getMarkdownExport(),
        });
        await vscode.window.showTextDocument(document);
    }
    getMarkdownExport() {
        return this.messages
            .flatMap(({ author, content }) => [
            author === "bot" ? "# Answer" : "# Question",
            content,
        ])
            .join("\n\n");
    }
    async resolveVariablesAtMessageTime() {
        return (0, resolveVariables_1.resolveVariables)(this.template.variables, {
            time: "message",
            messages: this.messages,
        });
    }
    async evaluateTemplate(template, variables) {
        if (variables == null) {
            variables = await this.resolveVariablesAtMessageTime();
        }
        // special variable: temporaryEditorContent
        if (this.temporaryEditorContent != undefined) {
            variables.temporaryEditorContent = this.temporaryEditorContent;
        }
        return handlebars_1.default.compile(template, {
            noEscape: true,
        })({
            ...this.initVariables,
            ...variables,
        });
    }
    async executeChat() {
        try {
            const prompt = this.messages[0] == null && this.template.initialMessage != null
                ? this.template.initialMessage
                : this.template.response;
            const variables = await this.resolveVariablesAtMessageTime();
            // if the prompt has a retrieval augmentation, execute it:
            const retrievalAugmentation = prompt.retrievalAugmentation;
            if (retrievalAugmentation != null) {
                variables[retrievalAugmentation.variableName] =
                    await (0, executeRetrievalAugmentation_1.executeRetrievalAugmentation)({
                        retrievalAugmentation,
                        variables,
                        initVariables: this.initVariables,
                        ai: this.ai,
                    });
            }
            const stream = await this.ai.streamText({
                prompt: await this.evaluateTemplate(prompt.template, variables),
                maxTokens: prompt.maxTokens,
                stop: prompt.stop,
                temperature: prompt.temperature,
            });
            let responseUntilNow = "";
            for await (const chunk of stream) {
                responseUntilNow += chunk;
                this.handlePartialCompletion(responseUntilNow, prompt);
            }
            // handle full completion (to allow for cleanup):
            await this.handleCompletion(responseUntilNow, prompt);
        }
        catch (error) {
            console.log(error);
            await this.setError(error?.message ?? "Unknown error");
        }
    }
    async handlePartialCompletion(partialCompletion, prompt) {
        const completionHandler = prompt.completionHandler ?? {
            type: "message",
        };
        const completionHandlerType = completionHandler.type;
        const trimmedCompletion = partialCompletion.trim();
        switch (completionHandlerType) {
            case "update-temporary-editor": {
                this.temporaryEditorContent = trimmedCompletion;
                const language = completionHandler.language;
                await this.updateTemporaryEditor(language != null ? await this.evaluateTemplate(language) : undefined);
                break;
            }
            case "active-editor-diff": {
                this.diffContent = trimmedCompletion;
                await this.updateDiff();
                break;
            }
            case "message": {
                await this.updatePartialBotMessage({
                    content: trimmedCompletion,
                });
                break;
            }
            default: {
                const exhaustiveCheck = completionHandlerType;
                throw new Error(`unsupported property: ${exhaustiveCheck}`);
            }
        }
    }
    async handleCompletion(completionContent, prompt) {
        const completionHandler = prompt.completionHandler ?? {
            type: "message",
        };
        const completionHandlerType = completionHandler.type;
        const trimmedCompletion = completionContent.trim();
        switch (completionHandlerType) {
            case "update-temporary-editor": {
                this.temporaryEditorContent = trimmedCompletion;
                await this.addBotMessage({
                    content: completionHandler.botMessage,
                });
                const language = completionHandler.language;
                await this.updateTemporaryEditor(language != null ? await this.evaluateTemplate(language) : undefined);
                break;
            }
            case "active-editor-diff": {
                this.diffContent = trimmedCompletion;
                await this.addBotMessage({
                    content: "Edit generated",
                    responsePlaceholder: "Describe how you want to change the code…",
                });
                await this.updateDiff();
                break;
            }
            case "message": {
                await this.addBotMessage({
                    content: trimmedCompletion,
                });
                break;
            }
            default: {
                const exhaustiveCheck = completionHandlerType;
                throw new Error(`unsupported property: ${exhaustiveCheck}`);
            }
        }
    }
    async updateTemporaryEditor(language) {
        const temporaryEditorContent = this.temporaryEditorContent;
        if (temporaryEditorContent == undefined) {
            return;
        }
        // introduce local variable to ensure that testDocument is defined:
        const temporaryEditorDocument = this.temporaryEditorDocument ??
            (await vscode.workspace.openTextDocument({
                language,
                content: temporaryEditorContent,
            }));
        this.temporaryEditorDocument = temporaryEditorDocument;
        if (this.temporaryEditor == undefined) {
            this.temporaryEditor = await vscode.window.showTextDocument(temporaryEditorDocument);
        }
        else {
            const currentText = this.temporaryEditor.document.getText();
            let commonPrefix = 0;
            for (let i = 0; i < currentText.length; i++) {
                if (currentText[i] !== temporaryEditorContent[i]) {
                    break;
                }
                commonPrefix++;
            }
            this.temporaryEditor.edit((edit) => {
                edit.replace(new vscode.Range(temporaryEditorDocument.positionAt(commonPrefix), temporaryEditorDocument.positionAt(temporaryEditorDocument.getText().length)), temporaryEditorContent.substring(commonPrefix));
            });
        }
    }
    async updateDiff() {
        const editContent = this.diffContent;
        const diffData = this.diffData;
        if (editContent == undefined || diffData == undefined) {
            return;
        }
        // edit the file content with the editContent:
        const document = diffData.editor.document;
        const originalContent = document.getText();
        const prefix = originalContent.substring(0, document.offsetAt(diffData.range.start));
        const suffix = originalContent.substring(document.offsetAt(diffData.range.end));
        // calculate the minimum number of leading whitespace characters per line in the selected text:
        const minLeadingWhitespace = diffData.selectedText
            .split("\n")
            .map((line) => line.match(/^\s*/)?.[0] ?? "")
            .filter((line) => line.length > 0)
            .reduce((min, line) => Math.min(min, line.length), Infinity);
        // calculate the minimum number of leading whitespace characters per line in the new text:
        const minLeadingWhitespaceNew = editContent
            .split("\n")
            .map((line) => line.match(/^\s*/)?.[0] ?? "")
            .filter((line) => line.length > 0)
            .reduce((min, line) => Math.min(min, line.length), Infinity);
        // add leading whitespace to each line in the new text to match the original text:
        const editContentWithAdjustedWhitespace = editContent
            .split("\n")
            .map((line) => {
            const leadingWhitespace = line.match(/^\s*/)?.[0] ?? "";
            const relativeIndent = leadingWhitespace.length - minLeadingWhitespaceNew;
            const newIndent = Math.max(0, minLeadingWhitespace + relativeIndent);
            return ((newIndent < Infinity ? " ".repeat(newIndent) : "") +
                line.substring(leadingWhitespace.length));
        })
            .join("\n");
        // diff the original file content with the edited file content:
        const editedFileContent = `${prefix}${editContentWithAdjustedWhitespace}${suffix}`;
        if (this.diffEditor == undefined) {
            this.diffEditor = this.diffEditorManager.createDiffEditor({
                title: `${this.template.label} (${diffData.filename})`,
                editorColumn: diffData.editor.viewColumn ?? vscode.ViewColumn.One,
                conversationId: this.id,
            });
        }
        this.diffEditor.onDidReceiveMessage(async (rawMessage) => {
            const message = common_1.webviewApi.outgoingMessageSchema.parse(rawMessage);
            if (message.type === "reportError") {
                this.setError(message.error);
                return;
            }
            if (message.type !== "applyDiff") {
                return;
            }
            const edit = new vscode.WorkspaceEdit();
            edit.replace(document.uri, diffData.range, editContentWithAdjustedWhitespace);
            await vscode.workspace.applyEdit(edit);
            const tabGroups = vscode.window.tabGroups;
            const allTabs = tabGroups.all
                .map((tabGroup) => tabGroup.tabs)
                .flat();
            const tab = allTabs.find((tab) => {
                return (tab.input.viewType ===
                    `mainThreadWebview-pearai.diff.${this.id}`);
            });
            if (tab != undefined) {
                await tabGroups.close(tab);
            }
            this.diffEditor = undefined;
        });
        await this.diffEditor.updateDiff({
            oldCode: originalContent,
            newCode: editedFileContent,
            languageId: document.languageId,
        });
    }
    async retry() {
        this.state = { type: "waitingForBotAnswer" };
        await this.dismissError();
        await this.executeChat();
    }
    async answer(userMessage) {
        if (userMessage != undefined) {
            await this.addUserMessage({ content: userMessage });
        }
        await this.executeChat();
    }
    async addUserMessage({ content, botAction, }) {
        this.messages.push({ author: "user", content });
        this.state = { type: "waitingForBotAnswer", botAction };
        await this.updateChatPanel();
    }
    async addBotMessage({ content, responsePlaceholder, }) {
        this.messages.push({ author: "bot", content });
        this.state = { type: "userCanReply", responsePlaceholder };
        await this.updateChatPanel();
    }
    async updatePartialBotMessage({ content }) {
        this.state = { type: "botAnswerStreaming", partialAnswer: content };
        await this.updateChatPanel();
    }
    async setError(error) {
        this.error = error;
        await this.updateChatPanel();
    }
    async dismissError() {
        this.error = undefined;
        await this.updateChatPanel();
    }
    async toWebviewConversation() {
        const chatInterface = this.template.chatInterface ?? "message-exchange";
        return {
            id: this.id,
            header: {
                title: await this.getTitle(),
                isTitleMessage: this.isTitleMessage(),
                codicon: this.getCodicon(),
            },
            content: chatInterface === "message-exchange"
                ? {
                    type: "messageExchange",
                    messages: this.isTitleMessage()
                        ? this.messages.slice(1)
                        : this.messages,
                    state: this.state,
                    error: this.error,
                }
                : {
                    type: "instructionRefinement",
                    instruction: "",
                    state: this.refinementInstructionState(),
                    error: this.error,
                },
        };
    }
    refinementInstructionState() {
        const { type } = this.state;
        switch (type) {
            case "botAnswerStreaming":
            case "waitingForBotAnswer":
                return {
                    type: "waitingForBotAnswer",
                };
            case "userCanReply":
                return {
                    type: "userCanRefineInstruction",
                };
            default: {
                const exhaustiveCheck = type;
                throw new Error(`unsupported type: ${exhaustiveCheck}`);
            }
        }
    }
}
exports.Conversation = Conversation;
//# sourceMappingURL=Conversation.js.map