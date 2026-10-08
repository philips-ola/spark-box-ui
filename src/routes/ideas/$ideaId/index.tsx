import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { fetchIdea, deleteIdea } from '#/api/ideas';
import { useAuth } from '#/context/AuthContext';

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
  
  const navigate = useNavigate();
  const {user} = useAuth();

  const {mutateAsync: deleteMutate, isPending} =useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({to: '/ideas'})
    }
  })
 
  // Delete handler
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Idea');
    if(confirmDelete){
      await deleteMutate();
    }
  }


  // make tags always an array
  const tags = Array.isArray(idea.tags)
   ? idea.tags
    : typeof idea.tags === 'string'
   ? (idea.tags as string).split(',').map(t => t.trim()).filter(Boolean)
    : []

  return <div className='p-4'>
    <Link to='/ideas' className='text-blue-500 underline block mb-4'>
    Back to Ideas
    </Link>
    <h2 className="text-2xl font-bold">{idea.title}</h2>
    <p className="mt-2">{idea.description}</p>



        {/* Edit Link */}
    {user && user.id === idea.user._id &&   (
      <>
    <Link to='/ideas/$ideaId/edit' params={{ideaId}} className='inline-block text-sm bg-yellow-500 hover:bg-yellow-600 text-white mt-4 mr-2 px-4 py-2 rounded transition'>
    Edit
    </Link>

    {/* Delete Button */}
    <button onClick={handleDelete} disabled={isPending} className="text-sm bg-red-600 hover:bg-red-700 text-white mt-4 px-4 py-2 cursor-pointer rounded transition disabled:opacity:50">
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
    </>
    )}

    <div className='my-4 bg-gray-200 h-1' />

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2">
    <span className="flex flex-wrap gap-1">
      <span className='mr-2 text-zinc-400'>Tags:</span> {tags.slice(0, 3).map((tag: string) => (
        <span key={tag} className="px-2 mr-2 py-1 bg-zinc-100 rounded-full text-xs">
          {tag}
        </span>
      ))}
    </span>
    <span className="text-xm text-zinc-400">
      <span className='mr-2'>Published By:</span> {idea.user?.name || 'Anonymous'}
    </span>
    <span className="text-xm text-zinc-400">
      <span className='mr-2'>Published on:</span> {idea.createdAt? new Date(idea.createdAt).toLocaleDateString() : ''}
    </span>
  </div>



  </div>
}
