import { motion } from 'framer-motion'
import { typeByNumber } from '../../data/enneatypes'
import { WING_DETAIL } from '../../data/wings'
import type { Result } from '../../data/types'

// Tailored to the EXACT tritype-with-wings, not just the set. Shows each of the three members
// with its specific wing's leaning, then contrasts the lead against its sibling-wing variant so
// the reader sees what makes their particular blend distinct from another of the same archetype.
export default function TritypeVariant({ result }: { result: Result }) {
  const tt = result.tritype
  const core = typeByNumber(result.core)
  const roleOf = (i: number) => (i === 0 ? 'lead' : i === 1 ? 'second' : 'third')

  const leadType = typeByNumber(tt.order[0])
  const leadWing = tt.wings[0]
  const leadDet = WING_DETAIL[leadWing.id]
  const sibling = leadType.wings.find((w) => w.id !== leadWing.id)
  const sibDet = sibling ? WING_DETAIL[sibling.id] : undefined
  const arche = tt.archetype.nickname.replace(/^The\s+/, '') // "The Contemplative" → "Contemplative"

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }} className="stack" style={{ gap: 14 }}>
      <p className="muted" style={{ marginTop: -6, marginBottom: 4 }}>
        Every <strong style={{ color: 'var(--bone)' }}>{arche}</strong> shares the same three centers — Types{' '}
        {tt.order.join(', ')}. What makes <em>yours</em> specific is the wing on each, and the order they stack.
      </p>

      <div className="stack" style={{ gap: 12 }}>
        {tt.order.map((n, i) => {
          const t = typeByNumber(n)
          const w = tt.wings[i]
          const det = WING_DETAIL[w.id]
          return (
            <div key={n} className="glass" style={{ ['--accent' as string]: t.color, padding: '15px 18px', borderRadius: 16, display: 'flex', gap: 14, alignItems: 'center', borderColor: i === 0 ? t.color : undefined }}>
              <div style={{ width: 42, height: 42, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', background: t.color, color: '#0d0e16', fontFamily: 'Spectral, serif', fontSize: 19, fontWeight: 600, boxShadow: `0 0 16px -5px ${t.color}` }}>{n}</div>
              <div>
                <div className="small-caps" style={{ fontSize: '0.56rem', color: 'var(--brass)' }}>{t.center} · {roleOf(i)}</div>
                <div className="serif" style={{ fontSize: '1.08rem' }}>{w.id} <span className="muted">· {w.name}</span></div>
                <div style={{ fontSize: '0.9rem', color: 'var(--mist)', marginTop: 3 }}>{det ? det.lean : t.also}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="glass glass-accent" style={{ ['--accent' as string]: core.color, padding: '18px 22px', borderRadius: 16 }}>
        <div className="small-caps" style={{ color: 'var(--brass)' }}>What makes your variant distinct</div>
        <p className="serif" style={{ color: 'var(--mist)', margin: '10px 0 0', fontSize: '1.08rem', lineHeight: 1.7 }}>
          {sibling && sibDet && leadDet ? (
            <>
              Another {arche} who led with <strong style={{ color: 'var(--bone)' }}>{leadType.number}{sibling.id.slice(1)}</strong> would run {sibDet.lean}.
              You lead with <strong style={{ color: leadType.color }}>{leadWing.id}</strong> — {leadDet.lean} — then carry a{' '}
              <strong style={{ color: typeByNumber(tt.order[1]).color }}>{tt.wings[1].id}</strong> ({WING_DETAIL[tt.wings[1].id]?.lean}) and a{' '}
              <strong style={{ color: typeByNumber(tt.order[2]).color }}>{tt.wings[2].id}</strong> ({WING_DETAIL[tt.wings[2].id]?.lean}). That exact three-wing stack is the fingerprint within your fingerprint.
            </>
          ) : (
            <>Your three members each carry their own wing, stacking into a blend that no other tritype shares.</>
          )}
        </p>
      </div>
    </motion.div>
  )
}
