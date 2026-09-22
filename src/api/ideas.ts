import api from "#/lib/axios";
import type { Idea } from "#/types";


// Featch all Ideas from API endpoint
export const fetchIdeas = async (): Promise<Idea[]> => {
  const res = await api.get(`/ideas`);
  return res.data;
};


// Featch a single Idea from API endpoint
export const fetchIdea = async (ideaId: string): Promise<Idea> => {
    const res = await api.get(`/ideas/${ideaId}`);
    return res.data;
};

// For form - To submit an Idea
export const createIdea = async (newIdeas: {
    title: string;
    summary: string;
    description: string;
    tags: string[];
}): Promise<Idea> => {
    const res = await api.post('/ideas', {
        ...newIdeas,
        createdAt: new Date().toISOString(),
    });

    return res.data;
};


// To delete an Idea
   export const deleteIdea = async(ideaId: string):Promise<void> => {
        await api.delete(`/ideas/${ideaId}`);
    }