import type { RouteObject } from 'react-router'
import App from '@/App'
import Home from '@/pages/Home'
import Init from '@/pages/Init'
import Result from '@/pages/Result'

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'init', Component: Init },
      { path: '*', Component: Result },
    ],
  },
]
