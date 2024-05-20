import { InstructionPrompt, TextStreamingModel } from "modelfusion";
import { Logger } from "../logger";
import { ApiKeyManager } from "./ApiKeyManager";
export declare class AIClient {
  private readonly apiKeyManager;
  private readonly logger;
  constructor({
    apiKeyManager,
    logger,
  }: {
    apiKeyManager: ApiKeyManager;
    logger: Logger;
  });
  private getOpenAIApiConfiguration;
  getTextStreamingModel({
    maxTokens,
    stop,
    temperature,
  }: {
    maxTokens: number;
    stop?: string[] | undefined;
    temperature?: number | undefined;
  }): Promise<TextStreamingModel<InstructionPrompt>>;
  streamText({
    prompt,
    maxTokens,
    stop,
    temperature,
  }: {
    prompt: string;
    maxTokens: number;
    stop?: string[] | undefined;
    temperature?: number | undefined;
  }): Promise<AsyncIterable<string>>;
  generateEmbedding({ input }: { input: string }): Promise<
    | {
        type: "success";
        embedding: import("modelfusion").Vector;
        totalTokenCount: number | undefined;
        errorMessage?: undefined;
      }
    | {
        type: "error";
        errorMessage: any;
        embedding?: undefined;
        totalTokenCount?: undefined;
      }
  >;
}
