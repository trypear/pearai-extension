import React from "react";
import { ConversationHeader } from "./ConversationHeader";
export const CollapsedConversationView = ({ conversation, onClick }) => (React.createElement("div", { className: `conversation collapsed`, onClick: onClick },
    React.createElement(ConversationHeader, { conversation: conversation })));
//# sourceMappingURL=CollapsedConversationView.js.map