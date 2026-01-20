export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string;
    githubLink?: string;
    featured: boolean;
    liveUrl?: string;
    imageUrl?: string;
}
