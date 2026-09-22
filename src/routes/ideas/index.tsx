import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchIdeas } from '#/api/ideas';


const ideasQueryOptions =() => queryOptions({
  queryKey: ['ideas'],

  // From api/idea.ts/fetchIdeas
  queryFn: () => fetchIdeas()
})


export const Route = createFileRoute('/ideas/')({

  head: () => ({
    meta:[
      {
        title: 'Spark Box | Project ideas'
      }
    ]
  }),

  component: IdeasPage,

     // Loader
  loader: async ({context: {queryClient}}) => {
   return queryClient.ensureQueryData(ideasQueryOptions());
     }

});

function IdeasPage() {

  const { data } = useSuspenseQuery(ideasQueryOptions());
  const ideas = [...data].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

   return (
    <div className="min-h-screen bg-[#fbfbfa] px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-end justify-between">
          <div>
            <div className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1 text- font-medium tracking-widest text-white">
              {ideas.length} ACTIVE IDEAS
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900">
              Empower Your Vision With Great Ideas
            </h1>
            <p className="mt-2 text-sm text-zinc-500 max-w-lg">
              Explore, refine and ship your best concepts. Curated for clarity.
            </p>
          </div>
        </div>

        {/* Search bar - UI only */}
        <div className="mt-8 flex gap-3">
          <div className="flex-1 relative">
            <input
              placeholder="Search ideas..."
              className="w-full rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <button className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium hover:bg-zinc-50">
            Search
          </button>
        </div>
      </div>

      {/* Grid */}
      <ul className="max-w-7xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {ideas.map((idea) => (
          <li
            key={idea.id}
            className="group relative flex flex-col justify-between rounded- border border-zinc-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-300"
          >
            {/* top */}
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text- font-medium tracking-wide text-zinc-600">
                  TAGS  
              
                </span>
                <span className="text- text-zinc-400">{new Date(idea.createdAt).toLocaleDateString()}</span>
              </div>

              <h2 className="mt-5 text-[1.5rem] font-semibold leading-tight tracking-tight text-zinc-900 line-clamp-2 group-hover:text-black">
                {idea.title}
              </h2>
              <p className="mt-2.5 text-[1rem] leading-6 text-zinc-500 line-clamp-3">
                {idea.summary}
              </p>
            </div>

            {/* footer */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-zinc-900" />
                <span className="text-xs text-zinc-500">By you</span>
              </div>

              <Link
                to="/ideas/$ideaId"
                params={{ ideaId: idea.id.toString() }}
                className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-black group-hover:gap-2"
              >
                View Idea <span aria-hidden>→</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
