import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CENTERS, typeByNumber } from '../../data/enneatypes'
import { buildManualResult, type ManualMember } from '../../lib/scoring'
import type { Center, Result, TypeNumber } from '../../data/types'

const shortName = (n: TypeNumber) => typeByNumber(n).name.replace(/^The\s+/, '')

/** A selectable type pill — filled with the type's jewel hue when chosen. */
function TypePill({ n, selected, onClick }: { n: TypeNumber; selected: boolean; onClick: () => void }) {
  const t = typeByNumber(n)
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '0.42em 0.85em 0.42em 0.42em',
        borderRadius: 999,
        cursor: 'pointer',
        font: 'inherit',
        fontSize: '0.85rem',
        color: selected ? '#0d0e16' : 'var(--bone)',
        background: selected ? t.color : 'rgba(255,255,255,0.03)',
        border: `1px solid ${selected ? t.color : 'rgba(255,255,255,0.1)'}`,
        boxShadow: selected ? `0 0 18px -4px ${t.color}` : 'none',
        transition: 'background .2s ease, color .2s ease, border-color .2s ease, box-shadow .2s ease',
      }}
    >
      <span
        aria-hidden
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'Spectral, Georgia, serif',
          fontWeight: 700,
          fontSize: '0.8rem',
          color: '#0d0e16',
          background: selected ? 'rgba(13,14,22,0.22)' : t.color,
        }}
      >
        {n}
      </span>
      <span style={{ fontWeight: selected ? 600 : 400 }}>{shortName(n)}</span>
    </button>
  )
}

/** The two wing options for a given type (e.g. 4w3 / 4w5), tinted with that type's hue. */
function WingPills({ type, value, onPick }: { type: TypeNumber; value: string | null; onPick: (id: string) => void }) {
  const t = typeByNumber(type)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {t.wings.map((w) => {
        const sel = value === w.id
        return (
          <button
            key={w.id}
            type="button"
            onClick={() => onPick(w.id)}
            aria-pressed={sel}
            style={{
              padding: '0.44em 0.95em',
              borderRadius: 999,
              cursor: 'pointer',
              font: 'inherit',
              fontSize: '0.82rem',
              color: sel ? '#0d0e16' : 'var(--bone)',
              background: sel ? t.color : 'rgba(255,255,255,0.03)',
              border: `1px solid ${sel ? t.color : 'rgba(255,255,255,0.1)'}`,
              boxShadow: sel ? `0 0 18px -4px ${t.color}` : 'none',
              transition: 'background .2s ease, color .2s ease, border-color .2s ease',
            }}
          >
            <b>{w.id}</b>
            <span style={{ opacity: 0.78, marginLeft: 6 }}>· {w.name}</span>
          </button>
        )
      })}
    </div>
  )
}

function CenterPicks({
  centerName,
  types,
  value,
  onPick,
}: {
  centerName: string
  types: TypeNumber[]
  value: TypeNumber | null
  onPick: (n: TypeNumber) => void
}) {
  return (
    <div>
      <div className="whisper" style={{ fontSize: '0.64rem', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 7 }}>
        {centerName}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {types.map((n) => (
          <TypePill key={n} n={n} selected={value === n} onClick={() => onPick(n)} />
        ))}
      </div>
    </div>
  )
}

interface SlotPick {
  type: TypeNumber
  center: Center
  wingId: string | null
}

const SLOT_META = [
  { label: 'Your lead type', sub: 'the type you most identify with — your core' },
  { label: 'Your second type', sub: 'your next most dominant center' },
  { label: 'Your third type', sub: 'your remaining center' },
]

