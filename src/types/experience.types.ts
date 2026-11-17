
export interface Experience {
    _id: string;
    role: string;
    company: string;
    location?: string;
    employmentType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
    startDate: string;
    endDate?: string;
    currentlyWorking: boolean;
    description: string;
    technologies: string[];
    createdAt?: string;
    updatedAt?: string;
}
