"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
class ChatModel {
    constructor() {
        this.conversations = [];
    }
    addAndSelectConversation(conversation) {
        this.conversations.push(conversation);
        this.selectedConversationId = conversation.id;
    }
    getConversationById(id) {
        return this.conversations.find((conversation) => conversation.id === id);
    }
    deleteConversation(id) {
        this.conversations = this.conversations.filter((conversation) => conversation.id !== id);
    }
}
exports.ChatModel = ChatModel;
//# sourceMappingURL=ChatModel.js.map