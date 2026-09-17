import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import type { Idea } from '#/types';

// Function to fetch data from API
const fetchIdea = async (ideaId: string): Promise<Idea> => {
      const res = await fetch(`/api/ideas/${ideaId}`);
    if(!res) throw new Error('Failed to fetch data');
    return res.json();
}

const ideaQueryOptions =(ideaId: string) => queryOptions({
  queryKey: ['ideaId', ideaId],
  queryFn: () => fetchIdea(ideaId)
})

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,

  // Loader
  loader: async ({params, context: {queryClient}}) => {
   return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  }
})

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams();
  const {data: idea} = useSuspenseQuery(ideaQueryOptions(ideaId));
  return <div className='p-4'>
    <Link to='/ideas' className='text-blue-500 underline block mb-4'>
    Back to Ideas
    </Link>
    <h2 className="text-2xl font-bold">{idea.title}</h2>
    <p className="mt-2">{idea.description}</p>
  </div>
}
