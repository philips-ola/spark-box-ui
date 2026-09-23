import { Link } from "@tanstack/react-router";
import type { Idea } from "#/types";

type Props = {
  idea: Idea
}

const IdeaCard = ({ idea }: Props) => {
  // make tags always an array
  const tags = Array.isArray(idea.tags)
   ? idea.tags
    : typeof idea.tags === 'string'
   ? (idea.tags as string).split(',').map(t => t.trim()).filter(Boolean)
    : []

  return (
    <>
      {/* top */}
      <div>
        <div className="flex items-center justify-between">
          <span className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="px-2 mr-2 py-1 bg-zinc-100 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </span>
          <span className="text-xs text-zinc-400">
            {idea.createdAt? new Date(idea.createdAt).toLocaleDateString() : ''}
          </span>
        </div>

        <h2 className="mt-5 text-[1.5rem] font-semibold leading-tight tracking-tight text-zinc-900 line-clamp-2 group-hover:text-black">
          {idea.title}
        </h2>
        <p className="mt-2.5 text- leading-6 text-zinc-500 line-clamp-3">
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
    </>
  )
}

export default IdeaCard;