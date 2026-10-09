import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Code2} from 'lucide-react'
import { AboutMeCard } from '../../component/AboutMeCard'


export const Route = createFileRoute('/about/')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="bg-[#fafafb] min-h-screen w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-8 sm:py-12 lg:py-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 text- sm:text- font-bold tracking-widest px-3 py-1.5 rounded-full mb-6">
          <Code2 className="w-3.5 h-3.5" /> ABOUT THE DEVELOPER
        </div>

        {/* MAIN LAYOUT - Stack on mobile, side-by-side from 768px (tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8 lg:gap-16 items-start">

          {/* Left Card */}
            <div className="mt-8 bg-white rounded- border border-slate-200 shadow-sm p-6">
              <AboutMeCard />
            </div>

          {/* Right Content */}
          <div className="w-full min-w-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-zinc-900">
              Hi, I'm <br className="hidden sm:block" /> Philips Ola
            </h1>

            <div className="mt-5 sm:mt-6 space-y-4 text-sm sm:text- leading-6 sm:leading-7 text-zinc-600">
              <p className="font-semibold text-zinc-900">
                Previously served as Webmaster and Tutor at Edo State Polytechnic, Usen, Nigeria.
              </p>
              <p className="break-words">
                I am a frontend-focused full-stack web developer with expertise in <span className="font-semibold text-zinc-900">React.js, WordPress design, and Node.js/Express.js</span> backend engineering. I specialize in building fast, secure, and scalable digital solutions—from modern, interactive frontend applications and dynamic business websites to backend systems and API-driven platforms.
              </p>
              <p className="break-words">
                With a strong foundation in clean engineering practices and a problem-solving mindset, I focus on delivering maintainable, high-performance systems that scale effectively while prioritizing performance, security, reliability, and user experience.
              </p>
            </div>

            {/* Buttons - Full width on mobile, auto on desktop */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 sm:mt-10 w-full">
              <a
                href="https://philipsola.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white font-medium px-6 py-3.5 rounded-full transition text-sm sm:text-base"
              >
                Full stack Projects
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
              <a
                href="https://olaphilips.com.ng"
                target="_blank"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-800 font-medium px-6 py-3.5 rounded-full transition text-sm sm:text-base"
              >
                WordPress Projects
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}