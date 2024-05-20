import zod from "zod";
declare const chunkSchema: zod.ZodObject<
  {
    start_position: zod.ZodNumber;
    end_position: zod.ZodNumber;
    content: zod.ZodString;
    file: zod.ZodString;
    embedding: zod.ZodArray<zod.ZodNumber, "many">;
  },
  "strip",
  zod.ZodTypeAny,
  {
    file: string;
    content: string;
    embedding: number[];
    start_position: number;
    end_position: number;
  },
  {
    file: string;
    content: string;
    embedding: number[];
    start_position: number;
    end_position: number;
  }
>;
export type ChunkWithContent = zod.infer<typeof chunkSchema>;
export declare const embeddingFileSchema: zod.ZodObject<
  {
    version: zod.ZodLiteral<0>;
    embedding: zod.ZodObject<
      {
        source: zod.ZodLiteral<"openai">;
        model: zod.ZodLiteral<"text-embedding-ada-002">;
      },
      "strip",
      zod.ZodTypeAny,
      {
        source: "openai";
        model: "text-embedding-ada-002";
      },
      {
        source: "openai";
        model: "text-embedding-ada-002";
      }
    >;
    chunks: zod.ZodArray<
      zod.ZodObject<
        {
          start_position: zod.ZodNumber;
          end_position: zod.ZodNumber;
          content: zod.ZodString;
          file: zod.ZodString;
          embedding: zod.ZodArray<zod.ZodNumber, "many">;
        },
        "strip",
        zod.ZodTypeAny,
        {
          file: string;
          content: string;
          embedding: number[];
          start_position: number;
          end_position: number;
        },
        {
          file: string;
          content: string;
          embedding: number[];
          start_position: number;
          end_position: number;
        }
      >,
      "many"
    >;
  },
  "strip",
  zod.ZodTypeAny,
  {
    version: 0;
    embedding: {
      source: "openai";
      model: "text-embedding-ada-002";
    };
    chunks: {
      file: string;
      content: string;
      embedding: number[];
      start_position: number;
      end_position: number;
    }[];
  },
  {
    version: 0;
    embedding: {
      source: "openai";
      model: "text-embedding-ada-002";
    };
    chunks: {
      file: string;
      content: string;
      embedding: number[];
      start_position: number;
      end_position: number;
    }[];
  }
>;
export type EmbeddingFile = zod.infer<typeof embeddingFileSchema>;
export {};
