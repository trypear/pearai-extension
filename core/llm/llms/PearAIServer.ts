import { getHeaders } from "../../pearaiServer/stubs/headers.js";
import {
  ChatMessage,
  CompletionOptions,
  LLMOptions,
  ModelProvider,
  PearAuth,
} from "../../index.js";
import { SERVER_URL } from "../../util/parameters.js";
import { Telemetry } from "../../util/posthog.js";
import { BaseLLM } from "../index.js";
import { streamResponse, streamJSON } from "../stream.js";
import { checkTokens } from "../../db/token.js";

class PearAIServer extends BaseLLM {
  getCredentials: (() => Promise<PearAuth | undefined>) | undefined = undefined;
  setCredentials: (auth: PearAuth) => Promise<void> = async () => {};

  static providerName: ModelProvider = "pearai-server";
  constructor(options: LLMOptions) {
    super(options);
  }

  static defaultOptions: Partial<LLMOptions> = {
    model: "gpt-4o",
    title: "PearAI LLM",
  };

  private async _getHeaders() {
    return {
      uniqueId: this.uniqueId || "None",
      extensionVersion: Telemetry.extensionVersion ?? "Unknown",
      os: Telemetry.os ?? "Unknown",
      "Content-Type": "application/json",
      ...(await getHeaders()),
    };
  }

  private async _countTokens(prompt: string, model: string, isPrompt: boolean) {
    if (!Telemetry.client) {
      throw new Error(
        'In order to use the server, telemetry must be enabled so that we can monitor abuse. To enable telemetry, set "allowAnonymousTelemetry": true in config.json and make sure the box is checked in IDE settings. If you use your own model (local or API key), telemetry will never be required.',
      );
    }
    const event = isPrompt
      ? "free_trial_prompt_tokens"
      : "free_trial_completion_tokens";
    Telemetry.capture(event, {
      tokens: this.countTokens(prompt),
      model,
    });
  }

  private _convertArgs(options: CompletionOptions): any {
    return {
      model: options.model,
      frequency_penalty: options.frequencyPenalty,
      presence_penalty: options.presencePenalty,
      max_tokens: options.maxTokens,
      stop:
        options.model === "starcoder-7b"
          ? options.stop
          : options.stop?.slice(0, 2),
      temperature: options.temperature,
      top_p: options.topP,
    };
  }

  protected async *_streamComplete(
    prompt: string,
    options: CompletionOptions,
  ): AsyncGenerator<string> {
    const args = this._convertArgs(this.collectArgs(options));

    await this._countTokens(prompt, args.model, true);

    const response = await this.fetch(`${SERVER_URL}/stream_complete`, {
      method: "POST",
      headers: await this._getHeaders(),
      body: JSON.stringify({
        prompt,
        ...args,
      }),
    });

    let completion = "";
    for await (const value of streamJSON(response)) {
      yield value;
      completion += value;
    }
    this._countTokens(completion, args.model, false);
  }

  protected _convertMessage(message: ChatMessage) {
    if (typeof message.content === "string") {
      return message;
    }

    const parts = message.content.map((part) => {
      return {
        type: part.type,
        text: part.text,
        image_url: { ...part.imageUrl, detail: "low" },
      };
    });
    return {
      ...message,
      content: parts,
    };
  }

  protected async *_streamChat(
    messages: ChatMessage[],
    options: CompletionOptions,
  ): AsyncGenerator<ChatMessage> {
    const args = this._convertArgs(this.collectArgs(options));

    await this._countTokens(
      messages.map((m) => m.content).join("\n"),
      args.model,
      true,
    );

    let accessToken: string | undefined = this.apiKey;
    let refreshToken: string | undefined = this.refreshToken;

    try {
      let creds = undefined;

      if (this.getCredentials) {
        creds = await this.getCredentials();
  
        if (creds && creds.accessToken && creds.refreshToken) {
          this.apiKey = creds.accessToken;
          this.refreshToken = creds.refreshToken;
        }
      }

      const tokens = await checkTokens(accessToken, refreshToken);

      if (tokens.accessToken !== accessToken || tokens.refreshToken !== refreshToken) {
        if (tokens.accessToken !== accessToken) {
          this.apiKey = tokens.accessToken;
          console.log(
            "PearAI access token changed from:",
            accessToken,
            "to:",
            tokens.accessToken,
          );
        }
      
        if (tokens.refreshToken !== refreshToken) {
          this.refreshToken = tokens.refreshToken;
          console.log(
            "PearAI refresh token changed from:",
            refreshToken,
            "to:",
            tokens.refreshToken,
          );
        }
        if (creds) {
          creds.accessToken = tokens.accessToken
          creds.refreshToken = tokens.refreshToken
          this.setCredentials(creds)
        }
      }
    } catch (error) {
      console.error("Error checking token expiration:", error);
      // Handle the error (e.g., redirect to login page)
    }

    const response = await this.fetch(`${SERVER_URL}/server_chat`, {
      method: "POST",
      headers: {
        ...(await this._getHeaders()),
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        messages: messages.map(this._convertMessage),
        ...args,
      }),
    });

    let completion = "";

    for await (const value of streamJSON(response)) {
      // Handle initial metadata if necessary
      if (value.metadata && Object.keys(value.metadata).length > 0) {
        // Do something with metadata if needed, currently just logging
        console.log("Metadata received:", value.metadata);
      }

      if (value.content) {
        yield {
          role: "assistant",
          content: value.content,
        };
        completion += value.content;
      }
    }
    this._countTokens(completion, args.model, false);
  }

  async listModels(): Promise<string[]> {
    return [
      "llama3-70b",
      "gpt-3.5-turbo",
      "gpt-4o",
      "gemini-1.5-pro-latest",
      "claude-3-sonnet-20240229",
      "claude-3-haiku-20240307",
    ];
  }
}

export default PearAIServer;
