import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import {useMutation, useSuspenseQuery, queryOptions} from '@tanstack/react-query'
import { fetchIdea, updateIdea } from '#/api/ideas'


const ideaQueryOptions = (id: string) => queryOptions({
    queryKey:['idea', id],
    queryFn: () => fetchIdea(id)
})

export const Route = createFileRoute('/ideas/$ideaId/edit')({
  component: IdeaEditPage,

  loader: async ({params, context:{queryClient}}) =>{
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  }
});

function IdeaEditPage() {

    const {ideaId} = Route.useParams();
    const navigate = useNavigate();
    const {data: idea} = useSuspenseQuery(ideaQueryOptions(ideaId))

    // State
    const [title, setTitle] =useState(idea.title)
    const [summary, setSummary] =useState(idea.summary)
    const [description, setDescription] =useState(idea.description)
    const [tagsInput, setTagsInput] = useState(Array.isArray(idea.tags) ? idea.tags.join(', ') : idea.tags?? '')

    const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: { title: string; summary: string; description: string; tags: string[] }) => 
        updateIdea(ideaId, data),
    onSuccess: () => {
        navigate({ to: '/ideas/$ideaId', params: { ideaId } })
    },
    })

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  mutateAsync({
    title,
    summary,
    description,
    tags: tagsInput.split(',').map((t: string) => t.trim()).filter(Boolean)
  })
}

  return (
    <div className='space-y-4 p-10'>
        {/* Header */}
    <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded- bg-zinc-900 text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L10.5 5.5L15 6L12 9.5L12.8 14L8 11.5L3.2 14L4 9.5L1 6L5.5 5.5L8 1Z" fill="currentColor" />
        </svg>
        </div>
        <div>
        <h1 className="text-[2rem] font-semibold tracking-[-0.02em] leading-none text-zinc-900">Edit Idea</h1>
        </div>
    </div>

    <Link
        to='/ideas/$ideaId'
        params={{ ideaId }}
        className="group inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text- font-medium text-zinc-600 shadow-sm hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 transition-all"
    >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-x-0.5">
        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Idea
    </Link>
    </div>

    <hr className='opacity-20 mb-8' />

      <form onSubmit={handleSubmit} className='space-y-2'>
        <div>
          <label className="text- font-semibold uppercase tracking-widest text-slate-500">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., AI tool for founders"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text- outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            required
          />
        </div>

        <div>
          <label className="text- font-semibold uppercase tracking-widest text-slate-500">Summary *</label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="One line pitch - 80 characters max"
            maxLength={80}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text- outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            required
          />
        </div>

        <div>
          <label className="text- font-semibold uppercase tracking-widest text-slate-500">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain the problem, solution, and who it's for..."
            rows={5}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text- outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 resize-none"
            required
          />
        </div>

        <div>
          <label className="text- font-semibold uppercase tracking-widest text-slate-500">Tags</label>
          <div className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-slate-900">
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="saas, ai, fintech"
              className="w-full bg-transparent text-[1rem] outline-none py-1"
            />
          </div>
          <p className="text- text-slate-400 mt-1.5">Separate each tag with a comma</p>
        </div>

        <button
          type="submit"
          
            disabled={isPending}
          className="mt-2 w-full bg-slate-900 text-white rounded-xl py-3.5 text- font-semibold hover:bg-black transition-colors cursor-pointer disabled:opacity-50"
        >
            {isPending ? 'Updating..' : 'Update Idea'}
        </button>
      </form>
    </div>
  )
}

