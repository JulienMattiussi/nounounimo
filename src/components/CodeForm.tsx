import { useId, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { CODE_LENGTH } from '@/lib/secret'

export default function CodeForm() {
  const [code, setCode] = useState('')
  const navigate = useNavigate()
  const inputId = useId()
  const hintId = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (code.length === 0) {
      return
    }
    void navigate(`/${code}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor={inputId} className="font-display text-lg font-semibold text-bark">
        Tapez ici le code que le chemin vous a révélé
      </label>
      <input
        id={inputId}
        aria-describedby={hintId}
        name="code"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        pattern="[0-9]*"
        maxLength={CODE_LENGTH}
        value={code}
        onChange={(event) => setCode(event.target.value.replace(/[^0-9]/g, ''))}
        className="w-full rounded-soft border-2 border-clay bg-white px-4 py-3 text-center font-display text-3xl tracking-[0.3em] text-bark shadow-inner placeholder:tracking-normal placeholder:text-bark-soft/50 focus:border-terracotta focus:outline-none"
        placeholder="········"
      />
      <p id={hintId} className="text-center text-sm text-bark-soft">
        {CODE_LENGTH} chiffres
      </p>
      <button
        type="submit"
        disabled={code.length === 0}
        className="rounded-soft bg-terracotta px-6 py-3 font-display text-lg font-bold text-cream shadow-warm transition-colors hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:bg-clay disabled:text-bark-soft disabled:shadow-none"
      >
        Valider
      </button>
    </form>
  )
}
