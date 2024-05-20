import { webviewApi } from "@pearai/common";
import React from "react";
import { SendMessage } from "../vscode/SendMessage";
export declare const ChatPanelView: React.FC<{
  sendMessage: SendMessage;
  panelState: webviewApi.PanelState;
}>;
