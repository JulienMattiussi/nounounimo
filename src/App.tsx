import { Outlet } from 'react-router'

export default function App() {
  return (
    <div className="min-h-dvh px-4 py-8 sm:py-12">
      <main className="mx-auto w-full max-w-xl">
        <Outlet />
      </main>
    </div>
  )
}
