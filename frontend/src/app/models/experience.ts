export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    techStack: string;
    highlights?: string[];
    expanded?: boolean;
}
