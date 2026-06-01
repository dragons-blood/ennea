import type { TypeNumber } from '../../data/types'
import { typeByNumber } from '../../data/enneatypes'
import { CAREERS } from '../../data/careers'

export default function Callings({ type }: { type: TypeNumber }) {
  const t = typeByNumber(type)
  const c = CAREERS[type]
  return (
    <div className="glass glass-accent" style={{ ['--accent' as string]: t.color, padding: 'clamp(1.4rem, 4vw, 2.1rem)', borderRadius: 'var(--radius)' }}>
      <p className="serif" style={{ fontSize: '1.12rem', lineHeight: 1.7, color: 'var(--mist)', marginTop: 0 }}>{c.note}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 18 }}>
        {c.paths.map((p) => (
          <span key={p} className="chip" style={{ ['--accent' as string]: t.color }}>{p}</span>
        ))}
      </div>
      <p className="whisper" style={{ fontSize: '0.74rem', marginTop: 16, marginBottom: 0 }}>
        Type never dictates a career — every type thrives in every field. These are the directions your core motivation
        tends to make easeful.
      </p>
    </div>
  )
}
