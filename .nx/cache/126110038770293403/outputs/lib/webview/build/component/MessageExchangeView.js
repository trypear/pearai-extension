import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChatInput } from "./ChatInput";
import { ErrorMessage } from "./ErrorMessage";
export function MessageExchangeView({ content, onClickDismissError, onClickRetry, onSendMessage, }) {
    const [inputText, setInputText] = useState("");
    return (React.createElement("div", { className: "message-exchange" },
        content.messages.map((message, i) => (React.createElement("div", { className: `message ${message.author}`, key: i },
            message.author === "user" && message.content,
            message.author === "bot" && (React.createElement(ReactMarkdown, null, message.content))))),
        (() => {
            const type = content.state.type;
            switch (type) {
                case "waitingForBotAnswer":
                    return (React.createElement("div", { className: "message bot" },
                        content.state.botAction ?? "",
                        React.createElement("span", { className: "in-progress" })));
                case "botAnswerStreaming":
                    return (React.createElement("div", { className: "message bot" },
                        React.createElement(ReactMarkdown, null, content.state.partialAnswer ?? ""),
                        React.createElement("span", { className: "in-progress" })));
                case "userCanReply":
                    return (React.createElement(ChatInput, { placeholder: content.state.responsePlaceholder ??
                            content.messages.length > 0
                            ? "Reply…"
                            : "Ask…", text: inputText, onChange: setInputText, onSubmit: () => {
                            onSendMessage(inputText);
                            setInputText("");
                        } }));
                default: {
                    const exhaustiveCheck = type;
                    throw new Error(`unsupported type: ${exhaustiveCheck}`);
                }
            }
        })(),
        content.error && (React.createElement(ErrorMessage, { error: content.error, onClickDismiss: onClickDismissError, onClickRetry: onClickRetry }))));
}
//# sourceMappingURL=MessageExchangeView.js.map