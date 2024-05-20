import React from "react";
import { ConversationHeader } from "./ConversationHeader";
import { InstructionRefinementView } from "./InstructionRefinementView";
import { MessageExchangeView } from "./MessageExchangeView";
export const ExpandedConversationView = ({ conversation, onSendMessage, onClickDismissError, onClickRetry, onClickDelete, onClickExport, onClickInsertPrompt, }) => {
    const content = conversation.content;
    return (React.createElement("div", { className: `conversation expanded` },
        onClickInsertPrompt ? (React.createElement(ConversationHeader, { conversation: conversation, onIconClick: onClickInsertPrompt })) : (React.createElement(ConversationHeader, { conversation: conversation })),
        (() => {
            const type = content.type;
            switch (type) {
                case "messageExchange":
                    return (React.createElement(MessageExchangeView, { content: content, onSendMessage: onSendMessage, onClickDismissError: onClickDismissError, onClickRetry: onClickRetry }));
                case "instructionRefinement":
                    return (React.createElement(InstructionRefinementView, { content: content, onSendMessage: onSendMessage, onClickDismissError: onClickDismissError, onClickRetry: onClickRetry }));
                default: {
                    const exhaustiveCheck = type;
                    throw new Error(`unsupported type: ${exhaustiveCheck}`);
                }
            }
        })(),
        React.createElement("div", { className: "footer" },
            React.createElement("span", { className: "action-panel" },
                React.createElement("i", { className: "codicon codicon-save inline action-export", title: "Export conversation", onClick: onClickExport }),
                React.createElement("i", { className: "codicon codicon-trash inline action-delete", title: "Delete conversation", onClick: onClickDelete })))));
};
//# sourceMappingURL=ExpandedConversationView.js.map