import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { CENTERS, typeByNumber } from '../../data/enneatypes'
import { buildManualResult } from '../../lib/scoring'
import type { Result, TypeNumber, Wing } from '../../data/types'

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

function CenterPicks({
  centerName,
  step,
  types,
  value,
  onPick,
}: {
  centerName: string
  step?: string
  types: TypeNumber[]
  value: TypeNumber | null
  onPick: (n: TypeNumber) => void
}) {
  return (
    <div>
      <div className="whisper" style={{ fontSize: '0.64rem', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 7 }}>
        {step ? `${step} · ` : ''}{centerName}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {types.map((n) => (
          <TypePill key={n} n={n} selected={value === n} onClick={() => onPick(n)} />
        ))}
      </div>
    </div>
  )
}

export default function ManualBuilder({ onGenerate }: { onGenerate: (r: Result) => void }) {
  const [open, setOpen] = useState(false)
  const [core, setCore] = useState<TypeNumber | null>(null)
  const [wingId, setWingId] = useState<string | null>(null)
  const [others, setOthers] = useState<Record<string, TypeNumber>>({})

  const coreType = core ? typeByNumber(core) : null
  const otherCenters = useMemo(
    () => (coreType ? CENTERS.filter((c) => c.name !== coreType.center) : []),
    [coreType],
  )
  const wing: Wing | null = (coreType && wingId && coreType.wings.find((w) => w.id === wingId)) || null
  const ready = !!core && !!wing && otherCenters.every((c) => others[c.name] !== undefined)

  function pickCore(n: TypeNumber) {
    if (n === core) return
    setCore(n)
    setWingId(null)
    setOthers({})
  }

  function reveal() {
    if (!core || !wing) return
    const otherTwo = otherCenters.map((c) => others[c.name]).filter((v): v is TypeNumber => v !== undefined)
    if (otherTwo.length !== 2) return
    onGenerate(buildManualResult(core, wing, otherTwo))
  }

  return (
    <div style={{ marginTop: 22, textAlign: 'center' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          font: 'inherit',
          fontSize: '0.82rem',
          letterSpacing: '0.03em',
          color: 'var(--whisper)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span aria-hidden style={{ display: 'inline-block', transition: 'transform .25s', transform: open ? 'rotate(90deg)' : 'none' }}>▸</span>
        Already know your type? Build a tritype by hand
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
                Skip the test and explore any combination — your full reading is built from the types you choose.
              </p>

              {/* 1 · core type */}
              <div className="small-caps" style={{ color: 'var(--brass)', marginBottom: 10 }}>1 · The type you lead with</div>
              <div className="stack" style={{ gap: 12 }}>
                {CENTERS.map((c) => (
                  <CenterPicks key={c.name} centerName={c.name} types={c.types} value={core} onPick={pickCore} />
                ))}
              </div>

              {coreType && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  {/* 2 · wing */}
                  <div className="small-caps" style={{ color: 'var(--brass)', margin: '22px 0 10px' }}>2 · Your wing</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {coreType.wings.map((w) => {
                      const sel = wingId === w.id
                      return (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => setWingId(w.id)}
                          aria-pressed={sel}
                          style={{
                            padding: '0.5em 1em',
                            borderRadius: 999,
                            cursor: 'pointer',
                            font: 'inherit',
                            fontSize: '0.85rem',
                            color: sel ? '#0d0e16' : 'var(--bone)',
                            background: sel ? coreType.color : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${sel ? coreType.color : 'rgba(255,255,255,0.1)'}`,
                            boxShadow: sel ? `0 0 18px -4px ${coreType.color}` : 'none',
                            transition: 'background .2s ease, color .2s ease, border-color .2s ease',
                          }}
                        >
                          <b>{w.id}</b>
                          <span style={{ opacity: 0.8, marginLeft: 6 }}>· {w.name}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* 3 · complete the tritype */}
                  <div className="small-caps" style={{ color: 'var(--brass)', margin: '22px 0 4px' }}>3 · Complete your tritype</div>
                  <p className="whisper" style={{ fontSize: '0.72rem', margin: '0 0 12px' }}>
                    The type you lead with in each of the other two centers.
                  </p>
                  <div className="stack" style={{ gap: 12 }}>
                    {otherCenters.map((c) => (
                      <CenterPicks
                        key={c.name}
                        centerName={c.name}
                        types={c.types}
                        value={others[c.name] ?? null}
                        onPick={(n) => setOthers((o) => ({ ...o, [c.name]: n }))}
                      />
                    ))}
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={reveal}
                    disabled={!ready}
                    style={{ marginTop: 24, width: '100%' }}
                  >
                    <span className="brass-text" style={{ fontWeight: 600 }}>Reveal this tritype ✦</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
