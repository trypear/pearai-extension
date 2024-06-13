import { LLMOptions, ModelProvider } from "../../..";
import OpenAI from "../OpenAI";

class PearAIProxy extends OpenAI {
  static providerName: ModelProvider = "pearai-proxy";
  static defaultOptions: Partial<LLMOptions> = {
    apiBase: "http://localhost:8000/proxy/v1",
  };
}

export default PearAIProxy;
