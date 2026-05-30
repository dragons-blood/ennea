import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { QUESTIONS } from '../../data/questions'
import { shuffle } from '../../lib/scoring'
import type { Answer } from '../../data/types'

const OPTS: { v: Answer; size: number; label: string; color: string }[] = [
  { v: 1, size: 48, label: 'Strongly disagree', color: '#cf7d74' },
  { v: 2, size: 38, label: 'Disagree', color: '#bd8a83' },
  { v: 3, size: 30, label: 'Neutral', color: '#8b889b' },
  { v: 4, size: 38, label: 'Agree', color: '#9fae84' },
  { v: 5, size: 48, label: 'Strongly agree', color: '#c4ab66' },
]

interface Props {
  onComplete: (answers: Record<number, Answer>) => void
  onExit: () => void
}

export default function TestScreen({ onComplete, onExit }: Props) {
  const order = useMemo(() => shuffle(QUESTIONS), [])
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const total = order.length
  const q = order[idx]

  function choose(v: Answer) {
    const next = { ...answers, [q.id]: v }
    setAnswers(next)
    if (idx + 1 >= total) {
      onComplete(next)
    } else {
      setTimeout(() => setIdx((i) => Math.min(i + 1, total - 1)), 170)
    }
  }
  function back() {
    setIdx((i) => Math.max(0, i - 1))
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '5') choose(Number(e.key) as Answer)
      else if (e.key === 'ArrowLeft') back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const progress = idx / total

  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* top bar */}
      <div className="container" style={{ paddingTop: 22, maxWidth: 760 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <button className="btn btn-ghost" style={{ padding: '0.5em 1em', fontSize: '0.85rem' }} onClick={onExit}>← exit</button>
          <span className="small-caps">{idx + 1} <span className="whisper">of {total}</span></span>
          <button className="btn btn-ghost" style={{ padding: '0.5em 1em', fontSize: '0.85rem', visibility: idx > 0 ? 'visible' : 'hidden' }} onClick={back}>back</button>
        </div>
        <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${progress * 100}%` }}
            transition={{ ease: [0.22, 0.61, 0.36, 1], duration: 0.4 }}
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--brass-deep), var(--brass-lite))', borderRadius: 999 }}
          />
        </div>
      </div>

      {/* question */}
      <div className="container" style={{ maxWidth: 720, flex: 1, display: 'grid', placeItems: 'center', paddingBlock: 'clamp(1.5rem, 5vh, 3rem)' }}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <div className="small-caps" style={{ color: 'var(--brass)', marginBottom: 22 }}>How true is this of you?</div>
          <div style={{ minHeight: 150, display: 'grid', placeItems: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={q.id}
                className="serif"
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
                style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.3rem)', lineHeight: 1.3, maxWidth: 640, margin: '0 auto' }}
              >
                {q.text}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* likert */}
          <div style={{ marginTop: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(10px, 4vw, 26px)' }}>
              {OPTS.map((o) => {
                const selected = answers[q.id] === o.v
                return (
                  <motion.button
                    key={o.v}
                    aria-label={o.label}
                    title={o.label}
                    onClick={() => choose(o.v)}
                    whileHover={{ scale: 1.14 }}
                    whileTap={{ scale: 0.92 }}
                    style={{
                      width: o.size,
                      height: o.size,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: `2px solid ${o.color}`,
                      background: selected ? o.color : `${o.color}1f`,
                      boxShadow: selected ? `0 0 22px -4px ${o.color}` : 'none',
                      transition: 'background 0.2s, box-shadow 0.2s',
                    }}
                  />
                )
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 360, margin: '14px auto 0' }}>
              <span className="whisper" style={{ fontSize: '0.74rem' }}>Disagree</span>
              <span className="whisper" style={{ fontSize: '0.74rem' }}>Agree</span>
            </div>
            <div className="whisper" style={{ fontSize: '0.7rem', marginTop: 18 }}>tip: press 1–5 on your keyboard</div>
          </div>
        </div>
      </div>
    </div>
  )
}
