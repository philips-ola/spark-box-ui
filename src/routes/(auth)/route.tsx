import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Code2} from 'lucide-react'


export const Route = createFileRoute('/(auth)')({
  component: AUthLayout,
})

function AUthLayout() {
  return     <div className="bg-[#f8f9fb] text-slate-900 antialiased">
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
          </div>

          {/* RIGHT - 65% */}
          <div className="w-full lg:w-[65%] bg-white p-6 rounded-md">

            {/* Import Login or Register component */}
            <Outlet />

          </div>
        </div>
      </div>
    </div>
}
