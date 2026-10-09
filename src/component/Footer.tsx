import { Link } from '@tanstack/react-router'
import { Sparkles } from 'lucide-react'
import { FaGithub, FaLinkedin, FaYoutube} from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-100 mt-16">
      <div className="container mx-auto px-6 lg:px-14 py-12">
        {/* Top - 3 columns, stacked on mobile only, row on tablet + desktop */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-10">
          
          {/* 1. Brand */}
          <div className="sm:w-[40%] lg:w-[30%]">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-50 p-1.5 rounded-xl">
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xl font-bold tracking-tight">SparkBox</span>
            </Link>
            <p className="text-sm text-zinc-500 mt-4 leading-relaxed max-w-xs">
              Where ideas stop scrolling and start building. Share what you won't build, 
              explore what you could.
            </p>
            <p className="text-xs text-zinc-400 mt-3 font-medium">
              EXPRESS.JS + REACT.JS
            </p>
          </div>

          {/* 2. Links */}
          <div className="flex gap-12 md:gap-50 sm:gap-30 lg:w-[50%]">
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 mb-4">Explore</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><Link to="/" className="hover:text-zinc-900 transition"> {'> '}Home</Link></li>
                <li><Link to="/ideas" className="hover:text-zinc-900 transition"> {'> '} Ideas</Link></li>
                <li><Link to="/ideas/new" className="hover:text-zinc-900 transition"> {'> '} Submit Idea</Link></li>
              </ul>
            </div>

            <div className='lg:w-[40%]'>
              <h4 className="text-sm font-semibold text-zinc-900 mb-4">Let's Connect</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li>Philips Ola</li>
                <li className="text-xs">Builder & Tutor</li>
                <li className="flex gap-2 pt-1">
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3 w-full">
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

                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-100 mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} SparkBox. Built by Philips Ola.
          </p>
          <div className="flex gap-6 text-xs text-zinc-400">
            <span>Full Stack Dev</span>
            <span className="hidden sm:inline">•</span>
            <span>Built with Express + React + TanStack</span>
          </div>
        </div>
      </div>
    </footer>
  )
}