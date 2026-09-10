import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import BrandLink from '@/components/BrandLink'
import Card from '@/components/Card'
import Celebration from '@/components/Celebration'
import CodeForm from '@/components/CodeForm'
import { unseal } from '@/lib/secret'
import { SEALED_MESSAGE } from '@/sealed'

type Attempt = {
  code: string
  reward: string | null
}

export default function Result() {
  const params = useParams()
  const code = params['*'] ?? ''
  const [attempt, setAttempt] = useState<Attempt | null>(null)

  useEffect(() => {
    let abandoned = false

    void unseal(SEALED_MESSAGE, code).then((reward) => {
      if (!abandoned) {
        setAttempt({ code, reward })
      }
    })

    return () => {
      abandoned = true
    }
  }, [code])

  const settled = attempt?.code === code ? attempt : null
  const status = settled === null ? 'checking' : settled.reward === null ? 'failure' : 'success'

  return (
    <div className="relative z-10 flex flex-col gap-6">
      {status === 'success' && <Celebration />}
      <BrandLink />
      <Card>
        <div aria-live="polite" aria-busy={status === 'checking'}>
          {status === 'checking' && (
            <p className="py-6 text-center font-display text-xl text-bark-soft">
              Vérification en cours...
            </p>
          )}

          {status === 'success' && (
            <div className="nnm-pop flex flex-col gap-5 text-center">
              <h1 className="font-display text-4xl font-black text-terracotta sm:text-5xl">
                Félicitations, vous avez réussi&nbsp;!
              </h1>
              <p className="rounded-soft bg-postit/60 px-4 py-4 text-xl leading-relaxed text-bark">
                {settled?.reward}
              </p>
            </div>
          )}

          {status === 'failure' && (
            <div className="flex flex-col gap-6">
              <h1 className="text-center font-display text-2xl font-black text-terracotta sm:text-3xl">
                Désolé, mais vous vous êtes trompé, ce n'est pas le bon code
              </h1>
              <CodeForm />
            </div>
          )}
        </div>
      </Card>

      {status === 'failure' && (
        <p className="text-center text-sm leading-relaxed text-bark-soft">
          Si jamais vous avez mélangé les post-it, voici comment les réinitialiser :{' '}
          <Link to="/init" className="font-semibold text-terracotta underline">
            la grille des post-it
          </Link>
        </p>
      )}
    </div>
  )
}
