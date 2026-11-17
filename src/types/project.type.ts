
export interface Project {
    _id: string;
    title: string;
    slug: string;
    description: string;
    technologies: string[];
    category: "Frontend" | "Backend" | "Full Stack";
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    status: "Draft" | "Published";
    createdAt?: string;
    updatedAt?: string;
}
