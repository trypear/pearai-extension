import { getHeaders } from "../../pearaiServer/stubs/headers.js";
import { ChatMessage, CompletionOptions, ModelProvider } from "../../index.js";
import { SERVER_URL } from "../../util/parameters.js";
import { Telemetry } from "../../util/posthog.js";
import { BaseLLM } from "../index.js";
import { streamResponse, streamJSON } from "../stream.js";

class PearAIServer extends BaseLLM {
  static providerName: ModelProvider = "pearai-server";

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

    // Todo: add jwt to saved thing here
    // TODO: add save if need to refresh
    const jwt = "eyJhbGciOiJIUzI1NiIsImtpZCI6IjA4VjF0WkpRVlZHb3NPRDYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE5NDQ2NjUxLCJpYXQiOjE3MTk0NDMwNTEsImlzcyI6Imh0dHBzOi8vd21xd3h4anBqcGhic3BrY3h0anQuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjAzZGE5MTA4LTNhOTMtNDNjMS1hOTJjLTBlNzcyM2FmNTI5MSIsImVtYWlsIjoibmF0aGFuYW5nMjAwMEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0oyX3kybkU0WS0zbzJJR1hCZDlvZmpacmpHZXJUZVNlVVVsNkRZT1lwV19JaEtGTW0wPXM5Ni1jIiwiZW1haWwiOiJuYXRoYW5hbmcyMDAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiJOYXRoYW4gQW5nIiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwibmFtZSI6Ik5hdGhhbiBBbmciLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKMl95Mm5FNFktM28ySUdYQmQ5b2ZqWnJqR2VyVGVTZVVVbDZEWU9ZcFdfSWhLRk1tMD1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTE1NDA5MDEyMzczMzEyNTE3NTE2Iiwic3ViIjoiMTE1NDA5MDEyMzczMzEyNTE3NTE2In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MTk0Mzg1NDh9XSwic2Vzc2lvbl9pZCI6IjQzYjllMDhhLTA0OGYtNDNmYy05MWFmLTYxY2FkMWRjOGZiZSIsImlzX2Fub255bW91cyI6ZmFsc2V9.mTqH4tIQMunI3uemG-1zruql-OFYTtM8j7hdzUeoRU4"
    const response = await this.fetch(`${SERVER_URL}/server_chat`, {
      method: "POST",
      headers: {
        ...(await this._getHeaders()),
        'Authorization': `Bearer ${jwt}`
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
