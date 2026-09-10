import Card from '@/components/Card'
import CodeForm from '@/components/CodeForm'
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <header className="text-center text-terracotta">
        <Logo className="mx-auto h-32 w-32 sm:h-40 sm:w-40" />
        <h1 className="mt-3 font-display text-5xl font-black tracking-tight sm:text-6xl">
          nounounimo
        </h1>
      </header>
      <Card>
        <CodeForm />
      </Card>
    </div>
  )
}
