import zod from "zod";
declare const retrievalAugmentationSchema: zod.ZodObject<
  {
    variableName: zod.ZodString;
    type: zod.ZodLiteral<"similarity-search">;
    source: zod.ZodLiteral<"embedding-file">;
    file: zod.ZodString;
    query: zod.ZodString;
    threshold: zod.ZodNumber;
    maxResults: zod.ZodNumber;
  },
  "strip",
  zod.ZodTypeAny,
  {
    type: "similarity-search";
    threshold: number;
    file: string;
    source: "embedding-file";
    maxResults: number;
    variableName: string;
    query: string;
  },
  {
    type: "similarity-search";
    threshold: number;
    file: string;
    source: "embedding-file";
    maxResults: number;
    variableName: string;
    query: string;
  }
>;
export type RetrievalAugmentation = zod.infer<
  typeof retrievalAugmentationSchema
>;
declare const promptSchema: zod.ZodObject<
  {
    placeholder: zod.ZodOptional<zod.ZodString>;
    retrievalAugmentation: zod.ZodOptional<
      zod.ZodObject<
        {
          variableName: zod.ZodString;
          type: zod.ZodLiteral<"similarity-search">;
          source: zod.ZodLiteral<"embedding-file">;
          file: zod.ZodString;
          query: zod.ZodString;
          threshold: zod.ZodNumber;
          maxResults: zod.ZodNumber;
        },
        "strip",
        zod.ZodTypeAny,
        {
          type: "similarity-search";
          threshold: number;
          file: string;
          source: "embedding-file";
          maxResults: number;
          variableName: string;
          query: string;
        },
        {
          type: "similarity-search";
          threshold: number;
          file: string;
          source: "embedding-file";
          maxResults: number;
          variableName: string;
          query: string;
        }
      >
    >;
    maxTokens: zod.ZodNumber;
    stop: zod.ZodOptional<zod.ZodArray<zod.ZodString, "many">>;
    temperature: zod.ZodOptional<zod.ZodNumber>;
    completionHandler: zod.ZodOptional<
      zod.ZodDiscriminatedUnion<
        "type",
        [
          zod.ZodObject<
            {
              type: zod.ZodLiteral<"message">;
            },
            "strip",
            zod.ZodTypeAny,
            {
              type: "message";
            },
            {
              type: "message";
            }
          >,
          zod.ZodObject<
            {
              type: zod.ZodLiteral<"update-temporary-editor">;
              botMessage: zod.ZodString;
              language: zod.ZodOptional<zod.ZodString>;
            },
            "strip",
            zod.ZodTypeAny,
            {
              type: "update-temporary-editor";
              botMessage: string;
              language?: string | undefined;
            },
            {
              type: "update-temporary-editor";
              botMessage: string;
              language?: string | undefined;
            }
          >,
          zod.ZodObject<
            {
              type: zod.ZodLiteral<"active-editor-diff">;
            },
            "strip",
            zod.ZodTypeAny,
            {
              type: "active-editor-diff";
            },
            {
              type: "active-editor-diff";
            }
          >
        ]
      >
    >;
  },
  "strip",
  zod.ZodTypeAny,
  {
    maxTokens: number;
    placeholder?: string | undefined;
    retrievalAugmentation?:
      | {
          type: "similarity-search";
          threshold: number;
          file: string;
          source: "embedding-file";
          maxResults: number;
          variableName: string;
          query: string;
        }
      | undefined;
    stop?: string[] | undefined;
    temperature?: number | undefined;
    completionHandler?:
      | {
          type: "message";
        }
      | {
          type: "update-temporary-editor";
          botMessage: string;
          language?: string | undefined;
        }
      | {
          type: "active-editor-diff";
        }
      | undefined;
  },
  {
    maxTokens: number;
    placeholder?: string | undefined;
    retrievalAugmentation?:
      | {
          type: "similarity-search";
          threshold: number;
          file: string;
          source: "embedding-file";
          maxResults: number;
          variableName: string;
          query: string;
        }
      | undefined;
    stop?: string[] | undefined;
    temperature?: number | undefined;
    completionHandler?:
      | {
          type: "message";
        }
      | {
          type: "update-temporary-editor";
          botMessage: string;
          language?: string | undefined;
        }
      | {
          type: "active-editor-diff";
        }
      | undefined;
  }
