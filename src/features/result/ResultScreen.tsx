import { motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import EnneagramSymbol from '../../components/EnneagramSymbol'
import TypeModal from '../../components/TypeModal'
import { CENTERS, TYPES, typeByNumber } from '../../data/enneatypes'
import type { Result, TypeNumber } from '../../data/types'
import ExportCard from './ExportCard'

const GROWTH = '#74cf9e'
const STRESS = '#e0796f'

function Section({ children, label, title }: { children: ReactNode; label?: string; title?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {label && (
        <div style={{ marginBottom: 18 }}>
          <div className="small-caps" style={{ color: 'var(--brass)' }}>{label}</div>
          {title && <h3 className="serif" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', marginTop: 4 }}>{title}</h3>}
        </div>
      )}
      {children}
    </motion.section>
  )
}

function Bar({ pct, color, highlight }: { pct: number; color: string; highlight?: boolean }) {
  return (
    <div style={{ flex: 1, height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.max(3, pct)}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ height: '100%', background: color, borderRadius: 999, boxShadow: highlight ? `0 0 16px -2px ${color}` : undefined }}
      />
    </div>
  )
}

function Badge({ n, size = 40 }: { n: TypeNumber; size?: number }) {
  const t = typeByNumber(n)
  return (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        background: t.color,
        color: '#0d0e16',
        fontFamily: 'Spectral, serif',
        fontSize: size * 0.46,
        fontWeight: 600,
        boxShadow: `0 0 20px -6px ${t.color}`,
      }}
    >
      {n}
    </div>
  )
}

