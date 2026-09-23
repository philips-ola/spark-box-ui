import { createFileRoute, Link } from '@tanstack/react-router'
import { Rocket, ArrowUpRight, Code2} from 'lucide-react'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { FaGithub, FaLinkedin, FaYoutube} from 'react-icons/fa'
import { fetchIdeas } from '#/api/ideas'
import IdeaCard from '#/component/IdeaCard'


const ideasQueryOptions = () => queryOptions({
  queryKey: ['ideas'],

  // From api/idea.ts/fetchIdea
  queryFn: fetchIdeas
})

export const Route = createFileRoute('/')({
  component: Home,
  loader: async ({context: {queryClient}}) => {
    return queryClient.ensureQueryData(ideasQueryOptions());
  }
})

function Home() {
  const {data} = useSuspenseQuery(ideasQueryOptions());
    const ideas = [...(data?? [])].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const latestIdeas = ideas.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-900 antialiased">
      <div className="container mx-auto px-6 lg:px-14 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">

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
              <div className="flex flex-col items-center text-center gap-4">
             
                <img
                  src="/img/philips.png"
                  alt="Philips Ola"
                  className="w-40 h-40 rounded-full object-cover border-2 border-white shadow-sm"
                />

                <div>
                  <h3 className="text-[1.5rem] font-semibold">Philips Ola</h3>
                  <p className="text- font-semibold uppercase tracking-widest text-slate-500 mt-1">
                   Builder & Tutor
                  </p>
                  <p className="mt-3 text- leading-snug text-slate-500">
                    Software engineer and digital content creator/tutor building tools for founders.
                  </p>
                </div>

                {/* SOCIAL HANDLES*/}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-3 w-full">
                  <a
                    href="https://linkedin.com/in/olaphilips"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#0A66C2] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>

                  <a
                    href="https://youtube.com/idtechnol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#FF0000] transition-colors"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="w-4 h-4" />
                  </a>

                  <a
                    href="https://github.com/philips-ola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                </div>

                <span className="text- text-slate-400">Full Stack Dev</span>
              </div>
            </div>
          </div>

          {/* RIGHT - 65% */}
          <div className="w-full lg:w-[65%]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                <Rocket className="w-4 h-4" />
              </div>
              <h2 className="text- font-bold tracking-tight">Latest</h2>
              <span className="rounded-full bg-slate-900 text-white text- px-3 py-0.2">{latestIdeas.length} New</span>
              <h2 className="text- font-bold tracking-tight">Ideas</h2>
            </div>

      <ul className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
        {ideas.map((idea) => (
          <li
            key={idea.id}
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