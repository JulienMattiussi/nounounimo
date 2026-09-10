import { balloons, confettiPieces } from '@/lib/celebration'

const TONES = ['#c4623c', '#fbe38a', '#e4c9a4', '#e8a48c', '#a9bd93']

const tone = (index: number) => TONES[index % TONES.length]

const px = (value: number) => `${Math.round(value * 10) / 10}px`

const pieces = confettiPieces()
const floaters = balloons()

export default function Celebration() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {floaters.map((balloon, index) => (
        <svg
          key={`balloon-${index}`}
          viewBox="0 0 40 64"
          className="nnm-animated nnm-balloon absolute"
          style={{
            left: `${balloon.left}%`,
            top: `${balloon.top}%`,
            width: px(balloon.size),
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
          }}
        >
          <ellipse cx="20" cy="22" rx="15" ry="19" fill={tone(balloon.tone)} opacity="0.55" />
          <ellipse cx="14.5" cy="15" rx="4" ry="6" fill="#ffffff" opacity="0.35" />
          <path d="M17 40.5 L23 40.5 L20 45 Z" fill={tone(balloon.tone)} opacity="0.55" />
          <path
            d="M20 45 C24 50 16 55 20 63"
            fill="none"
            stroke={tone(balloon.tone)}
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
        </svg>
      ))}

      {pieces.map((piece, index) => (
        <span
          key={`confetti-${index}`}
          className="nnm-animated nnm-confetti absolute block"
          style={{
            left: `${piece.left}%`,
            width: px(8 * piece.scale),
            height: px(13 * piece.scale),
            backgroundColor: tone(piece.tone),
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            ['--nnm-drift' as string]: px(piece.drift),
          }}
        />
      ))}
    </div>
  )
}
