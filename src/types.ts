export type Idea = {
    _id: string;
    title: string;
    summary: string;
    description: string;
    tags: string[];
    user: {id:string, _id:string, name: string | null};
    createdAt: string
}