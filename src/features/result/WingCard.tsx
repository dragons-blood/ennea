import { typeByNumber } from '../../data/enneatypes'
import { WING_DETAIL } from '../../data/wings'
import type { TypeNumber, Wing } from '../../data/types'

const GROWTH = '#74cf9e'
const STRESS = '#e0796f'

// A rich, wing-specific card for one type+wing combination (e.g. 4w5). With `contrast`, it adds
// a line on how this wing differs from its sibling — exactly the "how 4w5 differs from 4w3" read.
export default function WingCard({ core, wing, contrast = false }: { core: TypeNumber; wing: Wing; contrast?: boolean }) {
  const t = typeByNumber(core)
  const nb = typeByNumber(wing.neighbor)
  const det = WING_DETAIL[wing.id]
  const sibling = t.wings.find((w) => w.id !== wing.id)
  const sibDet = sibling ? WING_DETAIL[sibling.id] : undefined

  return (
    <div className="glass glass-accent" style={{ ['--accent' as string]: t.color, padding: 'clamp(1.3rem, 4vw, 2rem)', borderRadius: 'var(--radius)' }}>
      <div style={{ display: 'flex', gap: 13, alignItems: 'center', flexWrap: 'wrap' }}>
        <div
          style={{ width: 46, height: 46, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', background: nb.color, color: '#0d0e16', fontFamily: 'Spectral, serif', fontSize: 21, fontWeight: 600, boxShadow: `0 0 18px -5px ${nb.color}` }}
        >
          {wing.neighbor}
        </div>
        <div>
          <div className="serif" style={{ fontSize: '1.25rem' }}>{wing.id} <span className="muted">· {wing.name}</span></div>
          <div className="small-caps" style={{ fontSize: '0.58rem', color: 'var(--brass)' }}>Type {core} with a {wing.neighbor} wing</div>
        </div>
      </div>

      <p className="serif" style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--mist)', marginTop: 14 }}>{det?.description ?? wing.blurb}</p>

      {det && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14, marginTop: 16 }}>
          <div className="glass" style={{ padding: '13px 15px', borderRadius: 13 }}>
            <div className="small-caps" style={{ color: GROWTH, fontSize: '0.58rem' }}>✦ The gift</div>
            <p className="muted" style={{ margin: '6px 0 0', fontSize: '0.93rem' }}>{det.gift}</p>
          </div>
          <div className="glass" style={{ padding: '13px 15px', borderRadius: 13 }}>
            <div className="small-caps" style={{ color: STRESS, fontSize: '0.58rem' }}>☾ Growth edge</div>
            <p className="muted" style={{ margin: '6px 0 0', fontSize: '0.93rem' }}>{det.watch}</p>
          </div>
        </div>
      )}

      {contrast && sibling && sibDet && det && (
        <p className="whisper" style={{ fontSize: '0.86rem', marginTop: 16, lineHeight: 1.6 }}>
          The other wing, <strong style={{ color: 'var(--bone)' }}>{core}{sibling.id.slice(1)}</strong> ({sibling.name}), leans {sibDet.lean};
          your <strong style={{ color: t.color }}>{wing.id}</strong> leans {det.lean}.
        </p>
      )}
    </div>
  )
}
