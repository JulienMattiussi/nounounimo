import { Link } from 'react-router'
import BrandLink from '@/components/BrandLink'
import Card from '@/components/Card'
import { postits, postitTilt } from '@/lib/postits'

const tiles = postits()

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

          <ul className="-mx-2 grid grid-cols-9 gap-0.5 sm:mx-0 sm:gap-2">
            {tiles.map((tile, index) => (
              <li
                key={tile.label}
                style={{ transform: `rotate(${postitTilt(index)}deg)` }}
                className={
                  tile.isStart
                    ? '@container relative flex aspect-square items-center justify-center rounded-xs border-b-2 border-terracotta-dark bg-terracotta shadow-sm'
                    : '@container relative flex aspect-square items-center justify-center rounded-xs border-b-2 border-postit-edge bg-postit shadow-sm'
                }
              >
                {tile.isStart ? (
                  <span className="font-display text-[23cqw] leading-none font-black tracking-tighter text-cream">
                    {tile.label}
                  </span>
                ) : (
                  <>
                    <span className="absolute top-0 left-[8%] font-display text-[24cqw] leading-tight font-bold text-bark-soft">
                      {tile.label}
                    </span>
                    <span className="mt-[12%] font-display text-[52cqw] leading-none font-black text-bark">
                      {tile.digit}
                    </span>
                  </>
                )}
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
