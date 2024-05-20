import { webviewApi } from "@pearai/common";
import { vscodeApi } from "./VsCodeApi";
let state = undefined;
let updateListener = undefined;
// safely load state from VS Code
const loadedState = vscodeApi.getState();
try {
    state = webviewApi.panelStateSchema.parse(loadedState);
}
catch (error) {
    console.log({
        loadedState,
        error,
    });
}
const updateState = (newState) => {
    vscodeApi.setState(newState);
    state = newState;
    if (updateListener != null) {
        updateListener(state);
    }
};
window.addEventListener("message", (rawMessage) => {
    const event = webviewApi.incomingMessageSchema.parse(rawMessage);
    const message = event.data;
    if (message.type === "updateState") {
        updateState(message.state);
    }
});
// exposed as Singleton that is managed outside of React
// (to prevent schema change errors from breaking the UI)
export const registerUpdateListener = (listener) => {
    updateListener = listener;
};
export const getState = () => state;
//# sourceMappingURL=StateManager.js.map