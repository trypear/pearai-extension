import { webviewApi } from "@pearai/common";
import React from "react";
export declare function InstructionRefinementView({
  content,
  onSendMessage,
  onClickDismissError,
  onClickRetry,
}: {
  content: webviewApi.InstructionRefinementContent;
  onSendMessage: (message: string) => void;
  onClickDismissError: () => void;
  onClickRetry: () => void;
}): React.JSX.Element;
