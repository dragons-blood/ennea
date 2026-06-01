import type { Result } from '../data/types'
import { typeByNumber, CENTERS } from '../data/enneatypes'
import { DEPTH } from '../data/depth'
import { LEVELS, type LevelBand } from '../data/levels'
import { CAREERS } from '../data/careers'
import { EXEMPLARS, type Exemplar } from '../data/exemplars'

// Self-contained, offline HTML keepsake of an Enneagram result. System fonts only, no
// external requests, no scripts — safe to save to a phone or computer and open anywhere.

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const chips = (items: string[], color: string) =>
  items.map((k) => `<span class="chip" style="border-color:${color}66;background:${color}1f">${esc(k)}</span>`).join('')

const flawList = (items: string[]) =>
  `<ul>${items.map((i) => `<li><span style="color:#e0796f">▲</span> ${esc(i)}</li>`).join('')}</ul>`

export function buildProfileHtml(result: Result): string {
  const t = typeByNumber(result.core)
  const c = t.color
  const d = DEPTH[result.core]
  const lv = LEVELS[result.core]
  const car = CAREERS[result.core]
  const lin = EXEMPLARS[result.core]
  const g = typeByNumber(t.growthTo)
  const s = typeByNumber(t.stressTo)
  const wingTag = result.wing.id.slice(1) // 'w2'

  const tile = (k: string, v: string) =>
    `<div class="tile"><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div></div>`
  const section = (label: string, title: string, body: string) =>
    `<section><div class="eyebrow">${esc(label)}</div><h2>${esc(title)}</h2>${body}</section>`
  const bar = (pct: number, color: string, label: string, hi: boolean) =>
    `<div class="barrow"><span class="barlabel"${hi ? ' style="color:#ece6da;font-weight:600"' : ''}>${esc(label)}</span><span class="bartrack"><span class="barfill" style="width:${Math.max(3, pct)}%;background:${color}"></span></span><span class="barpct">${pct}%</span></div>`

  const trio = (items: [string, string, string][]) =>
    `<div class="two">${items
      .map(([l, b, col]) => `<div class="card plain"><div class="label" style="color:${col}">${esc(l)}</div><p class="muted">${esc(b)}</p></div>`)
      .join('')}</div>`

  const bandRow = (label: string, color: string, band: LevelBand) =>
    `<div class="card plain" style="border-left:3px solid ${color}"><span class="chip" style="border-color:${color}66;background:${color}1f;color:${color}">${esc(label)}</span><div class="serif" style="font-size:1.1rem;color:#fff;margin:10px 0 0">${esc(band.headline)}</div><p class="muted" style="margin-top:6px">${esc(band.body)}</p><ul style="margin-top:8px">${band.signs.map((s) => `<li><span style="color:${color}">•</span> ${esc(s)}</li>`).join('')}</ul></div>`
  const people = (arr: Exemplar[]) =>
    `<div class="grid">${arr
      .map((p) => `<div class="tile"><div style="font-family:Georgia,serif;font-size:1rem;color:#fff">${esc(p.name)}</div><div class="muted" style="font-size:.78rem;margin-top:2px">${esc(p.tag)}</div></div>`)
      .join('')}</div>`

  return `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Type ${esc(result.core)}${esc(wingTag)} — ${esc(t.name)} · Ennea</title>
<style>
  :root { --c:${c}; }
  * { box-sizing:border-box; }
  body { margin:0; background:#0d0e16; color:#ece6da; line-height:1.65;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    background-image: radial-gradient(70% 50% at 50% -10%, rgba(108,123,209,.16), transparent 60%), radial-gradient(60% 50% at 88% 8%, ${c}1f, transparent 55%); }
  .wrap { max-width:760px; margin:0 auto; padding:48px 22px 80px; }
  h1,h2 { font-family:Georgia,"Times New Roman",serif; font-weight:500; line-height:1.1; }
  .eyebrow { text-transform:uppercase; letter-spacing:.22em; font-size:.66rem; color:#a7a3b8; margin-bottom:6px; }
  .gold { color:#c8a86b; }
  section { margin-top:40px; }
  h2 { font-size:1.55rem; margin:0 0 14px; }
  .hero { text-align:center; padding-bottom:8px; border-bottom:1px solid rgba(200,168,107,.16); }
  .hero .t { font-family:Georgia,serif; font-size:clamp(2.8rem,10vw,4.2rem); color:var(--c); margin:8px 0 0; }
  .hero .sub { font-family:Georgia,serif; font-size:1.3rem; color:#ece6da; }
  .hero .hold { color:#a7a3b8; font-style:italic; font-family:Georgia,serif; margin-top:10px; }
  .badge { display:inline-block; padding:5px 12px; border-radius:999px; font-size:.72rem; text-transform:uppercase; letter-spacing:.16em; margin-top:14px; }
  .card { background:rgba(255,255,255,.04); border:1px solid color-mix(in oklab, var(--c) 32%, transparent); border-radius:16px; padding:20px 22px; }
  .card.plain { border-color:rgba(255,255,255,.07); }
  .two { display:grid; gap:14px; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); }
  .grid { display:grid; gap:14px; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); }
  .tile { background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.06); border-radius:12px; padding:13px 15px; }
  .tile .k { text-transform:uppercase; letter-spacing:.16em; font-size:.56rem; color:#a7a3b8; }
  .tile .v { font-family:Georgia,serif; font-size:1.05rem; color:#fff; margin-top:4px; }
  .label { text-transform:uppercase; letter-spacing:.18em; font-size:.6rem; color:#c8a86b; margin-bottom:8px; }
  .chip { display:inline-block; padding:5px 11px; margin:0 6px 6px 0; border-radius:999px; font-size:.82rem; border:1px solid; }
  ul { list-style:none; padding:0; margin:10px 0 0; }
  li { margin:7px 0; color:#a7a3b8; }
  .serif { font-family:Georgia,serif; } .muted { color:#a7a3b8; } p { margin:8px 0 0; }
  .barrow { display:flex; align-items:center; gap:12px; margin:9px 0; }
  .barlabel { width:150px; flex-shrink:0; color:#a7a3b8; font-size:.9rem; }
  .bartrack { flex:1; height:9px; border-radius:999px; background:rgba(255,255,255,.06); overflow:hidden; }
  .barfill { display:block; height:100%; border-radius:999px; }
  .barpct { width:42px; text-align:right; color:#6b687f; font-size:.8rem; }
  .tt { display:flex; gap:12px; align-items:center; padding:12px 14px; border-radius:12px; background:rgba(255,255,255,.03); margin:8px 0; }
  .dot { width:34px; height:34px; flex-shrink:0; border-radius:50%; display:grid; place-items:center; color:#0d0e16; font-family:Georgia,serif; font-weight:600; }
  footer { margin-top:48px; padding-top:20px; border-top:1px solid rgba(200,168,107,.12); color:#6b687f; font-size:.74rem; }
</style></head>
<body><div class="wrap">

  <div class="hero">
    <div class="eyebrow gold">✦ The Enneagram ✦</div>
    <div class="t">Type ${esc(result.core)}<span style="font-size:.6em">${esc(wingTag)}</span></div>
    <div class="sub">${esc(t.name)} <span class="muted">· ${esc(result.wing.name)}</span></div>
    <div class="hold">${esc(t.hold)}</div>
    <div class="badge" style="border:1px solid ${c}66;color:${c}">${result.manual ? '✎ Built by hand' : `${esc(result.clarity)} fit`}</div>
  </div>

  ${section('The grounded portrait', `${t.name} — ${t.also}`, `<div class="card"><p class="serif" style="font-size:1.12rem">${esc(t.description)}</p></div>`)}

  ${section('Your core knot', 'Why you tick', `<div class="card"><p class="serif" style="font-size:1.1rem">${esc(d.coreKnot)}</p>
    <div class="grid" style="margin-top:16px">${tile('Basic fear', t.basicFear)}${tile('Basic desire', t.basicDesire)}${tile('Core motivation', t.coreMotivation)}${tile('Center', `${t.center} — ${CENTERS.find((x) => x.name === t.center)!.emotion}`)}</div></div>`)}

  ${section('Your shadow & flaws', 'Where you trip', `<div class="card plain" style="border-color:rgba(224,121,111,.35)">${flawList(d.shadow)}</div>`)}

  ${section('Your tritype', `${result.tritype.displayWithWings} · ${result.tritype.archetype.nickname}`, `${result.tritype.order
    .map((n, i) => {
      const tt = typeByNumber(n)
      const w = result.tritype.wings[i]
      return `<div class="tt"><span class="dot" style="background:${tt.color};box-shadow:0 0 16px -4px ${tt.color}">${n}</span><div><div class="label" style="margin:0;color:#c8a86b">${esc(tt.center)} · ${i === 0 ? 'lead' : i === 1 ? 'second' : 'third'}</div><div class="serif" style="font-size:1.1rem;color:#fff">${esc(tt.name)}</div><div style="font-size:.8rem;color:${tt.color}">${esc(w.id)} <span class="muted">· ${esc(w.name)}</span></div></div></div>`
    })
    .join('')}<div class="card" style="margin-top:12px"><p class="muted">${esc(result.tritype.archetype.blurb)}</p></div>`)}

  ${section('The three centers', 'Where your energy lives', `<div class="card plain">${result.centerScores
    .map((cs) => bar(cs.pct, typeByNumber(cs.type).color, `${cs.center} · Type ${cs.type}`, cs.type === result.core))
    .join('')}</div>`)}

  ${section('Your full profile', 'All nine, scored', `<div class="card plain">${result.scores
    .map((sc) => bar(sc.pct, typeByNumber(sc.type).color, `${sc.type} · ${typeByNumber(sc.type).name}`, sc.type === result.core))
    .join('')}</div>`)}

  ${section('In love & relationships', 'How you show up', trio([['What you bring', d.love.gives, '#74cf9e'], ['Where you struggle', d.love.struggles, '#e0796f'], ['What you need', d.love.needs, c]]))}

  ${section('At work & in the world', 'Where you thrive', trio([['Your strengths', d.work.strengths, '#74cf9e'], ['Ideal environment', d.work.environment, c], ['Watch out for', d.work.pitfall, '#e0796f']]))}

  ${section('Your growth path', `Toward Type ${t.growthTo}, ${g.name}`, `<div class="card"><p class="serif" style="font-size:1.1rem">${esc(d.growth)}</p>
    <div class="label" style="margin-top:16px">Practice this</div><ul>${d.practices.map((p) => `<li><span style="color:#74cf9e">→</span> ${esc(p)}</li>`).join('')}</ul>
    <p class="muted" style="margin-top:14px"><b style="color:#e0796f">Under stress</b> you can slip toward Type ${t.stressTo} (${esc(s.name)}) — ${esc(s.atWorst)}</p></div>`)}

  ${section('Levels of development', 'Healthy, average & under strain', `<div style="display:grid;gap:12px">${bandRow('Healthy', '#74cf9e', lv.healthy)}${bandRow('Average', '#c8a86b', lv.average)}${bandRow('Under strain', '#e0796f', lv.unhealthy)}</div><div class="two" style="margin-top:14px"><div class="card plain" style="border-color:rgba(200,168,107,.4)"><div class="label" style="color:#c8a86b">↑ Wake-up call · healthy → average</div><p class="muted">${esc(lv.wakeUpCall)}</p></div><div class="card plain" style="border-color:rgba(224,121,111,.4)"><div class="label" style="color:#e0796f">↓ Red flag · average → under strain</div><p class="muted">${esc(lv.redFlag)}</p></div></div>`)}

  ${section('Callings', 'Where your gifts find work', `<div class="card"><p class="serif" style="font-size:1.1rem">${esc(car.note)}</p><div style="margin-top:14px">${chips(car.paths, c)}</div></div>`)}

  ${section('Lineage', 'Kindred spirits', `<div class="label">In the world</div>${people(lin.real)}<div class="label" style="margin-top:18px">On the page &amp; screen</div>${people(lin.fictional)}<p class="muted" style="font-size:.82rem;margin-top:14px">Typings are educated guesses from the Enneagram community, not facts — illustrations of the pattern, not verdicts.</p>`)}

  <footer>
    ${result.manual
      ? `Built by hand from a chosen tritype, so the score bars are illustrative rather than measured — but the core
         portrait, wing, tritype archetype, centres and growth / stress lines are the full reading for the types picked.`
      : `Scored with within-person centring (ipsative scoring), which removes the bias of generally agreeing or disagreeing,
         plus a forced-choice tiebreaker when types are close. Core type, wing, the lead type in each centre (your tritype),
         and your growth / stress lines are read from those scores.`}
    The Enneagram is a tool for self-understanding, not a box —
    your core motivations matter more than any single score. · Generated by Ennea.
  </footer>

</div></body></html>`
}
