export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    GitHubLink?: string;
    featured: boolean;
    liveURL?: string;
    imageURL?: string;
}
