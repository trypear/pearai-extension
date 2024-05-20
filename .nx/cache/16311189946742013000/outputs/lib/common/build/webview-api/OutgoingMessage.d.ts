import zod from "zod";
export declare const outgoingMessageSchema: zod.ZodDiscriminatedUnion<
  "type",
  [
    zod.ZodObject<
      {
        type: zod.ZodLiteral<"startChat">;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "startChat";
      },
      {
        type: "startChat";
      }
    >,
    zod.ZodObject<
      {
        type: zod.ZodLiteral<"enterOpenAIApiKey">;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "enterOpenAIApiKey";
      },
      {
        type: "enterOpenAIApiKey";
      }
    >,
    zod.ZodObject<
      {
        type: zod.ZodLiteral<"clickCollapsedConversation">;
        data: zod.ZodObject<
          {
            id: zod.ZodString;
          },
          "strip",
          zod.ZodTypeAny,
          {
            id: string;
          },
          {
            id: string;
          }
        >;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "clickCollapsedConversation";
        data: {
          id: string;
        };
      },
      {
        type: "clickCollapsedConversation";
        data: {
          id: string;
        };
      }
    >,
    zod.ZodObject<
      {
        type: zod.ZodLiteral<"deleteConversation">;
        data: zod.ZodObject<
          {
            id: zod.ZodString;
          },
          "strip",
          zod.ZodTypeAny,
          {
            id: string;
          },
          {
            id: string;
          }
        >;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "deleteConversation";
        data: {
          id: string;
        };
      },
      {
        type: "deleteConversation";
        data: {
          id: string;
        };
      }
    >,
    zod.ZodObject<
      {
        type: zod.ZodLiteral<"exportConversation">;
        data: zod.ZodObject<
          {
            id: zod.ZodString;
          },
          "strip",
          zod.ZodTypeAny,
          {
            id: string;
          },
          {
            id: string;
          }
        >;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "exportConversation";
        data: {
          id: string;
        };
      },
      {
        type: "exportConversation";
        data: {
          id: string;
        };
      }
    >,
    zod.ZodObject<
      {
        type: zod.ZodLiteral<"sendMessage">;
        data: zod.ZodObject<
          {
            id: zod.ZodString;
            message: zod.ZodString;
          },
          "strip",
          zod.ZodTypeAny,
          {
            message: string;
            id: string;
          },
          {
            message: string;
            id: string;
          }
        >;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "sendMessage";
        data: {
          message: string;
          id: string;
        };
      },
      {
        type: "sendMessage";
        data: {
          message: string;
          id: string;
        };
      }
    >,
    zod.ZodObject<
      {
        type: zod.ZodLiteral<"reportError">;
        error: zod.ZodUnion<
          [
            zod.ZodString,
            zod.ZodObject<
              {
                title: zod.ZodString;
                message: zod.ZodString;
                level: zod.ZodOptional<
                  zod.ZodDefault<
                    zod.ZodUnion<
                      [zod.ZodLiteral<"error">, zod.ZodLiteral<"warning">]
                    >
                  >
                >;
                disableRetry: zod.ZodOptional<zod.ZodBoolean>;
                disableDismiss: zod.ZodOptional<zod.ZodBoolean>;
              },
              "strip",
              zod.ZodTypeAny,
              {
                level?: "error" | "warning" | undefined;
                disableRetry?: boolean | undefined;
                disableDismiss?: boolean | undefined;
                message: string;
                title: string;
              },
              {
                level?: "error" | "warning" | undefined;
                disableRetry?: boolean | undefined;
                disableDismiss?: boolean | undefined;
                message: string;
                title: string;
              }
            >
          ]
        >;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "reportError";
        error:
          | string
          | {
              level?: "error" | "warning" | undefined;
              disableRetry?: boolean | undefined;
              disableDismiss?: boolean | undefined;
              message: string;
              title: string;
            };
      },
      {
        type: "reportError";
        error:
          | string
          | {
              level?: "error" | "warning" | undefined;
              disableRetry?: boolean | undefined;
              disableDismiss?: boolean | undefined;
              message: string;
              title: string;
            };
      }
    >,
    zod.ZodObject<
      {
        type: zod.ZodLiteral<"dismissError">;
        data: zod.ZodObject<
          {
            id: zod.ZodString;
          },
          "strip",
          zod.ZodTypeAny,
          {
            id: string;
          },
          {
            id: string;
          }
        >;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "dismissError";
        data: {
          id: string;
        };
      },
      {
        type: "dismissError";
        data: {
          id: string;
        };
      }
    >,
    zod.ZodObject<
      {
        type: zod.ZodLiteral<"retry">;
        data: zod.ZodObject<
          {
            id: zod.ZodString;
          },
          "strip",
          zod.ZodTypeAny,
          {
            id: string;
          },
          {
            id: string;
          }
        >;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "retry";
        data: {
          id: string;
        };
      },
      {
        type: "retry";
        data: {
          id: string;
        };
      }
    >,
    zod.ZodObject<
      {
        type: zod.ZodLiteral<"applyDiff">;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "applyDiff";
      },
      {
        type: "applyDiff";
      }
    >,
    zod.ZodObject<
      {
        type: zod.ZodLiteral<"insertPromptIntoEditor">;
        data: zod.ZodObject<
          {
            id: zod.ZodString;
          },
          "strip",
          zod.ZodTypeAny,
          {
            id: string;
          },
          {
            id: string;
          }
        >;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "insertPromptIntoEditor";
        data: {
          id: string;
        };
      },
      {
        type: "insertPromptIntoEditor";
        data: {
          id: string;
        };
      }
    >
  ]
>;
/**
 * A message sent from the webview to the extension.
 */
export type OutgoingMessage = zod.infer<typeof outgoingMessageSchema>;
