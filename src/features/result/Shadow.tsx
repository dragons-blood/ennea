import type { Result } from '../../data/types'
import { typeByNumber } from '../../data/enneatypes'
import { DEPTH } from '../../data/depth'

export default function Shadow({ result }: { result: Result }) {
  const t = typeByNumber(result.core)
  const d = DEPTH[result.core]
  return (
    <div className="stack" style={{ gap: 18, ['--accent' as string]: t.color }}>
      <div className="glass glass-accent" style={{ ['--accent' as string]: t.color, padding: 'clamp(1.4rem, 4vw, 2.1rem)', borderRadius: 'var(--radius)' }}>
        <div className="small-caps" style={{ color: 'var(--brass)' }}>Your core knot</div>
        <p className="serif" style={{ fontSize: '1.16rem', lineHeight: 1.75, color: 'var(--mist)', marginTop: 12 }}>{d.coreKnot}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14, marginTop: 18 }}>
          <div>
            <div className="small-caps" style={{ fontSize: '0.58rem' }}>Basic fear</div>
            <div style={{ color: 'var(--bone)', marginTop: 3 }}>{t.basicFear}</div>
          </div>
          <div>
            <div className="small-caps" style={{ fontSize: '0.58rem' }}>Basic desire</div>
            <div style={{ color: 'var(--bone)', marginTop: 3 }}>{t.basicDesire}</div>
          </div>
        </div>
      </div>

      <div className="glass" style={{ padding: 'clamp(1.4rem, 4vw, 2.1rem)', borderRadius: 'var(--radius)', borderColor: 'rgba(224,121,111,0.35)' }}>
        <div className="small-caps" style={{ color: '#e0796f' }}>Your shadow &amp; flaws</div>
        <p className="muted" style={{ margin: '8px 0 0' }}>The traps your type falls into — owning them honestly is the whole work.</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
          {d.shadow.map((s) => (
            <li key={s} style={{ display: 'flex', gap: 10, alignItems: 'baseline', color: 'var(--mist)' }}>
              <span aria-hidden style={{ color: '#e0796f', fontSize: 10 }}>▲</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
