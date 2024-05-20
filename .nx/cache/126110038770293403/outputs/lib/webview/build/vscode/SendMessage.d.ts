import { webviewApi } from "@pearai/common";
export type SendMessage = (message: webviewApi.OutgoingMessage) => void;
export declare const sendMessage: SendMessage;
