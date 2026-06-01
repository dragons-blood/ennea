import { motion } from 'framer-motion'
import type { TypeNumber } from '../../data/types'
import { LEVELS } from '../../data/levels'

const BANDS = [
  { key: 'healthy', label: 'Healthy', sub: 'free', color: '#74cf9e' },
  { key: 'average', label: 'Average', sub: 'the everyday self', color: '#c8a86b' },
  { key: 'unhealthy', label: 'Under strain', sub: 'gripped', color: '#e0796f' },
] as const

export default function Levels({ type }: { type: TypeNumber }) {
  const lv = LEVELS[type]
  return (
    <div className="stack" style={{ gap: 14 }}>
      <p className="muted" style={{ marginTop: -6, marginBottom: 4 }}>
        The same type can show up liberated or imprisoned. These are the three bands you move through — where you sit
        shifts with stress, growth, and self-awareness.
      </p>
      {BANDS.map((b, i) => {
        const band = lv[b.key]
        return (
          <motion.div
            key={b.key}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
            className="glass"
            style={{ padding: 'clamp(1.1rem, 3vw, 1.6rem)', borderRadius: 16, borderLeft: `3px solid ${b.color}` }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <span
                className="small-caps"
                style={{ color: b.color, fontSize: '0.62rem', border: `1px solid ${b.color}55`, padding: '3px 10px', borderRadius: 999, background: `${b.color}14` }}
              >
                {b.label}
              </span>
              <span className="serif" style={{ fontSize: '1.12rem', color: 'var(--bone)' }}>{band.headline}</span>
              <span className="whisper" style={{ fontSize: '0.72rem' }}>· {b.sub}</span>
            </div>
            <p className="muted" style={{ margin: '10px 0 0', lineHeight: 1.65 }}>{band.body}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '6px 16px' }}>
              {band.signs.map((s) => (
                <li key={s} style={{ display: 'flex', gap: 9, alignItems: 'baseline', color: 'var(--mist)', fontSize: '0.9rem' }}>
                  <span aria-hidden style={{ flexShrink: 0, color: b.color, fontSize: 9 }}>●</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )
      })}

      {/* the two thresholds worth catching */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12, marginTop: 2 }}>
        <div className="glass" style={{ padding: '16px 18px', borderRadius: 16, borderColor: 'rgba(200,168,107,0.4)' }}>
          <div className="small-caps" style={{ color: '#c8a86b' }}>↑ Wake-up call</div>
          <div className="whisper" style={{ fontSize: '0.66rem', marginTop: 2 }}>healthy → average</div>
          <p className="muted" style={{ margin: '10px 0 0', lineHeight: 1.6 }}>{lv.wakeUpCall}</p>
        </div>
        <div className="glass" style={{ padding: '16px 18px', borderRadius: 16, borderColor: 'rgba(224,121,111,0.4)' }}>
          <div className="small-caps" style={{ color: '#e0796f' }}>↓ Red flag</div>
          <div className="whisper" style={{ fontSize: '0.66rem', marginTop: 2 }}>average → under strain</div>
          <p className="muted" style={{ margin: '10px 0 0', lineHeight: 1.6 }}>{lv.redFlag}</p>
        </div>
      </div>
    </div>
  )
}
