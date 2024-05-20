import { webviewApi } from "@pearai/common";
import React from "react";
export declare function MessageExchangeView({
  content,
  onClickDismissError,
  onClickRetry,
  onSendMessage,
}: {
  content: webviewApi.MessageExchangeContent;
  onSendMessage: (message: string) => void;
  onClickDismissError: () => void;
  onClickRetry: () => void;
}): React.JSX.Element;
