export interface Plugin {
    objectID: string;
    name: string;
    author: string;
    description: string;
    tags: string[];
    docs: string;
    github: string;
    npmDownloads: number;
    githubStars: number;
}