export default function ManualBuilder({ onGenerate }: { onGenerate: (r: Result) => void }) {
  const [open, setOpen] = useState(false)
  const [slots, setSlots] = useState<SlotPick[]>([])

  // centres still available for slot i = those not already used by an earlier slot
  const availableCenters = (i: number) => {
    const usedBefore = slots.slice(0, i).map((s) => s.center)
    return CENTERS.filter((c) => !usedBefore.includes(c.name))
  }

  function pickType(i: number, type: TypeNumber) {
    const center = typeByNumber(type).center
    setSlots((prev) => {
      if (prev[i]?.type === type) return prev
      const next = prev.slice(0, i)
      next[i] = { type, center, wingId: null }
      // keep later slots only if this slot's centre is unchanged (their exclusions still hold)
      if (prev[i] && prev[i].center === center) for (let j = i + 1; j < prev.length; j++) next[j] = prev[j]
      return next
    })
  }

  function pickWing(i: number, wingId: string) {
    setSlots((prev) => {
      const next = [...prev]
      next[i] = { ...next[i], wingId }
      return next
    })
  }

  const ready = slots.length === 3 && slots.every((s) => s.wingId)

  function reveal() {
    if (!ready) return
    const members: ManualMember[] = slots.map((s) => ({
      type: s.type,
      wing: typeByNumber(s.type).wings.find((w) => w.id === s.wingId)!,
    }))
    onGenerate(buildManualResult(members))
  }

  const preview = slots.map((s) => (s.wingId ? `${s.type}${s.wingId.slice(1)}` : `${s.type}`)).join(' – ')

  return (
    <div style={{ marginTop: 24, textAlign: 'center' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          font: 'inherit',
          fontSize: '0.92rem',
          fontWeight: 500,
          letterSpacing: '0.01em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          textDecoration: 'underline',
          textDecorationColor: 'rgba(200,168,107,0.4)',
          textUnderlineOffset: 5,
        }}
      >
        <span aria-hidden style={{ display: 'inline-block', color: 'var(--brass)', transition: 'transform .25s', transform: open ? 'rotate(90deg)' : 'none' }}>▸</span>
        <span className="brass-text" style={{ fontWeight: 600 }}>Already know your type?</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="builder"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="glass" style={{ marginTop: 14, padding: 'clamp(16px, 4vw, 22px)', borderRadius: 16, textAlign: 'left' }}>
              <p className="whisper" style={{ fontSize: '0.78rem', margin: '0 0 18px' }}>
                Skip the test and explore any combination — build your tritype in your own order of dominance, with a wing
                on each.
              </p>

              {[0, 1, 2].map((i) => {
                const visible = i === 0 || (slots[i - 1] && slots[i - 1].wingId)
                if (!visible) return null
                const cur = slots[i]
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ marginTop: i === 0 ? 0 : 22 }}>
                    <div className="small-caps" style={{ color: 'var(--brass)', marginBottom: 3 }}>{i + 1} · {SLOT_META[i].label}</div>
                    <p className="whisper" style={{ fontSize: '0.72rem', margin: '0 0 10px' }}>{SLOT_META[i].sub}</p>
                    <div className="stack" style={{ gap: 12 }}>
                      {availableCenters(i).map((c) => (
                        <CenterPicks
                          key={c.name}
                          centerName={c.name}
                          types={c.types}
                          value={cur && cur.center === c.name ? cur.type : null}
                          onPick={(n) => pickType(i, n)}
                        />
                      ))}
                    </div>
                    {cur && (
                      <div style={{ paddingLeft: 2, marginTop: 8 }}>
                        <div className="whisper" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 6 }}>↳ its wing</div>
                        <WingPills type={cur.type} value={cur.wingId} onPick={(id) => pickWing(i, id)} />
                      </div>
                    )}
                  </motion.div>
                )
              })}

              {preview && (
                <div className="whisper" style={{ fontSize: '0.8rem', marginTop: 20, letterSpacing: '0.04em' }}>
                  Your tritype: <span style={{ color: 'var(--brass)' }}>{preview}</span>
                </div>
              )}
              <button className="btn btn-primary" onClick={reveal} disabled={!ready} style={{ marginTop: preview ? 12 : 24, width: '100%' }}>
                <span className="brass-text" style={{ fontWeight: 600 }}>Reveal this tritype ✦</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
