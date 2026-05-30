import { motion } from 'framer-motion'
import { useState } from 'react'
import EnneagramSymbol from '../../components/EnneagramSymbol'
import TypeModal from '../../components/TypeModal'
import { CENTERS, typeByNumber } from '../../data/enneatypes'
import { QUESTIONS } from '../../data/questions'
import type { Result, TypeNumber } from '../../data/types'

interface Props {
  onBegin: () => void
  lastResult: Result | null
  onViewLast: () => void
}

export default function IntroScreen({ onBegin, lastResult, onViewLast }: Props) {
  const [peek, setPeek] = useState<TypeNumber | null>(null)

  return (
    <div className="center-screen" style={{ position: 'relative', zIndex: 2 }}>
      <motion.div
        className="container"
        style={{ maxWidth: 760, textAlign: 'center' }}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="small-caps" style={{ color: 'var(--brass)', marginBottom: 18 }}>◆ The Enneagram ◆</div>
        <h1 className="serif" style={{ fontSize: 'clamp(3.4rem, 12vw, 6.5rem)', letterSpacing: '0.01em', marginBottom: 8 }}>
          <span className="brass-text">Ennea</span>
        </h1>
        <p className="muted" style={{ fontSize: '1.12rem', maxWidth: 520, margin: '0 auto 8px' }}>
          Nine types. Three centers of intelligence. One map of the human heart — and a way to find your place on it,
          down to your <em style={{ color: 'var(--bone)', fontStyle: 'normal' }}>wing</em> and full{' '}
          <em style={{ color: 'var(--bone)', fontStyle: 'normal' }}>tritype</em>.
        </p>

        <div style={{ margin: '14px auto 8px', maxWidth: 380 }}>
          <EnneagramSymbol size={360} onSelect={setPeek} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem,5vw,2.6rem)', flexWrap: 'wrap', margin: '6px auto 26px' }}>
          {CENTERS.map((c) => (
            <div key={c.name} style={{ maxWidth: 180 }}>
              <div className="small-caps" style={{ color: 'var(--brass)', fontSize: '0.62rem' }}>{c.name} · {c.emotion}</div>
              <div className="muted" style={{ fontSize: '0.86rem', marginTop: 4 }}>
                {c.types.map((n) => typeByNumber(n).number).join(' · ')} — {c.also}
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" onClick={onBegin} style={{ fontSize: '1.05rem', padding: '0.9em 2em' }}>
          <span className="brass-text" style={{ fontWeight: 600 }}>Begin the test ✦</span>
        </button>
        <div className="whisper" style={{ fontSize: '0.78rem', marginTop: 12 }}>
          {QUESTIONS.length} statements · about 4 minutes · core type, wing & tritype
        </div>

        {lastResult && (
          <div style={{ marginTop: 22 }}>
            <button className="btn btn-ghost" onClick={onViewLast}>
              view your last result — Type {lastResult.core}
              {lastResult.wing.id.replace(/^\d/, '')} · {lastResult.tritype.display}
            </button>
          </div>
        )}

        <p className="whisper" style={{ fontSize: '0.72rem', marginTop: 24, maxWidth: 460, marginInline: 'auto' }}>
          Tap any point on the symbol to explore that type. The Enneagram is a tool for self-understanding, not a box —
          your core motivations matter more than any single score.
        </p>
      </motion.div>

      <TypeModal type={peek} onClose={() => setPeek(null)} onNavigate={setPeek} />
    </div>
  )
}
