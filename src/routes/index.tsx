import { createFileRoute, Link } from '@tanstack/react-router'
import { Rocket, ArrowUpRight, Code2} from 'lucide-react'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { AboutMeCard } from '../component/AboutMeCard.tsx'
import { fetchIdeas } from '#/api/ideas'
import IdeaCard from '#/component/IdeaCard'


const ideasQueryOptions = () => queryOptions({
  queryKey: ['ideas', {limit: 5}],

  // From api/idea.ts/fetchIdea
  queryFn: () => fetchIdeas(5)
})

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async ({context: {queryClient}}) => {
    return queryClient.ensureQueryData(ideasQueryOptions());
  }
})

function HomePage() {
  const {data:ideas} = useSuspenseQuery(ideasQueryOptions());
  // const ideas = Array.isArray(data) ? data : data?.data ?? data?.ideas ?? [];
    // const ideas = [...(data?? [])]
  //   .sort(
  //     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  // const latestIdeas = ideas.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-900 antialiased">
      <div className="container mx-auto px-6 lg:px-14 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

          {/* LEFT - 35% */}
          <div className="w-full lg:w-[35%] lg:sticky lg:top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-100 border border-yellow-200 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text- font-semibold tracking-widest uppercase text-slate-500">Express.js + React.js</span>
            </div>

            <h1 className="text-[2.60rem] font-bold tracking-tight leading-[1.05]">
              Spark your vision <br /> with an Idea
            </h1>
            <p className="mt-4 text-slate-500 max-w-xs text- leading-relaxed">
              Where ideas stop scrolling and start building. Share what you won't build, explore what you could, and build on what the community dares to imagine
            </p>

            <div className="mt-8 bg-white rounded- border border-slate-200 shadow-sm p-6">
            <AboutMeCard />
           </div>
            

          </div>

          {/* RIGHT - 65% */}
          <div className="w-full lg:w-[65%]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                <Rocket className="w-4 h-4" />
              </div>
              <h2 className="text- font-bold tracking-tight">Latest</h2>
              <span className="rounded-full bg-slate-900 text-white text- px-3 py-0.2">{ideas.length} New</span>
              <h2 className="text- font-bold tracking-tight">Ideas</h2>
            </div>

      <ul className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
        {ideas.map((idea) => (
          <li
            key={idea._id}
            className="group relative flex flex-col justify-between rounded- border border-zinc-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-300"
          >
            <IdeaCard idea={idea} />
          </li>
        ))}
      </ul>

            <Link to="/ideas" className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-5 py-3.5 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
              View All Ideas <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}