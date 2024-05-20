import React from "react";
export declare const ChatInput: React.FC<{
  placeholder?: string;
  disabled?: boolean;
  text: string;
  onChange?: (text: string) => void;
  onSubmit?: (text: string) => void;
  shouldCreateNewLineOnEnter?: boolean;
}>;
