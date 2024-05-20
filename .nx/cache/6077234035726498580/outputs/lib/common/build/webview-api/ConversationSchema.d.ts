import zod from "zod";
export declare const selectionSchema: zod.ZodObject<
  {
    filename: zod.ZodString;
    startLine: zod.ZodNumber;
    endLine: zod.ZodNumber;
    text: zod.ZodString;
  },
  "strip",
  zod.ZodTypeAny,
  {
    filename: string;
    startLine: number;
    endLine: number;
    text: string;
  },
  {
    filename: string;
    startLine: number;
    endLine: number;
    text: string;
  }
>;
export type Selection = zod.infer<typeof selectionSchema>;
export declare const messageSchema: zod.ZodObject<
  {
    author: zod.ZodUnion<[zod.ZodLiteral<"user">, zod.ZodLiteral<"bot">]>;
    content: zod.ZodString;
  },
  "strip",
  zod.ZodTypeAny,
  {
    author: "user" | "bot";
    content: string;
  },
  {
    author: "user" | "bot";
    content: string;
  }
>;
export type Message = zod.infer<typeof messageSchema>;
declare const messageExchangeContentSchema: zod.ZodObject<
  {
    type: zod.ZodLiteral<"messageExchange">;
    messages: zod.ZodArray<
      zod.ZodObject<
        {
          author: zod.ZodUnion<[zod.ZodLiteral<"user">, zod.ZodLiteral<"bot">]>;
          content: zod.ZodString;
        },
        "strip",
        zod.ZodTypeAny,
        {
          author: "user" | "bot";
          content: string;
        },
        {
          author: "user" | "bot";
          content: string;
        }
      >,
      "many"
    >;
    error: zod.ZodOptional<
      zod.ZodUnion<
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
      >
    >;
    state: zod.ZodDiscriminatedUnion<
      "type",
      [
        zod.ZodObject<
          {
            type: zod.ZodLiteral<"userCanReply">;
            responsePlaceholder: zod.ZodUnion<
              [zod.ZodString, zod.ZodUndefined]
            >;
          },
          "strip",
          zod.ZodTypeAny,
          {
            responsePlaceholder?: string | undefined;
            type: "userCanReply";
          },
          {
            responsePlaceholder?: string | undefined;
            type: "userCanReply";
          }
        >,
        zod.ZodObject<
          {
            type: zod.ZodLiteral<"waitingForBotAnswer">;
            botAction: zod.ZodUnion<[zod.ZodString, zod.ZodUndefined]>;
          },
          "strip",
          zod.ZodTypeAny,
          {
            botAction?: string | undefined;
            type: "waitingForBotAnswer";
          },
          {
            botAction?: string | undefined;
            type: "waitingForBotAnswer";
          }
        >,
        zod.ZodObject<
          {
            type: zod.ZodLiteral<"botAnswerStreaming">;
            partialAnswer: zod.ZodString;
          },
          "strip",
          zod.ZodTypeAny,
          {
            type: "botAnswerStreaming";
            partialAnswer: string;
          },
          {
            type: "botAnswerStreaming";
            partialAnswer: string;
          }
        >
      ]
    >;
  },
  "strip",
  zod.ZodTypeAny,
  {
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
  },
  {
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
>;
export type MessageExchangeContent = zod.infer<
  typeof messageExchangeContentSchema
>;
declare const instructionRefinementContentSchema: zod.ZodObject<
  {
    type: zod.ZodLiteral<"instructionRefinement">;
    instruction: zod.ZodString;
    error: zod.ZodOptional<
      zod.ZodUnion<
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
      >
    >;
    state: zod.ZodDiscriminatedUnion<
      "type",
      [
        zod.ZodObject<
          {
            type: zod.ZodLiteral<"userCanRefineInstruction">;
            label: zod.ZodUnion<[zod.ZodString, zod.ZodUndefined]>;
            responseMessage: zod.ZodUnion<[zod.ZodString, zod.ZodUndefined]>;
          },
          "strip",
          zod.ZodTypeAny,
          {
            label?: string | undefined;
            responseMessage?: string | undefined;
            type: "userCanRefineInstruction";
          },
          {
            label?: string | undefined;
            responseMessage?: string | undefined;
            type: "userCanRefineInstruction";
          }
        >,
        zod.ZodObject<
          {
            type: zod.ZodLiteral<"waitingForBotAnswer">;
            botAction: zod.ZodUnion<[zod.ZodString, zod.ZodUndefined]>;
          },
          "strip",
          zod.ZodTypeAny,
          {
            botAction?: string | undefined;
            type: "waitingForBotAnswer";
          },
          {
            botAction?: string | undefined;
            type: "waitingForBotAnswer";
          }
        >
      ]
    >;
  },
  "strip",
  zod.ZodTypeAny,
  {
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
  },
  {
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
  }
>;
export type InstructionRefinementContent = zod.infer<
  typeof instructionRefinementContentSchema
>;
export declare const conversationSchema: zod.ZodObject<
  {
    id: zod.ZodString;
    header: zod.ZodObject<
      {
        title: zod.ZodString;
        isTitleMessage: zod.ZodBoolean;
        codicon: zod.ZodString;
      },
      "strip",
      zod.ZodTypeAny,
      {
        title: string;
        isTitleMessage: boolean;
        codicon: string;
      },
      {
        title: string;
        isTitleMessage: boolean;
        codicon: string;
      }
    >;
    content: zod.ZodDiscriminatedUnion<
      "type",
      [
        zod.ZodObject<
          {
            type: zod.ZodLiteral<"messageExchange">;
            messages: zod.ZodArray<
              zod.ZodObject<
                {
                  author: zod.ZodUnion<
                    [zod.ZodLiteral<"user">, zod.ZodLiteral<"bot">]
                  >;
                  content: zod.ZodString;
                },
                "strip",
                zod.ZodTypeAny,
                {
                  author: "user" | "bot";
                  content: string;
                },
                {
                  author: "user" | "bot";
                  content: string;
                }
              >,
              "many"
            >;
            error: zod.ZodOptional<
              zod.ZodUnion<
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
              >
            >;
            state: zod.ZodDiscriminatedUnion<
              "type",
              [
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"userCanReply">;
                    responsePlaceholder: zod.ZodUnion<
                      [zod.ZodString, zod.ZodUndefined]
                    >;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    responsePlaceholder?: string | undefined;
                    type: "userCanReply";
                  },
                  {
                    responsePlaceholder?: string | undefined;
                    type: "userCanReply";
                  }
                >,
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"waitingForBotAnswer">;
                    botAction: zod.ZodUnion<[zod.ZodString, zod.ZodUndefined]>;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    botAction?: string | undefined;
                    type: "waitingForBotAnswer";
                  },
                  {
                    botAction?: string | undefined;
                    type: "waitingForBotAnswer";
                  }
                >,
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"botAnswerStreaming">;
                    partialAnswer: zod.ZodString;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    type: "botAnswerStreaming";
                    partialAnswer: string;
                  },
                  {
                    type: "botAnswerStreaming";
                    partialAnswer: string;
                  }
                >
              ]
            >;
          },
          "strip",
          zod.ZodTypeAny,
          {
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
          },
          {
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
        >,
        zod.ZodObject<
          {
            type: zod.ZodLiteral<"instructionRefinement">;
            instruction: zod.ZodString;
            error: zod.ZodOptional<
              zod.ZodUnion<
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
              >
            >;
            state: zod.ZodDiscriminatedUnion<
              "type",
              [
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"userCanRefineInstruction">;
                    label: zod.ZodUnion<[zod.ZodString, zod.ZodUndefined]>;
                    responseMessage: zod.ZodUnion<
                      [zod.ZodString, zod.ZodUndefined]
                    >;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    label?: string | undefined;
                    responseMessage?: string | undefined;
                    type: "userCanRefineInstruction";
                  },
                  {
                    label?: string | undefined;
                    responseMessage?: string | undefined;
                    type: "userCanRefineInstruction";
                  }
                >,
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"waitingForBotAnswer">;
                    botAction: zod.ZodUnion<[zod.ZodString, zod.ZodUndefined]>;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    botAction?: string | undefined;
                    type: "waitingForBotAnswer";
                  },
                  {
                    botAction?: string | undefined;
                    type: "waitingForBotAnswer";
                  }
                >
              ]
            >;
          },
          "strip",
          zod.ZodTypeAny,
          {
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
          },
          {
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
          }
        >
      ]
    >;
  },
  "strip",
  zod.ZodTypeAny,
  {
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
  },
  {
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
  }
>;
export type Conversation = zod.infer<typeof conversationSchema>;
export {};
