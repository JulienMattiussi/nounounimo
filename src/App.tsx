import { NavLink, Outlet } from 'react-router'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'rounded px-3 py-1 bg-slate-900 text-white'
    : 'rounded px-3 py-1 text-slate-700 hover:bg-slate-200'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav
          aria-label="Navigation principale"
          className="mx-auto flex max-w-3xl gap-2 px-4 py-3 text-sm"
        >
          <NavLink to="/" end className={linkClass}>
            Accueil
          </NavLink>
          <NavLink to="/a-propos" className={linkClass}>
            À propos
          </NavLink>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
