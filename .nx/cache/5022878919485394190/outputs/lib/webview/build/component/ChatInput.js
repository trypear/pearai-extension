import React, { useCallback, useRef } from "react";
export const ChatInput = ({ placeholder, disabled, text, onChange, onSubmit, shouldCreateNewLineOnEnter, }) => {
    // callback to automatically focus the input box
    const callbackRef = useCallback((inputElement) => {
        if (inputElement) {
            // delay focus (auto-focussing the input box did not work otherwise)
            setTimeout(() => {
                inputElement.focus();
            }, 50);
        }
    }, []);
    const textareaWrapperRef = useRef(null);
    return (React.createElement("div", { className: "chat-input", ref: textareaWrapperRef },
        React.createElement("textarea", { disabled: disabled, ref: callbackRef, placeholder: placeholder, value: text, rows: 1, onInput: (event) => {
                if (!textareaWrapperRef.current)
                    return;
                // `replicatedValue` is used in the CSS to expand the input
                textareaWrapperRef.current.dataset.replicatedValue =
                    event.currentTarget.value;
                onChange?.(event.currentTarget.value);
            }, 
            // capture onKeyDown to prevent the user from adding enter to the input
            onKeyDown: (event) => {
                if (!(event.target instanceof HTMLTextAreaElement) ||
                    event.shiftKey ||
                    onSubmit == null ||
                    event.key !== "Enter" ||
                    // If we can create new lines, only submit if Ctrl/Cmd+Enter
                    (shouldCreateNewLineOnEnter && !event.ctrlKey && !event.metaKey)) {
                    return;
                }
                const value = event.target.value.trim();
                if (value !== "") {
                    event.preventDefault();
                    event.stopPropagation();
                    onSubmit(value);
                }
            } })));
};
//# sourceMappingURL=ChatInput.js.map