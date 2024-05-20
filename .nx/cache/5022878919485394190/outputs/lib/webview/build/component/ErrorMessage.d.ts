import { webviewApi } from "@pearai/common";
import React from "react";
export declare function ErrorMessage({
  error,
  onClickDismiss,
  onClickRetry,
}: {
  error: webviewApi.Error;
  onClickDismiss: () => void;
  onClickRetry: () => void;
}): React.JSX.Element;
