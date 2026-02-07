export interface Experience {
    id: string;
    company: string;
    position: string;
    positionFr?: string;
    positionEn?: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    descriptionFr?: string;
    descriptionEn?: string;
    techStack: string;
    highlights?: string[];
    highlightsFr?: string;
    highlightsEn?: string;
    expanded?: boolean;
}
