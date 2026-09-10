import { Link } from 'react-router'

export default function PostitNote() {
  return (
    <p className="text-center text-sm leading-relaxed text-bark-soft">
      Si jamais vous avez mélangé les post-it, voici comment les réinitialiser :{' '}
      <Link to="/init" className="font-semibold text-terracotta underline">
        la grille des post-it
      </Link>
    </p>
  )
}
