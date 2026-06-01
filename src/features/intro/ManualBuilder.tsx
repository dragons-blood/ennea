import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { CENTERS, typeByNumber } from '../../data/enneatypes'
import { buildManualResult, type ManualMember } from '../../lib/scoring'
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

/** The two wing options for a given type, e.g. 4w3 / 4w5 — tinted with that type's hue. */
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

const wingLabel = { fontSize: '0.6rem', textTransform: 'uppercase' as const, letterSpacing: '0.16em', margin: '8px 0 6px' }

interface MemberPick {
  type: TypeNumber
  wingId: string | null
}

export default function ManualBuilder({ onGenerate }: { onGenerate: (r: Result) => void }) {
  const [open, setOpen] = useState(false)
  const [core, setCore] = useState<TypeNumber | null>(null)
  const [coreWingId, setCoreWingId] = useState<string | null>(null)
  const [others, setOthers] = useState<Record<string, MemberPick>>({})

  const coreType = core ? typeByNumber(core) : null
  const otherCenters = useMemo(
    () => (coreType ? CENTERS.filter((c) => c.name !== coreType.center) : []),
    [coreType],
  )
  const coreWing: Wing | null = (coreType && coreWingId && coreType.wings.find((w) => w.id === coreWingId)) || null
  const ready =
    !!core && !!coreWing && otherCenters.every((c) => others[c.name] && others[c.name].wingId)

  function pickCore(n: TypeNumber) {
    if (n === core) return
    setCore(n)
    setCoreWingId(null)
    setOthers({})
  }

  function reveal() {
    if (!core || !coreWing) return
    const members: ManualMember[] = []
    for (const c of otherCenters) {
      const o = others[c.name]
      const wing = o && typeByNumber(o.type).wings.find((w) => w.id === o.wingId)
      if (!wing) return
      members.push({ type: o.type, wing })
    }
    onGenerate(buildManualResult(core, coreWing, members))
  }

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
        <span style={{ color: 'var(--mist)' }}>Already know your type?</span>
        <span className="brass-text" style={{ fontWeight: 600 }}>Build a tritype by hand</span>
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
                Skip the test and explore any combination — your full reading is built from the types and wings you choose.
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
                  {/* 2 · core wing */}
                  <div className="small-caps" style={{ color: 'var(--brass)', margin: '22px 0 10px' }}>2 · Your wing</div>
                  <WingPills type={coreType.number} value={coreWingId} onPick={setCoreWingId} />

                  {/* 3 · the other two centers, each with its own wing */}
                  <div className="small-caps" style={{ color: 'var(--brass)', margin: '22px 0 4px' }}>3 · Complete your tritype</div>
                  <p className="whisper" style={{ fontSize: '0.72rem', margin: '0 0 12px' }}>
                    The type you lead with in each of the other two centers — and its wing.
                  </p>
                  <div className="stack" style={{ gap: 16 }}>
                    {otherCenters.map((c) => {
                      const o = others[c.name]
                      return (
                        <div key={c.name}>
                          <CenterPicks
                            centerName={c.name}
                            types={c.types}
                            value={o?.type ?? null}
                            onPick={(n) => setOthers((prev) => ({ ...prev, [c.name]: { type: n, wingId: null } }))}
                          />
                          {o && (
                            <div style={{ paddingLeft: 2 }}>
                              <div className="whisper" style={wingLabel}>↳ its wing</div>
                              <WingPills
                                type={o.type}
                                value={o.wingId}
                                onPick={(id) => setOthers((prev) => ({ ...prev, [c.name]: { ...prev[c.name], wingId: id } }))}
                              />
                            </div>
                          )}
                        </div>
                      )
                    })}
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
