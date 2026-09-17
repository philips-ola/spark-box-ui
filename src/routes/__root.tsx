import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import '../styles.css'
import { QueryClient } from '@tanstack/react-query'

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
})

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
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
    </>
  )
}
