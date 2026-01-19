export interface Certification {
    id: string;
    name: string;
    issuingOrganization: string;
    issueDate: Date;
    expirationDate?: Date;
    credentialID?: string;
    credentialURL?: string;
}
