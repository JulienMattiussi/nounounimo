import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { BALLOON_COUNT, CONFETTI_COUNT } from '@/lib/celebration'
import { routes } from '@/routes'
import { TEST_CODE, TEST_REWARD_SHOWN, TEST_REWARD_STRONG } from '../fixtures/sealed'

vi.mock('@/sealed', async () => {
  const { TEST_SEALED } = await import('../fixtures/sealed')
  return { SEALED_MESSAGE: TEST_SEALED }
})

const renderAt = (path: string) =>
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />)

describe('home page', () => {
  it('shows the title, the icon and the code field', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'nounounimo' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /chat et un lapin/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/le code que le chemin vous a révélé/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Valider' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /post-it/i })).toHaveAttribute('href', '/init')
  })

  it('keeps Valider unusable until something is typed', async () => {
    renderAt('/')
    const submit = screen.getByRole('button', { name: 'Valider' })
    expect(submit).toBeDisabled()

    await userEvent.type(screen.getByLabelText(/le code que le chemin/i), '1234')
    expect(submit).toBeEnabled()
  })

  it('refuses anything but digits in the field', async () => {
    renderAt('/')
    const field = screen.getByLabelText(/le code que le chemin/i)
    await userEvent.type(field, '12ab34')
    expect(field).toHaveValue('1234')
  })

  it('sends the typed code to its own route', async () => {
    renderAt('/')
    await userEvent.type(screen.getByLabelText(/le code que le chemin/i), '00000000')
    await userEvent.click(screen.getByRole('button', { name: 'Valider' }))
    expect(
      await screen.findByRole('heading', { name: /vous vous êtes trompé/i }),
    ).toBeInTheDocument()
  })
})

describe('result page', () => {
  it('congratulates and reveals the message on the right code', async () => {
    const { container } = renderAt(`/${TEST_CODE}`)
    expect(
      await screen.findByRole('heading', { name: /Félicitations, vous avez réussi/i }),
    ).toBeInTheDocument()
    expect(container.textContent).toContain(TEST_REWARD_SHOWN)
  })

  it('renders the emphasis carried by the message, without showing its markers', async () => {
    const { container } = renderAt(`/${TEST_CODE}`)
    await screen.findByRole('heading', { name: /Félicitations/i })
    expect(container.textContent).not.toContain('**')
    expect(container.querySelector('strong')).toHaveTextContent(TEST_REWARD_STRONG)
  })

  it('decorates the win with confetti and balloons, hidden from screen readers', async () => {
    const { container } = renderAt(`/${TEST_CODE}`)
    await screen.findByRole('heading', { name: /Félicitations/i })
    expect(container.querySelectorAll('.nnm-confetti')).toHaveLength(CONFETTI_COUNT)
    expect(container.querySelectorAll('.nnm-balloon')).toHaveLength(BALLOON_COUNT)
    expect(container.querySelector('.nnm-confetti')?.closest('[aria-hidden="true"]')).not.toBeNull()
  })

  it('keeps the failure page sober', async () => {
    const { container } = renderAt('/00000000')
    await screen.findByRole('heading', { name: /vous vous êtes trompé/i })
    expect(container.querySelectorAll('.nnm-confetti')).toHaveLength(0)
  })

  it('never leaks the message on a wrong code', async () => {
    const { container } = renderAt('/00000000')
    await screen.findByRole('heading', { name: /vous vous êtes trompé/i })
    expect(container.textContent).not.toContain(TEST_REWARD_SHOWN)
    expect(container.textContent).not.toContain(TEST_REWARD_STRONG)
  })

  it('offers the code field again and the post-it note when the code is wrong', async () => {
    renderAt('/00000000')
    await screen.findByRole('heading', { name: /vous vous êtes trompé/i })
    expect(screen.getByRole('button', { name: 'Valider' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /post-it/i })).toHaveAttribute('href', '/init')
  })

  it('treats an unknown address as a wrong code', async () => {
    renderAt('/bonjour')
    expect(
      await screen.findByRole('heading', { name: /vous vous êtes trompé/i }),
    ).toBeInTheDocument()
  })
})

describe('init page', () => {
  it('lays out the 81 post-it from AA to DB', () => {
    renderAt('/init')
    const tiles = screen.getAllByRole('listitem')
    expect(tiles).toHaveLength(81)
    expect(tiles[0]).toHaveTextContent('AA')
    expect(tiles.at(-1)).toHaveTextContent('DB')
  })

  it('marks the centre tile as the start', () => {
    renderAt('/init')
    const tiles = screen.getAllByRole('listitem')
    expect(tiles[40]).toHaveTextContent('DEPART')
    expect(tiles.filter((tile) => tile.textContent === 'DEPART')).toHaveLength(1)
  })

  it('offers a way back home', () => {
    renderAt('/init')
    expect(screen.getByRole('link', { name: "Retour à l'accueil" })).toHaveAttribute('href', '/')
  })
})
