import type { Result } from '../../data/types'
import { typeByNumber } from '../../data/enneatypes'
import { DEPTH } from '../../data/depth'

function Trio({ items, color }: { items: [string, string, string][]; color: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
      {items.map(([label, body, c]) => (
        <div key={label} className="glass" style={{ ['--accent' as string]: color, padding: '16px 18px', borderRadius: 14, borderColor: `${c}44` }}>
          <div className="small-caps" style={{ color: c, fontSize: '0.6rem' }}>{label}</div>
          <p className="muted" style={{ margin: '9px 0 0', lineHeight: 1.6 }}>{body}</p>
        </div>
      ))}
    </div>
  )
}

export default function LoveWork({ result }: { result: Result }) {
  const t = typeByNumber(result.core)
  const d = DEPTH[result.core]
  return (
    <div className="stack" style={{ gap: 28 }}>
      <div>
        <div className="small-caps" style={{ color: 'var(--brass)', marginBottom: 12 }}>♥ In love &amp; relationships</div>
        <Trio
          color={t.color}
          items={[
            ['What you bring', d.love.gives, '#74cf9e'],
            ['Where you struggle', d.love.struggles, '#e0796f'],
            ['What you need', d.love.needs, t.color],
          ]}
        />
      </div>
      <div>
        <div className="small-caps" style={{ color: 'var(--brass)', marginBottom: 12 }}>◆ At work &amp; in the world</div>
        <Trio
          color={t.color}
          items={[
            ['Your strengths', d.work.strengths, '#74cf9e'],
            ['Where you thrive', d.work.environment, t.color],
            ['Watch out for', d.work.pitfall, '#e0796f'],
          ]}
        />
      </div>
    </div>
  )
}
