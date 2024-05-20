import { Variable } from "../template/PearAITemplate";
import { Message } from "../Message";
export declare function resolveVariable(
  variable: Variable,
  {
    messages,
  }?: {
    messages?: Array<Message>;
  }
): Promise<unknown>;
