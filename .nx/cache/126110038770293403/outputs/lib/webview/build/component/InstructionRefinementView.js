import React, { useState } from "react";
import { ChatInput } from "./ChatInput";
import { ErrorMessage } from "./ErrorMessage";
export function InstructionRefinementView({ content, onSendMessage, onClickDismissError, onClickRetry, }) {
    const [inputText, setInputText] = useState(content.instruction);
    return (React.createElement("div", { className: "instruction-refinement" },
        (() => {
            const type = content.state.type;
            switch (type) {
                case "waitingForBotAnswer":
                    return (React.createElement(React.Fragment, null,
                        React.createElement(ChatInput, { text: inputText, disabled: true }),
                        React.createElement("button", { disabled: true }, content.state.botAction ?? "Generating")));
                case "userCanRefineInstruction":
                    return (React.createElement(React.Fragment, null,
                        React.createElement(ChatInput, { text: inputText, placeholder: "Enter instructions…", onChange: setInputText, onSubmit: () => onSendMessage(inputText), shouldCreateNewLineOnEnter: true }),
                        React.createElement("button", { onClick: () => onSendMessage(inputText) }, "Generate")));
                default: {
                    const exhaustiveCheck = type;
                    throw new Error(`unsupported type: ${exhaustiveCheck}`);
                }
            }
        })(),
        content.error && (React.createElement(ErrorMessage, { error: content.error, onClickDismiss: onClickDismissError, onClickRetry: onClickRetry }))));
}
//# sourceMappingURL=InstructionRefinementView.js.map