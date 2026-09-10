type ChronoProps = {
  className?: string
}

export default function Chrono({ className }: ChronoProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="32" cy="39" r="19" />
        <path d="M26 8 H38" />
        <path d="M32 8 V20" />
        <path d="M47.5 24.5 L52 20" />
        <path d="M32 39 L40 45" />
        <g className="nnm-animated nnm-hand">
          <path d="M32 39 V29" />
        </g>
      </g>
    </svg>
  )
}
