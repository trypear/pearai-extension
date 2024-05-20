import { webviewApi } from "@pearai/common";
import { Variable } from "../template/PearAITemplate";
export declare function resolveVariables(
  variables: Array<Variable> | undefined,
  {
    time,
    messages,
  }: {
    time: Variable["time"];
    messages?: Array<webviewApi.Message>;
  }
): Promise<Record<string, unknown>>;
