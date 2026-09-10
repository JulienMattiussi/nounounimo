import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { routes } from '@/routes'

const renderAt = (path: string) =>
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />)

describe('routing', () => {
  it('renders the home page at the root', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'nounounimo' })).toBeInTheDocument()
  })

  it('renders the not-found page on an unknown path', () => {
    renderAt('/nawak')
    expect(screen.getByRole('heading', { name: 'Page introuvable' })).toBeInTheDocument()
  })

  it('navigates through the main nav', async () => {
    renderAt('/')
    await userEvent.click(screen.getByRole('link', { name: 'À propos' }))
    expect(screen.getByRole('heading', { name: 'À propos' })).toBeInTheDocument()
  })
})
