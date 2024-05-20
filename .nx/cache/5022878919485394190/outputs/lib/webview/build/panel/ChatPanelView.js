import React from "react";
import { CollapsedConversationView } from "../component/CollapsedConversationView";
import { ExpandedConversationView } from "../component/ExpandedConversationView";
const StartChatButton = ({ onClick }) => (React.createElement("div", { className: "start-chat" },
    React.createElement("button", { onClick: onClick }, "Start new chat")));
export const ChatPanelView = ({ panelState, sendMessage }) => {
    if (panelState == null) {
        return (React.createElement(StartChatButton, { onClick: () => sendMessage({ type: "startChat" }) }));
    }
    if (panelState.type !== "chat") {
        throw new Error(`Invalid panel state '${panelState.type}' (expected 'chat'))`);
    }
    if (!panelState.hasOpenAIApiKey) {
        return (React.createElement("div", { className: "enter-api-key" },
            React.createElement("button", { onClick: () => sendMessage({ type: "enterOpenAIApiKey" }) }, "Enter your OpenAI API key"),
            React.createElement("p", null,
                "PearAI uses the OpenAI API and requires an API key to work. You can get an API key from",
                " ",
                React.createElement("a", { href: "https://platform.openai.com/account/api-keys" }, "platform.openai.com/account/api-keys"))));
    }
    if (panelState.conversations.length === 0) {
        return (React.createElement(StartChatButton, { onClick: () => sendMessage({ type: "startChat" }) }));
    }
    return (React.createElement("div", null, panelState.conversations.reverse().map((conversation) => panelState.selectedConversationId === conversation.id ? (React.createElement(ExpandedConversationView, { key: conversation.id, conversation: conversation, onSendMessage: (message) => sendMessage({
            type: "sendMessage",
            data: { id: conversation.id, message },
        }), onClickRetry: () => sendMessage({
            type: "retry",
            data: { id: conversation.id },
        }), onClickDismissError: () => sendMessage({
            type: "dismissError",
            data: { id: conversation.id },
        }), onClickDelete: () => sendMessage({
            type: "deleteConversation",
            data: { id: conversation.id },
        }), onClickExport: () => {
            sendMessage({
                type: "exportConversation",
                data: { id: conversation.id },
            });
        }, onClickInsertPrompt: panelState.surfacePromptForOpenAIPlus
            ? () => {
                sendMessage({
                    type: "insertPromptIntoEditor",
                    data: { id: conversation.id },
                });
            }
            : undefined })) : (React.createElement(CollapsedConversationView, { key: conversation.id, conversation: conversation, onClick: () => sendMessage({
            type: "clickCollapsedConversation",
            data: { id: conversation.id },
        }) })))));
};
//# sourceMappingURL=ChatPanelView.js.map