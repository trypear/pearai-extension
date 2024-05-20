import { AIClient } from "../../ai/AIClient";
import { RetrievalAugmentation } from "../template/PearAITemplate";
export declare function executeRetrievalAugmentation({
  retrievalAugmentation,
  initVariables,
  variables,
  ai,
}: {
  retrievalAugmentation: RetrievalAugmentation;
  initVariables: Record<string, unknown>;
  variables: Record<string, unknown>;
  ai: AIClient;
}): Promise<
  | Array<{
      file: string;
      startPosition: number;
      endPosition: number;
      content: string;
    }>
  | undefined
>;
