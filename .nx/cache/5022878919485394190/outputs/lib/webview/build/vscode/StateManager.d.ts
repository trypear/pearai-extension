import { webviewApi } from "@pearai/common";
export declare const registerUpdateListener: (
  listener: (state: webviewApi.PanelState) => void
) => void;
export declare const getState: () =>
  | {
      error?:
        | string
        | {
            level?: "error" | "warning" | undefined;
            disableRetry?: boolean | undefined;
            disableDismiss?: boolean | undefined;
            message: string;
            title: string;
          }
        | undefined;
      selectedConversationId?: string | undefined;
      type: "chat";
      conversations: {
        content:
          | {
              error?:
                | string
                | {
                    level?: "error" | "warning" | undefined;
                    disableRetry?: boolean | undefined;
                    disableDismiss?: boolean | undefined;
                    message: string;
                    title: string;
                  }
                | undefined;
              type: "messageExchange";
              messages: {
                author: "user" | "bot";
                content: string;
              }[];
              state:
                | {
                    responsePlaceholder?: string | undefined;
                    type: "userCanReply";
                  }
                | {
                    botAction?: string | undefined;
                    type: "waitingForBotAnswer";
                  }
                | {
                    type: "botAnswerStreaming";
                    partialAnswer: string;
                  };
            }
          | {
              error?:
                | string
                | {
                    level?: "error" | "warning" | undefined;
                    disableRetry?: boolean | undefined;
                    disableDismiss?: boolean | undefined;
                    message: string;
                    title: string;
                  }
                | undefined;
              type: "instructionRefinement";
              state:
                | {
                    label?: string | undefined;
                    responseMessage?: string | undefined;
                    type: "userCanRefineInstruction";
                  }
                | {
                    botAction?: string | undefined;
                    type: "waitingForBotAnswer";
                  };
              instruction: string;
            };
        id: string;
        header: {
          title: string;
          isTitleMessage: boolean;
          codicon: string;
        };
      }[];
      hasOpenAIApiKey: boolean;
      surfacePromptForOpenAIPlus: boolean;
    }
  | {
      languageId?: string | undefined;
      type: "diff";
      oldCode: string;
      newCode: string;
    }
  | undefined;
