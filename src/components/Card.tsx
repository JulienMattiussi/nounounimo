import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
}

export default function Card({ children }: CardProps) {
  return (
    <section className="rounded-soft border border-sand bg-white/70 p-6 shadow-warm sm:p-8">
      {children}
    </section>
  )
}
