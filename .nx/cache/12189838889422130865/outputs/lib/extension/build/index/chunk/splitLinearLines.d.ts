import { Chunk } from "./Chunk";
export declare function createSplitLinearLines({
  maxChunkCharacters,
  lineSeparator,
}: {
  maxChunkCharacters: number;
  lineSeparator?: string | undefined;
}): (content: string) => Array<Chunk>;
