import * as React from "react";
import { createRoot } from "react-dom/client";
import { ChatPanelView } from "./panel/ChatPanelView";
import { DiffPanelView } from "./panel/DiffPanelView";
import { sendMessage } from "./vscode/SendMessage";
import * as StateManager from "./vscode/StateManager";
const rootElement = document.getElementById("root");
const panel = document.currentScript?.getAttribute("data-panel-id");
const isStateReloadingEnabled = document.currentScript?.getAttribute("data-state-reloading-enabled") ===
    "true";
if (rootElement != undefined) {
    const reactRoot = createRoot(rootElement);
    const render = (panelState) => {
        try {
            reactRoot?.render(React.createElement(React.StrictMode, null, (() => {
                switch (panel) {
                    case "chat":
                        return (React.createElement(ChatPanelView, { sendMessage: sendMessage, panelState: panelState }));
                    case "diff":
                        return (React.createElement(DiffPanelView, { sendMessage: sendMessage, panelState: panelState }));
                    default:
                        return React.createElement("div", null);
                }
            })()));
        }
        catch (error) {
            console.error(error);
        }
    };
    render(isStateReloadingEnabled ? StateManager.getState() : undefined);
    StateManager.registerUpdateListener(render);
}
//# sourceMappingURL=webview.js.map