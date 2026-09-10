import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Page introuvable</h1>
      <p className="mt-2 text-slate-600">
        Cette adresse ne correspond à rien.{' '}
        <Link to="/" className="underline">
          Retour à l'accueil
        </Link>
      </p>
    </section>
  )
}
