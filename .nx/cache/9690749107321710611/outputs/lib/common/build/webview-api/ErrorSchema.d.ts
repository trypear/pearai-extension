import zod from "zod";
export declare const errorSchema: zod.ZodUnion<
  [
    zod.ZodString,
    zod.ZodObject<
      {
        title: zod.ZodString;
        message: zod.ZodString;
        level: zod.ZodOptional<
          zod.ZodDefault<
            zod.ZodUnion<[zod.ZodLiteral<"error">, zod.ZodLiteral<"warning">]>
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
/**
 * Say what happened.
 * Provide re-assurance and explain why it happened. Suggest actions
 * to help them fix it and/or give them a way out.
 *
 * You can use Markdown syntax for `title` and `message`.
 *
 * @see https://wix-ux.com/when-life-gives-you-lemons-write-better-error-messages-46c5223e1a2f
 *
 * @example Simple scenario
 * "Unable to connect to OpenAI"
 *
 * @example More elaborate object
 * {
 *   title: "Unable to connect to OpenAI",
 *   message: "Your changes were saved, but we could not connect your account due to a technical issue on our end. Please try connecting again. If the issue keeps happening, [contact Support](#link-to-contact-support)."
 * }
 */
export type Error = zod.infer<typeof errorSchema>;
