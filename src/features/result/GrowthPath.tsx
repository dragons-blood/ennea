import type { TypeNumber } from '../../data/types'
import { typeByNumber } from '../../data/enneatypes'
import { DEPTH } from '../../data/depth'

const GROWTH = '#74cf9e'

export default function GrowthPath({ type }: { type: TypeNumber }) {
  const t = typeByNumber(type)
  const g = typeByNumber(t.growthTo)
  const d = DEPTH[type]
  return (
    <div className="glass glass-accent" style={{ ['--accent' as string]: GROWTH, padding: 'clamp(1.5rem, 4vw, 2.3rem)', borderRadius: 'var(--radius)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div
          style={{ width: 42, height: 42, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', background: g.color, color: '#0d0e16', fontFamily: 'Spectral, serif', fontSize: 20, fontWeight: 600, boxShadow: `0 0 20px -4px ${g.color}` }}
        >
          {g.number}
        </div>
        <div>
          <div className="small-caps" style={{ color: GROWTH }}>Your growth path → Type {g.number}, {g.name}</div>
          <div className="muted" style={{ fontSize: '0.85rem' }}>where you head when you're at your healthiest</div>
        </div>
      </div>
      <p className="serif" style={{ fontSize: '1.14rem', lineHeight: 1.75, color: 'var(--mist)', marginTop: 16 }}>{d.growth}</p>
      <div className="small-caps" style={{ color: 'var(--brass)', marginTop: 18, marginBottom: 10 }}>Practice this</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {d.practices.map((p) => (
          <li key={p} style={{ display: 'flex', gap: 10, alignItems: 'baseline', color: 'var(--bone)' }}>
            <span aria-hidden style={{ color: GROWTH, fontSize: 11 }}>→</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
