import { motion } from 'framer-motion'
import { useState } from 'react'
import EnneagramSymbol from '../../components/EnneagramSymbol'
import TypeModal from '../../components/TypeModal'
import ManualBuilder from './ManualBuilder'
import { CENTERS, typeByNumber } from '../../data/enneatypes'
import { QUESTIONS } from '../../data/questions'
import type { HistoryEntry } from '../../lib/history'
import type { Result, TypeNumber } from '../../data/types'

interface Props {
  onBegin: () => void
  onManual: (result: Result) => void
  onExplore: () => void
  history: HistoryEntry[]
  onOpen: (entry: HistoryEntry) => void
  onDelete: (id: string) => void
}

const fmtDate = (ms: number) => {
  try {
    return new Date(ms).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

export default function IntroScreen({ onBegin, onManual, onExplore, history, onOpen, onDelete }: Props) {
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

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={onBegin} style={{ fontSize: '1.05rem', padding: '0.9em 2em' }}>
            <span className="brass-text" style={{ fontWeight: 600 }}>Begin the test ✦</span>
          </button>
          <button className="btn btn-ghost" onClick={() => onExplore()} style={{ fontSize: '0.95rem', padding: '0.8em 1.4em' }}>
            Explore the nine types →
          </button>
        </div>
        <div className="whisper" style={{ fontSize: '0.78rem', marginTop: 12 }}>
          {QUESTIONS.length} statements · about 4–5 minutes · core type, wing & tritype
        </div>

        {history.length > 0 && (
          <div className="glass" style={{ marginTop: 26, padding: '16px 18px', borderRadius: 16, textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <div className="small-caps" style={{ color: 'var(--brass)' }}>Your saved results</div>
              <span className="whisper" style={{ fontSize: '0.68rem' }}>saved in this browser</span>
            </div>
            <div className="stack" style={{ gap: 8 }}>
              {history.map((e) => (
                <div
                  key={e.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <button
                    onClick={() => onOpen(e)}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'inherit', padding: 0, font: 'inherit' }}
                  >
                    <span aria-hidden style={{ width: 12, height: 12, borderRadius: '50%', background: e.color, flexShrink: 0, boxShadow: `0 0 10px ${e.color}` }} />
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span className="serif" style={{ fontSize: '1.05rem', color: 'var(--bone)' }}>Type {e.wingId}</span>
                      <span className="whisper" style={{ marginLeft: 10, fontSize: '0.8rem' }}>{e.tritype} · {e.archetype}</span>
                    </span>
                    <span className="whisper" style={{ fontSize: '0.72rem', flexShrink: 0 }}>{fmtDate(e.savedAt)}</span>
                  </button>
                  <button
                    onClick={() => onDelete(e.id)}
                    aria-label="Delete saved result"
                    title="Delete"
                    className="whisper"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1, padding: '2px 6px', flexShrink: 0 }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <ManualBuilder onGenerate={onManual} />

        <p className="whisper" style={{ fontSize: '0.72rem', marginTop: 24, maxWidth: 460, marginInline: 'auto' }}>
          Tap any point on the symbol to explore that type. The Enneagram is a tool for self-understanding, not a box —
          your core motivations matter more than any single score.
        </p>
      </motion.div>

      <TypeModal type={peek} onClose={() => setPeek(null)} onNavigate={setPeek} />
    </div>
  )
}
