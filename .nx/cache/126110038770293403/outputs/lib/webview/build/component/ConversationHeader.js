import React from "react";
export const ConversationHeader = ({ conversation, onIconClick }) => {
    return (React.createElement("div", { className: "header" },
        React.createElement("i", { className: `codicon codicon-${conversation.header.codicon} inline` }),
        conversation.header.isTitleMessage ? (React.createElement("span", { className: "message user" }, conversation.header.title)) : (conversation.header.title),
        onIconClick && (React.createElement("span", null,
            "\u00A0",
            React.createElement("i", { className: "codicon codicon-eye inline", onClick: onIconClick })))));
};
//# sourceMappingURL=ConversationHeader.js.map