export default function ResultScreen({ result, onRetake, onHome }: { result: Result; onRetake: () => void; onHome: () => void }) {
  const [explore, setExplore] = useState<TypeNumber | null>(null)
  const core = typeByNumber(result.core)
  const wingTag = result.wing.id.slice(1) // 'w1'
  const growth = typeByNumber(core.growthTo)
  const stress = typeByNumber(core.stressTo)

  return (
    <div style={{ position: 'relative', zIndex: 2, ['--accent' as string]: core.color }}>
      <div className="container" style={{ maxWidth: 880, paddingBlock: 'clamp(2.5rem, 7vh, 5rem)' }}>
        <div className="stack" style={{ gap: 'clamp(2.5rem, 7vh, 4.5rem)' }}>
          {/* hero */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ textAlign: 'center' }}>
            <div style={{ maxWidth: 380, margin: '0 auto 6px' }}>
              <EnneagramSymbol size={380} result={result} onSelect={setExplore} />
            </div>
            <div className="small-caps" style={{ color: 'var(--mist)', marginTop: 8 }}>you lead with</div>
            <h1 className="serif" style={{ fontSize: 'clamp(2.8rem, 9vw, 4.6rem)', margin: '4px 0' }}>
              <span className="brass-text">Type {result.core}</span>
              <span className="accent-text" style={{ ['--accent' as string]: core.color }}>{wingTag}</span>
            </h1>
            <div className="serif" style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', color: 'var(--bone)' }}>
              {core.name} <span className="muted">· {result.wing.name}</span>
            </div>
            <p className="muted" style={{ maxWidth: 540, margin: '14px auto 0', fontSize: '1.05rem' }}>{core.hold}</p>
          </motion.div>

          {/* core type */}
          <Section label="Your core type" title={`${core.name} — ${core.also}`}>
            <div className="glass glass-accent" style={{ ['--accent' as string]: core.color, padding: 'clamp(1.5rem, 4vw, 2.4rem)', borderRadius: 'var(--radius)' }}>
              <p className="serif" style={{ fontSize: '1.16rem', lineHeight: 1.75, color: 'var(--mist)' }}>{core.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 20 }}>
                {[['Basic fear', core.basicFear], ['Basic desire', core.basicDesire], ['Core motivation', core.coreMotivation], ['Center', `${core.center} — ${CENTERS.find((c) => c.name === core.center)!.emotion}`]].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span className="small-caps" style={{ fontSize: '0.58rem' }}>{l}</span>
                    <span style={{ color: 'var(--bone)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16, marginTop: 20 }}>
                <div className="glass" style={{ padding: '16px 18px', borderRadius: 14 }}>
                  <div className="small-caps" style={{ color: GROWTH }}>✦ At your best</div>
                  <p className="muted" style={{ margin: '8px 0 0' }}>{core.atBest}</p>
                </div>
                <div className="glass" style={{ padding: '16px 18px', borderRadius: 14 }}>
                  <div className="small-caps" style={{ color: STRESS }}>☾ At your worst</div>
                  <p className="muted" style={{ margin: '8px 0 0' }}>{core.atWorst}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
                {core.keyTraits.map((k) => (
                  <span key={k} className="chip" style={{ textTransform: 'capitalize' }}>{k}</span>
                ))}
              </div>
            </div>
          </Section>

          {/* wing */}
          <Section label="Your wing" title={`${result.core}${wingTag} · ${result.wing.name}`}>
            <div className="glass" style={{ padding: 'clamp(1.4rem, 4vw, 2rem)', borderRadius: 'var(--radius)', display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              <Badge n={result.wing.neighbor} size={52} />
              <div style={{ flex: 1, minWidth: 240 }}>
                <p className="muted" style={{ margin: 0 }}>
                  Your wing is the neighbouring type that most colours your core. Yours leans toward{' '}
                  <strong style={{ color: 'var(--bone)' }}>Type {result.wing.neighbor}</strong> — {result.wing.blurb}
                </p>
              </div>
            </div>
          </Section>

          {/* tritype */}
          <Section label="Your tritype" title={`${result.tritype.display} · ${result.tritype.archetype.nickname}`}>
            <p className="muted" style={{ marginTop: -6, marginBottom: 18 }}>
              Your tritype is the type you lead with in <em>each</em> of the three centers, ordered by dominance — a fuller
              fingerprint than your core type alone.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              {result.tritype.order.map((n, i) => {
                const t = typeByNumber(n)
                return (
                  <button
                    key={n}
                    onClick={() => setExplore(n)}
                    className="glass"
                    style={{ ['--accent' as string]: t.color, textAlign: 'left', cursor: 'pointer', padding: '16px 18px', borderRadius: 16, border: i === 0 ? `1px solid ${t.color}` : undefined, display: 'flex', gap: 14, alignItems: 'center' }}
                  >
                    <Badge n={n} size={44} />
                    <div>
                      <div className="small-caps" style={{ fontSize: '0.56rem', color: 'var(--brass)' }}>{t.center} · {i === 0 ? 'lead' : i === 1 ? 'second' : 'third'}</div>
                      <div className="serif" style={{ fontSize: '1.15rem' }}>{t.name}</div>
                      <div className="whisper" style={{ fontSize: '0.8rem' }}>{t.also}</div>
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="glass glass-accent" style={{ ['--accent' as string]: core.color, padding: '18px 22px', borderRadius: 16, marginTop: 16 }}>
              <div className="small-caps" style={{ color: 'var(--brass)' }}>{result.tritype.archetype.nickname}</div>
              <p className="serif" style={{ color: 'var(--mist)', margin: '8px 0 0', fontSize: '1.1rem', lineHeight: 1.7 }}>{result.tritype.archetype.blurb}</p>
            </div>
          </Section>

          {/* centers */}
          <Section label="The three centers" title="Where your energy lives">
            <div className="stack" style={{ gap: 16 }}>
              {result.centerScores.map((cs) => {
                const t = typeByNumber(cs.type)
                const ci = CENTERS.find((c) => c.name === cs.center)!
                return (
                  <div key={cs.center} style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <div style={{ width: 150, flexShrink: 0 }}>
                      <div className="small-caps" style={{ color: 'var(--brass)', fontSize: '0.62rem' }}>{cs.center} · {ci.emotion}</div>
                      <div style={{ color: 'var(--bone)' }}>Type {cs.type} — {t.name}</div>
                    </div>
                    <Bar pct={cs.pct} color={t.color} highlight={cs.type === result.core} />
                    <span className="whisper" style={{ width: 42, textAlign: 'right' }}>{cs.pct}%</span>
                  </div>
                )
              })}
            </div>
          </Section>

          {/* all nine */}
          <Section label="Your full profile" title="All nine, scored">
            <div className="stack" style={{ gap: 11 }}>
              {result.scores.map((s) => {
                const t = typeByNumber(s.type)
                return (
                  <div key={s.type} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 132, flexShrink: 0, color: s.type === result.core ? 'var(--bone)' : 'var(--mist)', fontSize: '0.9rem', fontWeight: s.type === result.core ? 600 : 400 }}>
                      <span style={{ color: t.color }}>●</span> {s.type} · {t.name}
                    </span>
                    <Bar pct={s.pct} color={t.color} highlight={s.type === result.core} />
                    <span className="whisper" style={{ width: 42, textAlign: 'right' }}>{s.pct}%</span>
                  </div>
                )
              })}
            </div>
          </Section>

          {/* arrows */}
          <Section label="Your lines" title="Growth & stress">
            <p className="muted" style={{ marginTop: -6, marginBottom: 18 }}>
              The lines from your type trace how you change: one direction in growth, the other under stress.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              <div className="glass" style={{ padding: '18px 20px', borderRadius: 16, borderColor: `${GROWTH}55` }}>
                <div className="small-caps" style={{ color: GROWTH }}>→ In growth (integration)</div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
                  <Badge n={core.growthTo} size={42} />
                  <div>
                    <div className="serif" style={{ fontSize: '1.1rem' }}>Type {core.growthTo} — {growth.name}</div>
                    <div className="whisper" style={{ fontSize: '0.82rem' }}>you take on its healthy gifts</div>
                  </div>
                </div>
                <p className="muted" style={{ margin: '12px 0 0', fontSize: '0.92rem' }}>{growth.atBest}</p>
              </div>
              <div className="glass" style={{ padding: '18px 20px', borderRadius: 16, borderColor: `${STRESS}55` }}>
                <div className="small-caps" style={{ color: STRESS }}>→ Under stress (disintegration)</div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
                  <Badge n={core.stressTo} size={42} />
                  <div>
                    <div className="serif" style={{ fontSize: '1.1rem' }}>Type {core.stressTo} — {stress.name}</div>
                    <div className="whisper" style={{ fontSize: '0.82rem' }}>you can slip into its struggles</div>
                  </div>
                </div>
                <p className="muted" style={{ margin: '12px 0 0', fontSize: '0.92rem' }}>{stress.atWorst}</p>
              </div>
            </div>
          </Section>

          {/* keep your type */}
          <Section label="Keep your type" title="A card to carry">
            <ExportCard result={result} />
          </Section>

          {/* explore */}
          <Section label="Wander" title="Explore all nine types">
            <p className="muted" style={{ marginTop: -6, marginBottom: 16 }}>Tap any type — here or on the symbol above — to read its story.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {TYPES.map((t) => (
                <button key={t.number} onClick={() => setExplore(t.number)} className="chip" style={{ ['--accent' as string]: t.color, cursor: 'pointer', fontWeight: t.number === result.core ? 600 : 400 }}>
                  <span style={{ color: t.color }}>{t.number}</span> {t.name}
                </button>
              ))}
            </div>
          </Section>

          {/* footer */}
          <Section>
            <div className="glass" style={{ padding: '22px 24px', borderRadius: 16 }}>
              <p className="whisper" style={{ fontSize: '0.78rem', margin: 0 }}>
                This test scores all nine types from your responses, then reads your core type, wing, the lead type in each
                center (your tritype), and your growth/stress lines. It's a strong starting point — the Enneagram is
                ultimately about your core <em>motivations</em>, so read the descriptions and confirm what rings true. For
                reflection and growth, not a verdict.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 26, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={onRetake}><span className="brass-text">✦ Retake the test</span></button>
              <button className="btn btn-ghost" onClick={onHome}>home</button>
            </div>
          </Section>
        </div>
      </div>

      <TypeModal type={explore} onClose={() => setExplore(null)} onNavigate={setExplore} />
    </div>
  )
}
