import React from "react";
import ReactMarkdown from "react-markdown";
export function ErrorMessage({ error, onClickDismiss, onClickRetry, }) {
    return typeof error === "string" ? (React.createElement("div", { key: "error", className: "message bot error error-body" },
        React.createElement("span", { className: "error-message" },
            "Error: ",
            error),
        React.createElement("span", { className: "error-retry", onClick: onClickRetry },
            React.createElement("i", { className: "codicon codicon-debug-restart inline" }),
            React.createElement("span", null, "Retry")))) : (React.createElement("div", { key: "error", className: `message bot error level-${error.level}` },
        React.createElement("span", { className: "error-title" },
            React.createElement(ReactMarkdown, null, error.title)),
        React.createElement("span", { className: "error-message" },
            React.createElement(ReactMarkdown, null, error.message)),
        React.createElement("div", { className: "error-buttons" },
            !error.disableDismiss && (React.createElement("button", { className: "error-dismiss", onClick: onClickDismiss }, "Dismiss")),
            !error.disableRetry && (React.createElement("button", { className: "error-retry", onClick: onClickRetry },
                React.createElement("i", { className: "codicon codicon-debug-restart inline" }),
                React.createElement("span", null, "Retry"))))));
}
//# sourceMappingURL=ErrorMessage.js.map