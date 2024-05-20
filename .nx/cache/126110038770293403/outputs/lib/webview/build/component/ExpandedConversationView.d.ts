import { webviewApi } from "@pearai/common";
import React from "react";
export declare const ExpandedConversationView: React.FC<{
  conversation: webviewApi.Conversation;
  onSendMessage: (message: string) => void;
  onClickDismissError: () => void;
  onClickRetry: () => void;
  onClickDelete: () => void;
  onClickExport: () => void;
  onClickInsertPrompt?: () => void;
}>;
