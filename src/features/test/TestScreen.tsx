import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { QUESTIONS } from '../../data/questions'
import { typeByNumber } from '../../data/enneatypes'
import { buildTiebreakers, contenders, shuffle } from '../../lib/scoring'
import type { Answer, FcPick, ForcedChoicePair } from '../../data/types'

const OPTS: { v: Answer; size: number; label: string; color: string }[] = [
  { v: 1, size: 48, label: 'Strongly disagree', color: '#cf7d74' },
  { v: 2, size: 38, label: 'Disagree', color: '#bd8a83' },
  { v: 3, size: 30, label: 'Neutral', color: '#8b889b' },
  { v: 4, size: 38, label: 'Agree', color: '#9fae84' },
  { v: 5, size: 48, label: 'Strongly agree', color: '#c4ab66' },
]

interface Props {
  onComplete: (answers: Record<number, Answer>, picks: FcPick[]) => void
  onExit: () => void
}

export default function TestScreen({ onComplete, onExit }: Props) {
  const order = useMemo(() => shuffle(QUESTIONS), [])
  const total = order.length
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})

  const [phase, setPhase] = useState<'primer' | 'likert' | 'fc'>('primer')
  const [fcPairs, setFcPairs] = useState<ForcedChoicePair[]>([])
  const [fcIdx, setFcIdx] = useState(0)
  const [picks, setPicks] = useState<FcPick[]>([])

  const q = order[idx]

  function choose(v: Answer) {
    const next = { ...answers, [q.id]: v }
    setAnswers(next)
    if (idx + 1 >= total) {
      // end of Likert — decide whether a tiebreaker round is warranted
      const cont = contenders(next)
      if (cont.length >= 2) {
        setFcPairs(buildTiebreakers(cont))
        setFcIdx(0)
        setPhase('fc')
      } else {
        onComplete(next, [])
      }
    } else {
      setTimeout(() => setIdx((i) => Math.min(i + 1, total - 1)), 160)
    }
  }
  function back() {
    setIdx((i) => Math.max(0, i - 1))
  }

  function pickFc(chosen: number) {
    const pair = fcPairs[fcIdx]
    const next = [...picks, { pairId: pair.id, chosen: chosen as FcPick['chosen'] }]
    setPicks(next)
    if (fcIdx + 1 >= fcPairs.length) {
      onComplete(answers, next)
    } else {
      setTimeout(() => setFcIdx((i) => i + 1), 140)
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase === 'primer') {
        if (e.key === 'Enter') setPhase('likert')
        return
      }
      if (phase !== 'likert') return
      if (e.key >= '1' && e.key <= '5') choose(Number(e.key) as Answer)
      else if (e.key === 'ArrowLeft') back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // ── Primer / guidance phase ──
  if (phase === 'primer') {
    const TIPS: { glyph: string; title: string; body: string }[] = [
      {
        glyph: '↻',
        title: 'Think across your whole life',
        body: 'Answer from the patterns you’ve shown for years — not just how you feel today, this week, or this month.',
      },
      {
        glyph: '◎',
        title: 'Answer as you are, not as you wish',
        body: 'Respond from who you actually are — not who you’d like to be, or who others expect. Honesty, especially where it stings a little, reads truest.',
      },
      {
        glyph: '↯',
        title: 'Trust your first instinct',
        body: 'Your gut reaction is usually the most accurate. Read each statement once and go — don’t overthink it.',
      },
      {
        glyph: '✦',
        title: 'It’s about why, not what',
        body: 'Two people can act the same way for opposite reasons. Answer from the motivation underneath the behaviour.',
      },
    ]
    return (
      <div style={{ position: 'relative', zIndex: 2, minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <div className="container" style={{ paddingTop: 22, maxWidth: 760 }}>
          <button className="btn btn-ghost" style={{ padding: '0.5em 1em', fontSize: '0.85rem' }} onClick={onExit}>← back</button>
        </div>
        <div className="container" style={{ maxWidth: 680, flex: 1, display: 'grid', placeItems: 'center', paddingBlock: 'clamp(1.5rem, 5vh, 3rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <div className="small-caps" style={{ color: 'var(--brass)', marginBottom: 10 }}>◆ Before you begin ◆</div>
            <h2 className="serif" style={{ fontSize: 'clamp(1.9rem, 5.5vw, 2.8rem)', lineHeight: 1.18, marginBottom: 16 }}>
              <span className="brass-text">Read yourself clearly</span>
            </h2>
            <p className="muted" style={{ fontSize: '1.05rem', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              The Enneagram maps nine ways of seeing the world — each shaped by a core motivation, fear, and desire. These{' '}
              {total} statements read your <em style={{ color: 'var(--bone)', fontStyle: 'normal' }}>core type</em>, its{' '}
              <em style={{ color: 'var(--bone)', fontStyle: 'normal' }}>wing</em>, and your full{' '}
              <em style={{ color: 'var(--bone)', fontStyle: 'normal' }}>tritype</em>. A few things make the result far more accurate:
            </p>

            <div className="glass" style={{ textAlign: 'left', padding: 'clamp(16px, 4vw, 24px)', borderRadius: 18, margin: '22px 0' }}>
              <div className="stack" style={{ gap: 18 }}>
                {TIPS.map((tip) => (
                  <div key={tip.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span
                      aria-hidden
                      style={{
                        flexShrink: 0,
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--brass)',
                        fontSize: '1.05rem',
                        border: '1px solid rgba(200,168,107,0.35)',
                        background: 'rgba(200,168,107,0.08)',
                      }}
                    >
                      {tip.glyph}
                    </span>
                    <div>
                      <div className="serif" style={{ fontSize: '1.1rem', color: 'var(--bone)' }}>{tip.title}</div>
                      <p className="muted" style={{ margin: '3px 0 0', fontSize: '0.93rem', lineHeight: 1.6 }}>{tip.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="whisper" style={{ fontSize: '0.84rem', margin: '0 auto 22px', maxWidth: 520 }}>
              There are no better or worse types — only different. This is for reflection and growth, not a verdict.
            </p>

            <button className="btn btn-primary" onClick={() => setPhase('likert')} style={{ fontSize: '1.05rem', padding: '0.9em 2.2em' }}>
              <span className="brass-text" style={{ fontWeight: 600 }}>Begin ✦</span>
            </button>
            <div className="whisper" style={{ fontSize: '0.76rem', marginTop: 12 }}>{total} statements · about 4–5 minutes · go with your gut</div>
          </motion.div>
        </div>
      </div>
    )
  }

  // ── Forced-choice tiebreaker phase ──
  if (phase === 'fc') {
    const pair = fcPairs[fcIdx]
    if (!pair) return null
    return (
      <div style={{ position: 'relative', zIndex: 2, minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <div className="container" style={{ paddingTop: 22, maxWidth: 760 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <button className="btn btn-ghost" style={{ padding: '0.5em 1em', fontSize: '0.85rem' }} onClick={onExit}>← exit</button>
            <span className="small-caps" style={{ color: 'var(--brass)' }}>tiebreaker · {fcIdx + 1} of {fcPairs.length}</span>
            <span style={{ width: 64 }} />
          </div>
          <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${(fcIdx / fcPairs.length) * 100}%` }} transition={{ duration: 0.4 }} style={{ height: '100%', background: 'linear-gradient(90deg, var(--brass-deep), var(--brass-lite))', borderRadius: 999 }} />
          </div>
        </div>
        <div className="container" style={{ maxWidth: 720, flex: 1, display: 'grid', placeItems: 'center', paddingBlock: 'clamp(1.5rem, 5vh, 3rem)' }}>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <div className="small-caps" style={{ color: 'var(--brass)', marginBottom: 8 }}>Your top types are close</div>
            <h2 className="serif" style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', marginBottom: 30 }}>Which is <em>more</em> true of you?</h2>
            <motion.div
              key={pair.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
            >
              {(['a', 'b'] as const).map((side) => {
                const o = pair[side]
                const t = typeByNumber(o.type)
                return (
                  <motion.button
                    key={side}
                    onClick={() => pickFc(o.type)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    className="glass"
                    style={{ ['--accent' as string]: t.color, cursor: 'pointer', textAlign: 'left', padding: 'clamp(1.2rem, 4vw, 1.8rem)', borderRadius: 16, flex: '1 1 280px', display: 'flex', gap: 14, alignItems: 'center' }}
                  >
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: t.color, flexShrink: 0, boxShadow: `0 0 14px ${t.color}` }} />
                    <span className="serif" style={{ fontSize: '1.15rem', lineHeight: 1.4 }}>{o.text}</span>
                  </motion.button>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // ── Likert phase ──
  const progress = idx / total
  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div className="container" style={{ paddingTop: 22, maxWidth: 760 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <button className="btn btn-ghost" style={{ padding: '0.5em 1em', fontSize: '0.85rem' }} onClick={onExit}>← exit</button>
          <span className="small-caps">{idx + 1} <span className="whisper">of {total}</span></span>
          <button className="btn btn-ghost" style={{ padding: '0.5em 1em', fontSize: '0.85rem', visibility: idx > 0 ? 'visible' : 'hidden' }} onClick={back}>back</button>
        </div>
        <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
          <motion.div animate={{ width: `${progress * 100}%` }} transition={{ ease: [0.22, 0.61, 0.36, 1], duration: 0.4 }} style={{ height: '100%', background: 'linear-gradient(90deg, var(--brass-deep), var(--brass-lite))', borderRadius: 999 }} />
        </div>
      </div>

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
                    style={{ width: o.size, height: o.size, borderRadius: '50%', cursor: 'pointer', border: `2px solid ${o.color}`, background: selected ? o.color : `${o.color}1f`, boxShadow: selected ? `0 0 22px -4px ${o.color}` : 'none', transition: 'background 0.2s, box-shadow 0.2s' }}
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
