import {
  ArtifactType,
  EmbeddingsCacheResponse,
  IPearAIServerClient,
} from "../interface.js";

export class PearAIServerClient implements IPearAIServerClient {
  url: URL | undefined;

  constructor(
    serverUrl: string | undefined,
    private readonly userToken: Promise<string | undefined>,
  ) {
    try {
      this.url =
        typeof serverUrl !== "string" || serverUrl === ""
          ? undefined
          : new URL(serverUrl);
    } catch (e) {
      console.warn("Invalid PearAI server url", e);
      this.url = undefined;
    }
  }

  getUserToken(): Promise<string | undefined> {
    return this.userToken;
  }

  connected: boolean = false;

  public async getConfig(): Promise<{ configJson: string; configJs: string }> {
    throw new Error("Not Implemented");
  }

  public async getFromIndexCache<T extends ArtifactType>(
    keys: string[],
    artifactId: T,
    repoName: string | undefined,
  ): Promise<EmbeddingsCacheResponse<T>> {
    return { files: {} };
  }
}
