import { Link } from 'react-router'
import BrandLink from '@/components/BrandLink'
import Card from '@/components/Card'
import { postitLabels, postitTilt } from '@/lib/postits'

const labels = postitLabels()

export default function Init() {
  return (
    <div className="flex flex-col gap-6">
      <BrandLink />
      <Card>
        <div className="flex flex-col gap-5">
          <div className="text-center">
            <h1 className="font-display text-2xl font-black text-terracotta sm:text-3xl">
              Remettre les post-it en place
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-bark-soft">
              Replacez-les comme ci-dessous
            </p>
          </div>

          <ul className="grid grid-cols-8 gap-1.5 sm:gap-2">
            {labels.map((label, index) => (
              <li
                key={label}
                style={{ transform: `rotate(${postitTilt(index)}deg)` }}
                className="flex aspect-square items-start justify-start rounded-xs border-b-2 border-postit-edge bg-postit p-0.5 shadow-sm sm:p-1"
              >
                <span className="font-display text-[0.6rem] font-bold text-bark sm:text-xs">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Link
        to="/"
        className="mx-auto rounded-soft bg-terracotta px-6 py-3 font-display text-lg font-bold text-cream shadow-warm transition-colors hover:bg-terracotta-dark"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}
