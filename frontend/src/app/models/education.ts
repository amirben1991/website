export interface Education {
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    type: 'diplome' | 'certification';
    highlights?: string[];
    expanded?: boolean;
}
