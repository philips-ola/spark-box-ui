import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/')({

  head: () => ({
    meta:[
      {
        title: 'Spark Box | Project ideas'
      }
    ]
  }),

  component: IdeaPage,
})

function IdeaPage() {
  return <div>Hello "/ideas/"!</div>
}
