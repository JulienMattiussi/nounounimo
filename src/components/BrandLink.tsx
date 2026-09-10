import { Link } from 'react-router'
import Logo from '@/components/Logo'

export default function BrandLink() {
  return (
    <Link
      to="/"
      className="mx-auto flex w-fit items-center gap-2 rounded-soft px-2 py-1 text-terracotta transition-colors hover:text-terracotta-dark"
    >
      <Logo className="h-10 w-10" />
      <span className="font-display text-xl font-bold tracking-tight">nounounimo</span>
    </Link>
  )
}