>;
export type Prompt = zod.infer<typeof promptSchema> & {
  /**
   * Resolved template.
   */
  template: string;
};
declare const variableSchema: zod.ZodDiscriminatedUnion<
  "type",
  [
    zod.ZodObject<
      {
        name: zod.ZodString;
        constraints: zod.ZodOptional<
          zod.ZodArray<
            zod.ZodDiscriminatedUnion<
              "type",
              [
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"text-length">;
                    min: zod.ZodNumber;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    type: "text-length";
                    min: number;
                  },
                  {
                    type: "text-length";
                    min: number;
                  }
                >
              ]
            >,
            "many"
          >
        >;
        type: zod.ZodLiteral<"constant">;
        time: zod.ZodLiteral<"conversation-start">;
        value: zod.ZodString;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "constant";
        name: string;
        value: string;
        time: "conversation-start";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      },
      {
        type: "constant";
        name: string;
        value: string;
        time: "conversation-start";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      }
    >,
    zod.ZodObject<
      {
        name: zod.ZodString;
        constraints: zod.ZodOptional<
          zod.ZodArray<
            zod.ZodDiscriminatedUnion<
              "type",
              [
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"text-length">;
                    min: zod.ZodNumber;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    type: "text-length";
                    min: number;
                  },
                  {
                    type: "text-length";
                    min: number;
                  }
                >
              ]
            >,
            "many"
          >
        >;
        type: zod.ZodLiteral<"message">;
        time: zod.ZodLiteral<"message">;
        index: zod.ZodNumber;
        property: zod.ZodEnum<["content"]>;
      },
      "strip",
      zod.ZodTypeAny,
      {
        index: number;
        type: "message";
        name: string;
        time: "message";
        property: "content";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      },
      {
        index: number;
        type: "message";
        name: string;
        time: "message";
        property: "content";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      }
    >,
    zod.ZodObject<
      {
        name: zod.ZodString;
        constraints: zod.ZodOptional<
          zod.ZodArray<
            zod.ZodDiscriminatedUnion<
              "type",
              [
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"text-length">;
                    min: zod.ZodNumber;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    type: "text-length";
                    min: number;
                  },
                  {
                    type: "text-length";
                    min: number;
                  }
                >
              ]
            >,
            "many"
          >
        >;
        type: zod.ZodLiteral<"context">;
        time: zod.ZodEnum<["conversation-start"]>;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "context";
        name: string;
        time: "conversation-start";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      },
      {
        type: "context";
        name: string;
        time: "conversation-start";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      }
    >,
    zod.ZodObject<
      {
        name: zod.ZodString;
        constraints: zod.ZodOptional<
          zod.ZodArray<
            zod.ZodDiscriminatedUnion<
              "type",
              [
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"text-length">;
                    min: zod.ZodNumber;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    type: "text-length";
                    min: number;
                  },
                  {
                    type: "text-length";
                    min: number;
                  }
                >
              ]
            >,
            "many"
          >
        >;
        type: zod.ZodLiteral<"selected-text">;
        time: zod.ZodEnum<["conversation-start", "message"]>;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "selected-text";
        name: string;
        time: "message" | "conversation-start";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      },
      {
        type: "selected-text";
        name: string;
        time: "message" | "conversation-start";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      }
    >,
    zod.ZodObject<
      {
        name: zod.ZodString;
        constraints: zod.ZodOptional<
          zod.ZodArray<
            zod.ZodDiscriminatedUnion<
              "type",
              [
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"text-length">;
                    min: zod.ZodNumber;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    type: "text-length";
                    min: number;
                  },
                  {
                    type: "text-length";
                    min: number;
                  }
                >
              ]
            >,
            "many"
          >
        >;
        type: zod.ZodLiteral<"selected-location-text">;
        time: zod.ZodEnum<["conversation-start"]>;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "selected-location-text";
        name: string;
        time: "conversation-start";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      },
      {
        type: "selected-location-text";
        name: string;
        time: "conversation-start";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      }
    >,
    zod.ZodObject<
      {
        name: zod.ZodString;
        constraints: zod.ZodOptional<
          zod.ZodArray<
            zod.ZodDiscriminatedUnion<
              "type",
              [
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"text-length">;
                    min: zod.ZodNumber;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    type: "text-length";
                    min: number;
                  },
                  {
                    type: "text-length";
                    min: number;
                  }
                >
              ]
            >,
            "many"
          >
        >;
        type: zod.ZodLiteral<"filename">;
        time: zod.ZodEnum<["conversation-start"]>;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "filename";
        name: string;
        time: "conversation-start";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      },
      {
        type: "filename";
        name: string;
        time: "conversation-start";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      }
    >,
    zod.ZodObject<
      {
        name: zod.ZodString;
        constraints: zod.ZodOptional<
          zod.ZodArray<
            zod.ZodDiscriminatedUnion<
              "type",
              [
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"text-length">;
                    min: zod.ZodNumber;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    type: "text-length";
                    min: number;
                  },
                  {
                    type: "text-length";
                    min: number;
                  }
                >
              ]
            >,
            "many"
          >
        >;
        type: zod.ZodLiteral<"language">;
        time: zod.ZodEnum<["conversation-start"]>;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "language";
        name: string;
        time: "conversation-start";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      },
      {
        type: "language";
        name: string;
        time: "conversation-start";
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      }
    >,
    zod.ZodObject<
      {
        name: zod.ZodString;
        constraints: zod.ZodOptional<
          zod.ZodArray<
            zod.ZodDiscriminatedUnion<
              "type",
              [
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"text-length">;
                    min: zod.ZodNumber;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    type: "text-length";
                    min: number;
                  },
                  {
                    type: "text-length";
                    min: number;
                  }
                >
              ]
            >,
            "many"
          >
        >;
        type: zod.ZodLiteral<"selected-text-with-diagnostics">;
        time: zod.ZodLiteral<"conversation-start">;
        severities: zod.ZodArray<
          zod.ZodEnum<["error", "warning", "information", "hint"]>,
          "many"
        >;
      },
      "strip",
      zod.ZodTypeAny,
      {
        type: "selected-text-with-diagnostics";
        name: string;
        time: "conversation-start";
        severities: ("error" | "warning" | "information" | "hint")[];
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      },
      {
        type: "selected-text-with-diagnostics";
        name: string;
        time: "conversation-start";
        severities: ("error" | "warning" | "information" | "hint")[];
        constraints?:
          | {
              type: "text-length";
              min: number;
            }[]
          | undefined;
      }
    >
  ]
