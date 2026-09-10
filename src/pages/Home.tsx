import { useEffect, useState } from 'react'
import Card from '@/components/Card'
import Chrono from '@/components/Chrono'
import CodeForm from '@/components/CodeForm'
import Logo from '@/components/Logo'
import PostitNote from '@/components/PostitNote'
import { isOpen, waitBefore } from '@/lib/schedule'

const MAX_DELAY = 2_147_483_647

export default function Home() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const wait = waitBefore(now)
    if (wait === 0) {
      return
    }
    const timer = setTimeout(() => setNow(new Date()), Math.min(wait + 500, MAX_DELAY))
    return () => clearTimeout(timer)
  }, [now])

  return (
    <div className="flex flex-col gap-8">
      <header className="text-center text-terracotta">
        <Logo className="mx-auto h-32 w-32 sm:h-40 sm:w-40" />
        <h1 className="mt-3 font-display text-5xl font-black tracking-tight sm:text-6xl">
          nounounimo
        </h1>
      </header>

      {isOpen(now) ? (
        <div className="flex flex-col gap-4">
          <Card>
            <CodeForm />
          </Card>
          <PostitNote />
        </div>
      ) : (
        <Card>
          <div className="flex flex-col items-center gap-5">
            <p className="text-center font-display text-xl leading-relaxed text-bark">
              Il est trop tôt, reviens plus tard
            </p>
            <Chrono className="h-14 w-14 text-terracotta" />
          </div>
        </Card>
      )}
    </div>
  )
}
