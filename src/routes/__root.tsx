import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import '../styles.css'
import { QueryClient } from '@tanstack/react-query'
import Header from '#/component/Header'
import NotFound from '#/component/NotFound'

// Added
type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
head: () => ({
  meta:[
    {
      name: 'description',
      content: 'Share new startup ideas for developers'
    },
    {
      name: 'keywords',
      content: 'Philips Ola, Developers in Nigeria, React developer, software engineer, front end developer'
    },
    {
      name: 'author',
      content: 'Philips Ola | Software engineer in Nigeria'
    },
    {
      title: 'Spark Box - New ideas for developers'
    }
  ]
}),

  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <div>
      <HeadContent />
      <Header />
      <main className='flex justify-center p-6'>
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-4">
      <Outlet />
      </div>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
      </main>
    </div>
  )
}