>;
export type Variable = zod.infer<typeof variableSchema>;
export declare const pearaiTemplateSchema: zod.ZodObject<
  {
    id: zod.ZodString;
    engineVersion: zod.ZodLiteral<0>;
    label: zod.ZodString;
    description: zod.ZodString;
    tags: zod.ZodOptional<zod.ZodArray<zod.ZodString, "many">>;
    header: zod.ZodObject<
      {
        title: zod.ZodString;
        useFirstMessageAsTitle: zod.ZodOptional<zod.ZodBoolean>;
        icon: zod.ZodObject<
          {
            type: zod.ZodLiteral<"codicon">;
            value: zod.ZodString;
          },
          "strip",
          zod.ZodTypeAny,
          {
            type: "codicon";
            value: string;
          },
          {
            type: "codicon";
            value: string;
          }
        >;
      },
      "strip",
      zod.ZodTypeAny,
      {
        title: string;
        icon: {
          type: "codicon";
          value: string;
        };
        useFirstMessageAsTitle?: boolean | undefined;
      },
      {
        title: string;
        icon: {
          type: "codicon";
          value: string;
        };
        useFirstMessageAsTitle?: boolean | undefined;
      }
    >;
    chatInterface: zod.ZodOptional<
      zod.ZodEnum<["message-exchange", "instruction-refinement"]>
    >;
    isEnabled: zod.ZodOptional<zod.ZodBoolean>;
    variables: zod.ZodOptional<
      zod.ZodArray<
        zod.ZodDiscriminatedUnion<
          "type",
          [
            zod.ZodObject<
              {
                name: zod.ZodString;
                constraints: zod.ZodOptional<
                  zod.ZodArray<
                    zod.ZodDiscriminatedUnion<
                      "type",
                      [
                        zod.ZodObject<
                          {
                            type: zod.ZodLiteral<"text-length">;
                            min: zod.ZodNumber;
                          },
                          "strip",
                          zod.ZodTypeAny,
                          {
                            type: "text-length";
                            min: number;
                          },
                          {
                            type: "text-length";
                            min: number;
                          }
                        >
                      ]
                    >,
                    "many"
                  >
                >;
                type: zod.ZodLiteral<"constant">;
                time: zod.ZodLiteral<"conversation-start">;
                value: zod.ZodString;
              },
              "strip",
              zod.ZodTypeAny,
              {
                type: "constant";
                name: string;
                value: string;
                time: "conversation-start";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              },
              {
                type: "constant";
                name: string;
                value: string;
                time: "conversation-start";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              }
            >,
            zod.ZodObject<
              {
                name: zod.ZodString;
                constraints: zod.ZodOptional<
                  zod.ZodArray<
                    zod.ZodDiscriminatedUnion<
                      "type",
                      [
                        zod.ZodObject<
                          {
                            type: zod.ZodLiteral<"text-length">;
                            min: zod.ZodNumber;
                          },
                          "strip",
                          zod.ZodTypeAny,
                          {
                            type: "text-length";
                            min: number;
                          },
                          {
                            type: "text-length";
                            min: number;
                          }
                        >
                      ]
                    >,
                    "many"
                  >
                >;
                type: zod.ZodLiteral<"message">;
                time: zod.ZodLiteral<"message">;
                index: zod.ZodNumber;
                property: zod.ZodEnum<["content"]>;
              },
              "strip",
              zod.ZodTypeAny,
              {
                index: number;
                type: "message";
                name: string;
                time: "message";
                property: "content";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              },
              {
                index: number;
                type: "message";
                name: string;
                time: "message";
                property: "content";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              }
            >,
            zod.ZodObject<
              {
                name: zod.ZodString;
                constraints: zod.ZodOptional<
                  zod.ZodArray<
                    zod.ZodDiscriminatedUnion<
                      "type",
                      [
                        zod.ZodObject<
                          {
                            type: zod.ZodLiteral<"text-length">;
                            min: zod.ZodNumber;
                          },
                          "strip",
                          zod.ZodTypeAny,
                          {
                            type: "text-length";
                            min: number;
                          },
                          {
                            type: "text-length";
                            min: number;
                          }
                        >
                      ]
                    >,
                    "many"
                  >
                >;
                type: zod.ZodLiteral<"context">;
                time: zod.ZodEnum<["conversation-start"]>;
              },
              "strip",
              zod.ZodTypeAny,
              {
                type: "context";
                name: string;
                time: "conversation-start";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              },
              {
                type: "context";
                name: string;
                time: "conversation-start";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              }
            >,
            zod.ZodObject<
              {
                name: zod.ZodString;
                constraints: zod.ZodOptional<
                  zod.ZodArray<
                    zod.ZodDiscriminatedUnion<
                      "type",
                      [
                        zod.ZodObject<
                          {
                            type: zod.ZodLiteral<"text-length">;
                            min: zod.ZodNumber;
                          },
                          "strip",
                          zod.ZodTypeAny,
                          {
                            type: "text-length";
                            min: number;
                          },
                          {
                            type: "text-length";
                            min: number;
                          }
                        >
                      ]
                    >,
                    "many"
                  >
                >;
                type: zod.ZodLiteral<"selected-text">;
                time: zod.ZodEnum<["conversation-start", "message"]>;
              },
              "strip",
              zod.ZodTypeAny,
              {
                type: "selected-text";
                name: string;
                time: "message" | "conversation-start";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              },
              {
                type: "selected-text";
                name: string;
                time: "message" | "conversation-start";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              }
            >,
            zod.ZodObject<
              {
                name: zod.ZodString;
                constraints: zod.ZodOptional<
                  zod.ZodArray<
                    zod.ZodDiscriminatedUnion<
                      "type",
                      [
                        zod.ZodObject<
                          {
                            type: zod.ZodLiteral<"text-length">;
                            min: zod.ZodNumber;
                          },
                          "strip",
                          zod.ZodTypeAny,
                          {
                            type: "text-length";
                            min: number;
                          },
                          {
                            type: "text-length";
                            min: number;
                          }
                        >
                      ]
                    >,
                    "many"
                  >
                >;
                type: zod.ZodLiteral<"selected-location-text">;
                time: zod.ZodEnum<["conversation-start"]>;
              },
              "strip",
              zod.ZodTypeAny,
              {
                type: "selected-location-text";
                name: string;
                time: "conversation-start";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              },
              {
                type: "selected-location-text";
                name: string;
                time: "conversation-start";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              }
            >,
            zod.ZodObject<
              {
                name: zod.ZodString;
                constraints: zod.ZodOptional<
                  zod.ZodArray<
                    zod.ZodDiscriminatedUnion<
                      "type",
                      [
                        zod.ZodObject<
                          {
                            type: zod.ZodLiteral<"text-length">;
                            min: zod.ZodNumber;
                          },
                          "strip",
                          zod.ZodTypeAny,
                          {
                            type: "text-length";
                            min: number;
                          },
                          {
                            type: "text-length";
                            min: number;
                          }
                        >
                      ]
                    >,
                    "many"
                  >
                >;
                type: zod.ZodLiteral<"filename">;
                time: zod.ZodEnum<["conversation-start"]>;
              },
              "strip",
              zod.ZodTypeAny,
              {
                type: "filename";
                name: string;
                time: "conversation-start";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              },
              {
                type: "filename";
                name: string;
                time: "conversation-start";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              }
            >,
            zod.ZodObject<
              {
                name: zod.ZodString;
                constraints: zod.ZodOptional<
                  zod.ZodArray<
                    zod.ZodDiscriminatedUnion<
                      "type",
                      [
                        zod.ZodObject<
                          {
                            type: zod.ZodLiteral<"text-length">;
                            min: zod.ZodNumber;
                          },
                          "strip",
                          zod.ZodTypeAny,
                          {
                            type: "text-length";
                            min: number;
                          },
                          {
                            type: "text-length";
                            min: number;
                          }
                        >
                      ]
                    >,
                    "many"
                  >
                >;
                type: zod.ZodLiteral<"language">;
                time: zod.ZodEnum<["conversation-start"]>;
              },
              "strip",
              zod.ZodTypeAny,
              {
                type: "language";
                name: string;
                time: "conversation-start";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              },
              {
                type: "language";
                name: string;
                time: "conversation-start";
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              }
            >,
            zod.ZodObject<
              {
                name: zod.ZodString;
                constraints: zod.ZodOptional<
                  zod.ZodArray<
                    zod.ZodDiscriminatedUnion<
                      "type",
                      [
                        zod.ZodObject<
                          {
                            type: zod.ZodLiteral<"text-length">;
                            min: zod.ZodNumber;
                          },
                          "strip",
                          zod.ZodTypeAny,
                          {
                            type: "text-length";
                            min: number;
                          },
                          {
                            type: "text-length";
                            min: number;
                          }
                        >
                      ]
                    >,
                    "many"
                  >
                >;
                type: zod.ZodLiteral<"selected-text-with-diagnostics">;
                time: zod.ZodLiteral<"conversation-start">;
                severities: zod.ZodArray<
                  zod.ZodEnum<["error", "warning", "information", "hint"]>,
                  "many"
                >;
              },
              "strip",
              zod.ZodTypeAny,
              {
                type: "selected-text-with-diagnostics";
                name: string;
                time: "conversation-start";
                severities: ("error" | "warning" | "information" | "hint")[];
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              },
              {
                type: "selected-text-with-diagnostics";
                name: string;
                time: "conversation-start";
                severities: ("error" | "warning" | "information" | "hint")[];
                constraints?:
                  | {
                      type: "text-length";
                      min: number;
                    }[]
                  | undefined;
              }
            >
          ]
        >,
        "many"
      >
    >;
    initialMessage: zod.ZodOptional<
      zod.ZodObject<
        {
          placeholder: zod.ZodOptional<zod.ZodString>;
          retrievalAugmentation: zod.ZodOptional<
            zod.ZodObject<
              {
                variableName: zod.ZodString;
                type: zod.ZodLiteral<"similarity-search">;
                source: zod.ZodLiteral<"embedding-file">;
                file: zod.ZodString;
                query: zod.ZodString;
                threshold: zod.ZodNumber;
                maxResults: zod.ZodNumber;
              },
              "strip",
              zod.ZodTypeAny,
              {
                type: "similarity-search";
                threshold: number;
                file: string;
                source: "embedding-file";
                maxResults: number;
                variableName: string;
                query: string;
              },
              {
                type: "similarity-search";
                threshold: number;
                file: string;
                source: "embedding-file";
                maxResults: number;
                variableName: string;
                query: string;
              }
            >
          >;
          maxTokens: zod.ZodNumber;
          stop: zod.ZodOptional<zod.ZodArray<zod.ZodString, "many">>;
          temperature: zod.ZodOptional<zod.ZodNumber>;
          completionHandler: zod.ZodOptional<
            zod.ZodDiscriminatedUnion<
              "type",
              [
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"message">;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    type: "message";
                  },
                  {
                    type: "message";
                  }
                >,
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"update-temporary-editor">;
                    botMessage: zod.ZodString;
                    language: zod.ZodOptional<zod.ZodString>;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    type: "update-temporary-editor";
                    botMessage: string;
                    language?: string | undefined;
                  },
                  {
                    type: "update-temporary-editor";
                    botMessage: string;
                    language?: string | undefined;
                  }
                >,
                zod.ZodObject<
                  {
                    type: zod.ZodLiteral<"active-editor-diff">;
                  },
                  "strip",
                  zod.ZodTypeAny,
                  {
                    type: "active-editor-diff";
                  },
                  {
                    type: "active-editor-diff";
                  }
                >
              ]
            >
          >;
        },
        "strip",
        zod.ZodTypeAny,
        {
          maxTokens: number;
          placeholder?: string | undefined;
          retrievalAugmentation?:
            | {
                type: "similarity-search";
                threshold: number;
                file: string;
                source: "embedding-file";
                maxResults: number;
                variableName: string;
                query: string;
              }
            | undefined;
          stop?: string[] | undefined;
          temperature?: number | undefined;
          completionHandler?:
            | {
                type: "message";
              }
            | {
                type: "update-temporary-editor";
                botMessage: string;
                language?: string | undefined;
              }
            | {
                type: "active-editor-diff";
              }
            | undefined;
        },
        {
          maxTokens: number;
          placeholder?: string | undefined;
          retrievalAugmentation?:
            | {
                type: "similarity-search";
                threshold: number;
                file: string;
                source: "embedding-file";
                maxResults: number;
                variableName: string;
                query: string;
              }
            | undefined;
          stop?: string[] | undefined;
          temperature?: number | undefined;
          completionHandler?:
            | {
                type: "message";
              }
            | {
                type: "update-temporary-editor";
                botMessage: string;
                language?: string | undefined;
              }
            | {
                type: "active-editor-diff";
              }
            | undefined;
        }
      >
    >;
    response: zod.ZodObject<
      {
        placeholder: zod.ZodOptional<zod.ZodString>;
        retrievalAugmentation: zod.ZodOptional<
          zod.ZodObject<
            {
              variableName: zod.ZodString;
              type: zod.ZodLiteral<"similarity-search">;
              source: zod.ZodLiteral<"embedding-file">;
              file: zod.ZodString;
              query: zod.ZodString;
              threshold: zod.ZodNumber;
              maxResults: zod.ZodNumber;
            },
            "strip",
            zod.ZodTypeAny,
            {
              type: "similarity-search";
              threshold: number;
              file: string;
              source: "embedding-file";
              maxResults: number;
              variableName: string;
              query: string;
            },
            {
              type: "similarity-search";
              threshold: number;
              file: string;
              source: "embedding-file";
              maxResults: number;
              variableName: string;
              query: string;
            }
          >
        >;
        maxTokens: zod.ZodNumber;
        stop: zod.ZodOptional<zod.ZodArray<zod.ZodString, "many">>;
        temperature: zod.ZodOptional<zod.ZodNumber>;
        completionHandler: zod.ZodOptional<
          zod.ZodDiscriminatedUnion<
            "type",
            [
              zod.ZodObject<
                {
                  type: zod.ZodLiteral<"message">;
                },
                "strip",
                zod.ZodTypeAny,
                {
                  type: "message";
                },
                {
                  type: "message";
                }
              >,
              zod.ZodObject<
                {
                  type: zod.ZodLiteral<"update-temporary-editor">;
                  botMessage: zod.ZodString;
                  language: zod.ZodOptional<zod.ZodString>;
                },
                "strip",
                zod.ZodTypeAny,
                {
                  type: "update-temporary-editor";
                  botMessage: string;
                  language?: string | undefined;
                },
                {
                  type: "update-temporary-editor";
                  botMessage: string;
                  language?: string | undefined;
                }
              >,
              zod.ZodObject<
                {
                  type: zod.ZodLiteral<"active-editor-diff">;
                },
                "strip",
                zod.ZodTypeAny,
                {
                  type: "active-editor-diff";
                },
                {
                  type: "active-editor-diff";
                }
              >
            ]
          >
        >;
      },
      "strip",
      zod.ZodTypeAny,
      {
        maxTokens: number;
        placeholder?: string | undefined;
        retrievalAugmentation?:
          | {
              type: "similarity-search";
              threshold: number;
              file: string;
              source: "embedding-file";
              maxResults: number;
              variableName: string;
              query: string;
            }
          | undefined;
        stop?: string[] | undefined;
        temperature?: number | undefined;
        completionHandler?:
          | {
              type: "message";
            }
          | {
              type: "update-temporary-editor";
              botMessage: string;
              language?: string | undefined;
            }
          | {
              type: "active-editor-diff";
            }
          | undefined;
      },
      {
        maxTokens: number;
        placeholder?: string | undefined;
        retrievalAugmentation?:
          | {
              type: "similarity-search";
              threshold: number;
              file: string;
              source: "embedding-file";
              maxResults: number;
              variableName: string;
              query: string;
            }
          | undefined;
        stop?: string[] | undefined;
        temperature?: number | undefined;
        completionHandler?:
          | {
              type: "message";
            }
          | {
              type: "update-temporary-editor";
              botMessage: string;
              language?: string | undefined;
            }
          | {
              type: "active-editor-diff";
            }
          | undefined;
      }
    >;
  },
  "strip",
  zod.ZodTypeAny,
  {
    id: string;
    header: {
      title: string;
      icon: {
        type: "codicon";
        value: string;
      };
      useFirstMessageAsTitle?: boolean | undefined;
    };
    label: string;
    description: string;
    response: {
      maxTokens: number;
      placeholder?: string | undefined;
      retrievalAugmentation?:
        | {
            type: "similarity-search";
            threshold: number;
            file: string;
            source: "embedding-file";
            maxResults: number;
            variableName: string;
            query: string;
          }
        | undefined;
      stop?: string[] | undefined;
      temperature?: number | undefined;
      completionHandler?:
        | {
            type: "message";
          }
        | {
            type: "update-temporary-editor";
            botMessage: string;
            language?: string | undefined;
          }
        | {
            type: "active-editor-diff";
          }
        | undefined;
    };
    engineVersion: 0;
    tags?: string[] | undefined;
    chatInterface?: "message-exchange" | "instruction-refinement" | undefined;
    isEnabled?: boolean | undefined;
    variables?:
      | (
          | {
              type: "constant";
              name: string;
              value: string;
              time: "conversation-start";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              index: number;
              type: "message";
              name: string;
              time: "message";
              property: "content";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              type: "context";
              name: string;
              time: "conversation-start";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              type: "selected-text";
              name: string;
              time: "message" | "conversation-start";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              type: "selected-location-text";
              name: string;
              time: "conversation-start";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              type: "filename";
              name: string;
              time: "conversation-start";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              type: "language";
              name: string;
              time: "conversation-start";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              type: "selected-text-with-diagnostics";
              name: string;
              time: "conversation-start";
              severities: ("error" | "warning" | "information" | "hint")[];
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
        )[]
      | undefined;
    initialMessage?:
      | {
          maxTokens: number;
          placeholder?: string | undefined;
          retrievalAugmentation?:
            | {
                type: "similarity-search";
                threshold: number;
                file: string;
                source: "embedding-file";
                maxResults: number;
                variableName: string;
                query: string;
              }
            | undefined;
          stop?: string[] | undefined;
          temperature?: number | undefined;
          completionHandler?:
            | {
                type: "message";
              }
            | {
                type: "update-temporary-editor";
                botMessage: string;
                language?: string | undefined;
              }
            | {
                type: "active-editor-diff";
              }
            | undefined;
        }
      | undefined;
  },
  {
    id: string;
    header: {
      title: string;
      icon: {
        type: "codicon";
        value: string;
      };
      useFirstMessageAsTitle?: boolean | undefined;
    };
    label: string;
    description: string;
    response: {
      maxTokens: number;
      placeholder?: string | undefined;
      retrievalAugmentation?:
        | {
            type: "similarity-search";
            threshold: number;
            file: string;
            source: "embedding-file";
            maxResults: number;
            variableName: string;
            query: string;
          }
        | undefined;
      stop?: string[] | undefined;
      temperature?: number | undefined;
      completionHandler?:
        | {
            type: "message";
          }
        | {
            type: "update-temporary-editor";
            botMessage: string;
            language?: string | undefined;
          }
        | {
            type: "active-editor-diff";
          }
        | undefined;
    };
    engineVersion: 0;
    tags?: string[] | undefined;
    chatInterface?: "message-exchange" | "instruction-refinement" | undefined;
    isEnabled?: boolean | undefined;
    variables?:
      | (
          | {
              type: "constant";
              name: string;
              value: string;
              time: "conversation-start";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              index: number;
              type: "message";
              name: string;
              time: "message";
              property: "content";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              type: "context";
              name: string;
              time: "conversation-start";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              type: "selected-text";
              name: string;
              time: "message" | "conversation-start";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              type: "selected-location-text";
              name: string;
              time: "conversation-start";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              type: "filename";
              name: string;
              time: "conversation-start";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              type: "language";
              name: string;
              time: "conversation-start";
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
          | {
              type: "selected-text-with-diagnostics";
              name: string;
              time: "conversation-start";
              severities: ("error" | "warning" | "information" | "hint")[];
              constraints?:
                | {
                    type: "text-length";
                    min: number;
                  }[]
                | undefined;
            }
        )[]
      | undefined;
    initialMessage?:
      | {
          maxTokens: number;
          placeholder?: string | undefined;
          retrievalAugmentation?:
            | {
                type: "similarity-search";
                threshold: number;
                file: string;
                source: "embedding-file";
                maxResults: number;
                variableName: string;
                query: string;
              }
            | undefined;
          stop?: string[] | undefined;
          temperature?: number | undefined;
          completionHandler?:
            | {
                type: "message";
              }
            | {
                type: "update-temporary-editor";
                botMessage: string;
                language?: string | undefined;
              }
            | {
                type: "active-editor-diff";
              }
            | undefined;
        }
      | undefined;
  }
>;
export type PearAITemplate = zod.infer<typeof pearaiTemplateSchema> & {
  initialMessage?: Prompt;
  response: Prompt;
};
export {};
