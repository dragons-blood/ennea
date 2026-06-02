import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { TYPES, typeByNumber, CENTERS } from '../../data/enneatypes'
import { DEPTH } from '../../data/depth'
import type { TypeNumber } from '../../data/types'
import Shadow from '../result/Shadow'
import LoveWork from '../result/LoveWork'
import GrowthPath from '../result/GrowthPath'
import Levels from '../result/Levels'
import Callings from '../result/Callings'
import Lineage from '../result/Lineage'
import WingCard from '../result/WingCard'

const GROWTH = '#74cf9e'
const STRESS = '#e0796f'

function Block({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <section style={{ marginTop: 'clamp(2rem, 5vh, 3rem)' }}>
      <div className="small-caps" style={{ color: 'var(--brass)' }}>{label}</div>
      <h3 className="serif" style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', margin: '4px 0 16px' }}>{title}</h3>
      {children}
    </section>
  )
}

function Badge({ n, size = 42 }: { n: TypeNumber; size?: number }) {
  const t = typeByNumber(n)
  return (
    <div style={{ width: size, height: size, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', background: t.color, color: '#0d0e16', fontFamily: 'Spectral, serif', fontSize: size * 0.46, fontWeight: 600, boxShadow: `0 0 20px -6px ${t.color}` }}>
      {n}
    </div>
  )
}

export default function LibraryScreen({ initial = 1, onHome }: { initial?: TypeNumber; onHome: () => void }) {
  const [sel, setSel] = useState<TypeNumber>(initial)
  const t = typeByNumber(sel)
  const center = CENTERS.find((c) => c.name === t.center)!
  const growth = typeByNumber(t.growthTo)
  const stress = typeByNumber(t.stressTo)
  const prev = (((sel - 2 + 9) % 9) + 1) as TypeNumber
  const next = ((sel % 9) + 1) as TypeNumber

  function go(n: TypeNumber) {
    setSel(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative', zIndex: 2, ['--accent' as string]: t.color }}>
      <div className="container" style={{ maxWidth: 900, paddingBlock: 'clamp(1.5rem, 5vh, 3rem)' }}>
        {/* top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <button className="btn btn-ghost" style={{ padding: '0.5em 1em', fontSize: '0.85rem' }} onClick={onHome}>← home</button>
          <div className="small-caps" style={{ color: 'var(--brass)' }}>The Nine Types</div>
          <span style={{ width: 64 }} />
        </div>

        {/* number tabs */}
        <div style={{ display: 'flex', gap: 'clamp(6px, 2vw, 12px)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {TYPES.map((tt) => {
            const on = tt.number === sel
            return (
              <button
                key={tt.number}
                onClick={() => go(tt.number)}
                aria-label={`Type ${tt.number} — ${tt.name}`}
                aria-pressed={on}
                style={{
                  width: on ? 48 : 42,
                  height: on ? 48 : 42,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  flexShrink: 0,
                  fontFamily: 'Spectral, serif',
                  fontSize: on ? 21 : 17,
                  fontWeight: 600,
                  color: on ? '#0d0e16' : tt.color,
                  background: on ? tt.color : 'rgba(255,255,255,0.03)',
                  border: `1.5px solid ${on ? tt.color : 'rgba(255,255,255,0.12)'}`,
                  boxShadow: on ? `0 0 22px -4px ${tt.color}` : 'none',
                  transition: 'all .25s ease',
                }}
              >
                {tt.number}
              </button>
            )
          })}
        </div>
        <div className="whisper" style={{ textAlign: 'center', fontSize: '0.72rem', marginTop: 10 }}>tap a number to explore that type</div>

        <AnimatePresence mode="wait">
          <motion.div key={sel} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}>
            {/* header */}
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginTop: 30, flexWrap: 'wrap' }}>
              <Badge n={sel} size={64} />
              <div>
                <div className="small-caps" style={{ color: 'var(--brass)' }}>{t.center} center · type {sel}</div>
                <h2 className="serif" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', margin: '2px 0' }}>
                  <span className="accent-text" style={{ ['--accent' as string]: t.color }}>{t.name}</span>
                </h2>
                <div className="muted" style={{ fontStyle: 'italic' }}>{t.also}</div>
              </div>
            </div>
            <p className="serif" style={{ fontSize: 'clamp(1.15rem, 3vw, 1.4rem)', color: 'var(--bone)', marginTop: 16, lineHeight: 1.5 }}>{t.hold}</p>

            {/* portrait */}
            <Block label="The portrait" title="Who they are">
              <div className="glass glass-accent" style={{ ['--accent' as string]: t.color, padding: 'clamp(1.4rem, 4vw, 2.2rem)', borderRadius: 'var(--radius)' }}>
                <p className="serif" style={{ fontSize: '1.14rem', lineHeight: 1.75, color: 'var(--mist)', marginTop: 0 }}>{t.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 18 }}>
                  {[['Basic fear', t.basicFear], ['Basic desire', t.basicDesire], ['Core motivation', t.coreMotivation], ['Center', `${t.center} — ${center.emotion}`]].map(([l, v]) => (
                    <div key={l}>
                      <div className="small-caps" style={{ fontSize: '0.58rem' }}>{l}</div>
                      <div style={{ color: 'var(--bone)', marginTop: 3 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14, marginTop: 18 }}>
                  <div className="glass" style={{ padding: '14px 16px', borderRadius: 14 }}>
                    <div className="small-caps" style={{ color: GROWTH }}>✦ At their best</div>
                    <p className="muted" style={{ margin: '7px 0 0' }}>{t.atBest}</p>
                  </div>
                  <div className="glass" style={{ padding: '14px 16px', borderRadius: 14 }}>
                    <div className="small-caps" style={{ color: STRESS }}>☾ At their worst</div>
                    <p className="muted" style={{ margin: '7px 0 0' }}>{t.atWorst}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 18 }}>
                  {t.keyTraits.map((k) => (
                    <span key={k} className="chip" style={{ textTransform: 'capitalize' }}>{k}</span>
                  ))}
                </div>
              </div>
            </Block>

            <Block label="The core knot" title="Why they tick — and where they trip">
              <Shadow type={sel} />
            </Block>

            <Block label="The wings" title="The two flavours">
              <div className="stack" style={{ gap: 14 }}>
                {t.wings.map((w) => (
                  <WingCard key={w.id} core={sel} wing={w} />
                ))}
              </div>
            </Block>

            <Block label="The lines" title="Growth & stress">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                <div className="glass" style={{ padding: '18px 20px', borderRadius: 16, borderColor: `${GROWTH}55` }}>
                  <div className="small-caps" style={{ color: GROWTH }}>→ In growth</div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
                    <Badge n={t.growthTo} size={38} />
                    <div className="serif" style={{ fontSize: '1.05rem' }}>Type {t.growthTo} — {growth.name}</div>
                  </div>
                  <p className="muted" style={{ margin: '12px 0 0', fontSize: '0.92rem' }}>{growth.atBest}</p>
                </div>
                <div className="glass" style={{ padding: '18px 20px', borderRadius: 16, borderColor: `${STRESS}55` }}>
                  <div className="small-caps" style={{ color: STRESS }}>→ Under stress</div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
                    <Badge n={t.stressTo} size={38} />
                    <div className="serif" style={{ fontSize: '1.05rem' }}>Type {t.stressTo} — {stress.name}</div>
                  </div>
                  <p className="muted" style={{ margin: '12px 0 0', fontSize: '0.92rem' }}>{stress.atWorst}</p>
                </div>
              </div>
            </Block>

            <Block label="Levels of development" title="Healthy, average & under strain">
              <Levels type={sel} />
            </Block>

            <Block label="In love & at work" title="How they show up">
              <LoveWork type={sel} />
            </Block>

            <Block label="Callings" title="Where their gifts find work">
              <Callings type={sel} />
            </Block>

            <Block label="The way up" title="Growth & practice">
              <GrowthPath type={sel} />
            </Block>

            <Block label="Lineage" title="Kindred spirits">
              <Lineage type={sel} />
            </Block>
          </motion.div>
        </AnimatePresence>

        {/* prev / next */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 44, gap: 12 }}>
          <button className="btn btn-ghost" onClick={() => go(prev)}>← Type {prev}</button>
          <button className="btn btn-primary" onClick={onHome}><span className="brass-text">home</span></button>
          <button className="btn btn-ghost" onClick={() => go(next)}>Type {next} →</button>
        </div>
      </div>
    </div>
  )
}
