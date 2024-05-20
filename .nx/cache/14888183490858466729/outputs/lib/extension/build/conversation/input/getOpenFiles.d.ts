export declare const getOpenFiles: () => Promise<
  {
    name: string;
    language: string;
    content: string;
  }[]
>;
