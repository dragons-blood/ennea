import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { TYPES, typeByNumber } from '../data/enneatypes'
import type { TypeNumber } from '../data/types'

interface Props {
  type: TypeNumber | null
  onClose: () => void
  onNavigate: (n: TypeNumber) => void
}

export default function TypeModal({ type, onClose, onNavigate }: Props) {
  useEffect(() => {
    if (type == null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(((type % 9) + 1) as TypeNumber)
      if (e.key === 'ArrowLeft') onNavigate((((type - 2 + 9) % 9) + 1) as TypeNumber)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [type, onClose, onNavigate])

  const t = type ? typeByNumber(type) : null

  return (
    <AnimatePresence>
      {t && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'grid',
            placeItems: 'center',
            padding: 'clamp(1rem, 4vw, 2rem)',
            background: 'rgba(6, 6, 12, 0.74)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            key={t.number}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass glass-accent"
            style={{ ['--accent' as string]: t.color, width: 'min(560px, 100%)', maxHeight: '86vh', overflowY: 'auto', padding: 'clamp(1.5rem, 4vw, 2.4rem)', borderRadius: 'var(--radius)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  flexShrink: 0,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  background: t.color,
                  color: '#0d0e16',
                  fontFamily: 'Spectral, serif',
                  fontSize: 26,
                  fontWeight: 600,
                  boxShadow: `0 0 26px -4px ${t.color}`,
                }}
              >
                {t.number}
              </div>
              <div>
                <div className="small-caps" style={{ color: 'var(--brass)' }}>{t.center} center · type {t.number}</div>
                <h3 className="serif" style={{ fontSize: 'clamp(1.7rem, 5vw, 2.4rem)', margin: '2px 0 0' }}>{t.name}</h3>
                <div className="muted" style={{ fontStyle: 'italic' }}>{t.also}</div>
              </div>
            </div>

            <p className="serif" style={{ fontSize: '1.1rem', color: 'var(--mist)', marginTop: 16, lineHeight: 1.7 }}>{t.description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12, marginTop: 18 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span className="small-caps" style={{ fontSize: '0.58rem' }}>Basic fear</span>
                <span style={{ color: 'var(--bone)' }}>{t.basicFear}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span className="small-caps" style={{ fontSize: '0.58rem' }}>Basic desire</span>
                <span style={{ color: 'var(--bone)' }}>{t.basicDesire}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 18 }}>
              {t.keyTraits.map((k) => (
                <span key={k} className="chip" style={{ textTransform: 'capitalize' }}>{k}</span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, gap: 12 }}>
              <button className="btn btn-ghost" onClick={() => onNavigate((((t.number - 2 + 9) % 9) + 1) as TypeNumber)}>← prev</button>
              <button className="btn btn-ghost" onClick={onClose}>close</button>
              <button className="btn btn-ghost" onClick={() => onNavigate(((t.number % 9) + 1) as TypeNumber)}>next →</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
