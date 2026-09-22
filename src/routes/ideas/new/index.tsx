import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { createIdea } from '#/api/ideas'
import { useMutation } from '@tanstack/react-query'

export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeaPage,
})

function NewIdeaPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      window.alert('Idea submitted successfully');
      navigate({ to: '/ideas' })
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() ||!summary.trim() ||!description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await mutateAsync({
        title: title.trim(),
        summary: summary.trim(),
        description: description.trim(),
        tags: tags.split(',').map((tag) => tag.trim()).filter((tag) => tag!== ''),
      });
    } catch (error) {
      console.log(error);
      alert('Something went wrong')
    }
  }

  return (
    <div className='space-y-4 p-10'>
      {/* FIXED: onClick -> onSubmit */}
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
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="saas, ai, fintech"
              className="w-full bg-transparent text- outline-none py-1"
            />
          </div>
          <p className="text- text-slate-400 mt-1.5">Separate each tag with a comma</p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full bg-slate-900 text-white rounded-xl py-3.5 text- font-semibold hover:bg-black transition-colors cursor-pointer disabled:opacity-50"
        >
          {isPending? 'Publishing...' : 'Publish Idea'}
        </button>
      </form>
    </div>
  )
}