export interface Plugin {
  objectID: string;
  name: string;
  author: string;
  description: string;
  tags: string[] | undefined;
  docs: string | undefined;
  npm: string | undefined;
  github: string | undefined;
  npmDownloads: number | undefined;
  githubStars: number | undefined;
}

type CommandCallback = (plugin: Plugin) => void;
