import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import EnneagramSymbol from '../../components/EnneagramSymbol'
import { typeByNumber } from '../../data/enneatypes'
import type { Result } from '../../data/types'
import { buildProfileHtml } from '../../lib/profileHtml'

export default function ExportCard({ result }: { result: Result }) {
  const ref = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)
  const core = typeByNumber(result.core)
  const wingTag = result.wing.id.slice(1) // 'w1'

  async function save() {
    if (!ref.current) return
    setBusy(true)
    try {
      const url = await toPng(ref.current, { pixelRatio: 3, cacheBust: true, backgroundColor: '#0d0e16', skipFonts: true })
      const a = document.createElement('a')
      a.href = url
      a.download = `ennea-type-${result.core}${wingTag}.png`
      a.click()
    } catch (e) {
      console.error('export failed', e)
    } finally {
      setBusy(false)
    }
  }

  function downloadHtml() {
    const blob = new Blob([buildProfileHtml(result)], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ennea-type-${result.core}${wingTag}.html`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div
        ref={ref}
        style={{
          width: 340,
          aspectRatio: '4 / 5',
          borderRadius: 20,
          padding: 3,
          background: `linear-gradient(150deg, ${core.color}, #957a44 60%, ${core.color})`,
          boxShadow: `0 30px 70px -22px ${core.color}`,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 17,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '26px 22px',
            color: '#ece6da',
            background: `radial-gradient(80% 55% at 50% 0%, ${core.color}33, transparent 60%), linear-gradient(#14151f, #0d0e16)`,
          }}
        >
          <div style={{ fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: 11, color: '#c8a86b' }}>Ennea</div>
          <div style={{ marginTop: 10 }}>
            <EnneagramSymbol size={188} result={result} animate={false} />
          </div>
          <div style={{ fontFamily: 'Spectral, serif', fontSize: 40, lineHeight: 1, marginTop: 14, color: '#e7d3a3' }}>
            Type {result.core}
            <span style={{ fontSize: 24, color: core.color }}>{wingTag}</span>
          </div>
          <div style={{ fontFamily: 'Spectral, serif', fontSize: 19, color: '#ece6da', marginTop: 4 }}>
            {core.name} · {result.wing.name}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ width: 54, height: 1, background: 'rgba(200,168,107,0.4)', margin: '0 auto 12px' }} />
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, letterSpacing: '0.06em', color: '#ece6da' }}>
            Tritype {result.tritype.display}
          </div>
          <div style={{ fontFamily: 'Spectral, serif', fontStyle: 'italic', fontSize: 14, color: '#c8a86b', marginTop: 2 }}>
            {result.tritype.archetype.nickname}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn" onClick={save} disabled={busy}>{busy ? 'rendering…' : '⤓ Save as image'}</button>
        <button className="btn" onClick={downloadHtml}>⤓ Download full reading (HTML)</button>
      </div>
      <p className="whisper" style={{ fontSize: '0.72rem', margin: 0, textAlign: 'center', maxWidth: 360 }}>
        The HTML is a self-contained keepsake — save it to your phone or computer and open it any time, even offline.
      </p>
    </div>
  )
}
