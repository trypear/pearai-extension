import React from "react";
import { DiffView } from "../component/DiffView";
export const DiffPanelView = ({ panelState, sendMessage }) => {
    if (panelState == null) {
        return React.createElement(React.Fragment, null);
    }
    if (panelState.type !== "diff") {
        throw new Error(`Invalid panel state '${panelState.type}' (expected 'diff'))`);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(DiffView, { oldCode: panelState.oldCode, newCode: panelState.newCode, languageId: panelState.languageId }),
        React.createElement("div", { style: {
                padding: "var(--container-padding)",
                background: "var(--vscode-panel-background)",
                borderTop: "1px solid var(--vscode-panel-border)",
            } },
            React.createElement("button", { onClick: () => {
                    sendMessage({
                        type: "applyDiff",
                    });
                } }, "Apply"))));
};
//# sourceMappingURL=DiffPanelView.js.map