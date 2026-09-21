import { createFileRoute } from '@tanstack/react-router'
import { Rocket, ArrowUpRight, Sparkles} from 'lucide-react'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import type { Idea } from '#/types'
import api from '#/lib/axios'

const fetchIdeas = async (): Promise<Idea[]> => {
    const res = await api.get(`/ideas`);
    return res.data;
}

const ideasQueryOptions = () => queryOptions({
  queryKey: ['ideas'], // changed from ideaId
  queryFn: () => fetchIdeas()
})

export const Route = createFileRoute('/')({
  component: Home,
  loader: async ({context: {queryClient}}) => {
   return queryClient.ensureQueryData(ideasQueryOptions());
  }
})

function Home() {
  const {data: ideas} = useSuspenseQuery(ideasQueryOptions());

  // LIMIT TO 5
  const latestIdeas = ideas.slice(0, 5);

  return (
    <>
      <div>
        <div>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">

            {/* LEFT - 35% */}
            <div className="w-full lg:w-[35%] lg:sticky lg:top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-100 border border-yellow-200 flex items-center justify-center">
                  <Rocket className="w-7 h-7 text-yellow-600" />
                </div>
                <span className="text- font-semibold tracking-widest uppercase text-slate-500">Live • 2026</span>
              </div>

              <h1 className="text-[2.75rem] font-extrabold tracking-tight leading-[1.05]">
                Spark yourself <br /> with an Idea
              </h1>
              <p className="mt-4 text-slate-500 max-w-xs text- leading-relaxed">
                Share, explore, and build on the best startup ideas and side hustles.
              </p>

              <div className="mt-8 bg-white rounded- border border-slate-200 shadow-sm p-6">
                <div className="flex items-start gap-4">

                  <div className="pt-1">
                    <h3 className="text- font-semibold">Philips Ola</h3>
                    <p className="text- font-semibold uppercase tracking-widest text-slate-500 mt-1">Founder & Builder</p>
                    <p className="mt-3 text- leading-snug text-slate-500">
                      Website developer and digital content creator building tools for founders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - 65% */}
            <div className="w-full lg:w-[65%]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text- font-bold tracking-tight">Latest Ideas</h2>
                <span className="rounded-full bg-slate-900 text-white text- px-2.5 py-1">{latestIdeas.length} New</span>
              </div>

              <ul className="space-y-4">
                {latestIdeas.map((idea) => (
                  <li key={idea.id} className="group rounded- bg-white border border-slate-200 p-6 hover:shadow-lg hover:-translate-y- transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-slate-100 rounded-full px-2.5 py-1 text- text-slate-600">
                        {new Date(idea.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h1 className="text- font-semibold">{idea.title}</h1>
                    <p className="mt-2 text-[13.5px] text-slate-500">{idea.summary}</p>
                    <div className="mt-5 flex items-center gap-1.5 text- font-medium group-hover:text-blue-600">
                      Read idea <span className="w-5 h-5 rounded-full bg-slate-900 group-hover:bg-blue-600 text-white flex items-center justify-center"><ArrowUpRight className="w-3.5 h-3.5" /></span>
                    </div>
                  </li>
                ))}
              </ul>

              <a href="/ideas" className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-5 py-3.5 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                View All Ideas <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}