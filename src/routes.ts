import type { RouteObject } from 'react-router'
import App from '@/App'
import Home from '@/pages/Home'
import About from '@/pages/About'
import NotFound from '@/pages/NotFound'

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'a-propos', Component: About },
      { path: '*', Component: NotFound },
    ],
  },
]
