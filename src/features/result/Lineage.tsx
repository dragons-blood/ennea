import { motion } from 'framer-motion'
import type { Result } from '../../data/types'
import { typeByNumber } from '../../data/enneatypes'
import { EXEMPLARS, type Exemplar } from '../../data/exemplars'

function Group({ label, people, color }: { label: string; people: Exemplar[]; color: string }) {
  return (
    <div className="glass" style={{ padding: 'clamp(1.2rem, 3.5vw, 1.8rem)', borderRadius: 18 }}>
      <div className="small-caps" style={{ color: 'var(--brass)', marginBottom: 14 }}>{label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10 }}>
        {people.map((p) => (
          <div key={p.name} style={{ display: 'flex', gap: 11, alignItems: 'baseline' }}>
            <span aria-hidden style={{ flexShrink: 0, width: 7, height: 7, marginTop: 7, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }} />
            <div>
              <div style={{ color: 'var(--bone)', lineHeight: 1.3 }}>{p.name}</div>
              <div className="whisper" style={{ fontSize: '0.76rem' }}>{p.tag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Lineage({ result }: { result: Result }) {
  const t = typeByNumber(result.core)
  const lin = EXEMPLARS[result.core]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="stack"
      style={{ gap: 14 }}
    >
      <p className="muted" style={{ marginTop: -6, marginBottom: 4 }}>
        Kindred spirits who tend to share your core pattern — Type {result.core}, {t.name.replace(/^The\s+/, 'the ')}.
      </p>
      <Group label="In the world" people={lin.real} color={t.color} />
      <Group label="On the page & screen" people={lin.fictional} color={t.color} />
      <p className="whisper" style={{ fontSize: '0.74rem', margin: '2px 0 0' }}>
        Typings of real people and characters are educated guesses from the Enneagram community, not facts — type lives in
        inner motivation, which no one can read from the outside. Take them as illustrations of the pattern, not verdicts.
      </p>
    </motion.div>
  )
}
