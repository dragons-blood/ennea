import { ITEMS_PER_TYPE, QUESTIONS, SIGNATURES } from '../data/questions'
import { TYPES, typeByNumber } from '../data/enneatypes'
import { tritypeBySet } from '../data/tritypes'
import type {
  Answer,
  Center,
  CenterScore,
  Clarity,
  FcPick,
  ForcedChoicePair,
  Result,
  TypeNumber,
  TypeScore,
  Wing,
} from '../data/types'

export const GUT: TypeNumber[] = [8, 9, 1]
export const HEART: TypeNumber[] = [2, 3, 4]
export const HEAD: TypeNumber[] = [5, 6, 7]

// Tunables (in affinity / z units)
const FC_BONUS = 0.3 // each forced-choice win nudges a type this much
const CONTENDER_GAP = 0.4 // types within this of the top become tiebreaker contenders
const CLOSE_GAP = 0.3 // types within this of the core are flagged "could also be"
const CENTER_CLOSE_GAP = 0.22

type Aff = Record<TypeNumber, number>
const emptyAff = (): Aff => ({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 })

function rawSums(answers: Record<number, Answer>): Aff {
  const raw = emptyAff()
  for (const q of QUESTIONS) raw[q.type] += answers[q.id] ?? 3
  return raw
}

/**
 * Ipsative (within-person centred) type affinities. Each response is z-scored against the
 * respondent's own mean and spread, so chronic agreeing/disagreeing cancels out and what
 * remains is the *relative* dominance of each type — exactly what type & tritype should
 * measure. Optional forced-choice picks nudge their winners.
 */
export function affinities(answers: Record<number, Answer>, picks: FcPick[] = []): Aff {
  const resp = QUESTIONS.map((q) => answers[q.id] ?? 3)
  const mean = resp.reduce((a, b) => a + b, 0) / resp.length
  const variance = resp.reduce((a, b) => a + (b - mean) ** 2, 0) / resp.length
  const sd = Math.sqrt(variance) || 1
  const aff = emptyAff()
  for (const q of QUESTIONS) aff[q.type] += ((answers[q.id] ?? 3) - mean) / sd
  for (const t of [1, 2, 3, 4, 5, 6, 7, 8, 9] as TypeNumber[]) aff[t] /= ITEMS_PER_TYPE
  for (const p of picks) aff[p.chosen] += FC_BONUS
  return aff
}

const clampPct = (aff: number) => Math.max(2, Math.min(99, Math.round(50 + aff * 24)))
const clarityFromGap = (gap: number): Clarity => (gap >= 0.6 ? 'clear' : gap >= 0.3 ? 'moderate' : 'close')
const wingClarityFromGap = (gap: number): Clarity => (gap >= 0.5 ? 'clear' : gap >= 0.25 ? 'moderate' : 'close')

const ALL: TypeNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

/** The wing of a type = its higher-scoring adjacent type. */
function wingOf(n: TypeNumber, A: (t: TypeNumber) => number): Wing {
  const [a, b] = typeByNumber(n).wings
  return A(a.neighbor) >= A(b.neighbor) ? a : b
}

/** The close top types that warrant a forced-choice round (2–4), or [] if the lead is clear. */
export function contenders(answers: Record<number, Answer>): TypeNumber[] {
  const aff = affinities(answers)
  const sorted = [...ALL].sort((a, b) => aff[b] - aff[a])
  const top = aff[sorted[0]]
  const cont = sorted.filter((t) => top - aff[t] <= CONTENDER_GAP).slice(0, 4)
  return cont.length >= 2 ? cont : []
}

/** Build "which is more you?" head-to-heads among the close contenders. */
export function buildTiebreakers(cont: TypeNumber[]): ForcedChoicePair[] {
  const pairs: ForcedChoicePair[] = []
  const passes = cont.length === 2 ? 2 : 1
  for (let pass = 0; pass < passes; pass++) {
    for (let i = 0; i < cont.length; i++) {
      for (let j = i + 1; j < cont.length; j++) {
        const ta = cont[i]
        const tb = cont[j]
        const sa = SIGNATURES[ta][pass % SIGNATURES[ta].length]
        const sb = SIGNATURES[tb][pass % SIGNATURES[tb].length]
        // randomise which side each type appears on, to blunt position bias
        const flip = Math.random() < 0.5
        pairs.push({
          id: `fc-${ta}-${tb}-${pass}`,
          a: flip ? { type: tb, text: sb.text } : { type: ta, text: sa.text },
          b: flip ? { type: ta, text: sa.text } : { type: tb, text: sb.text },
        })
      }
    }
  }
  return shuffle(pairs).slice(0, 8)
}

export function computeResult(answers: Record<number, Answer>, picks: FcPick[] = []): Result {
  const raw = rawSums(answers)
  const aff = affinities(answers, picks)
  const A = (n: TypeNumber) => aff[n]

  const scores: TypeScore[] = TYPES.map((t) => ({
    type: t.number,
    raw: raw[t.number],
    affinity: aff[t.number],
    pct: clampPct(aff[t.number]),
  }))
  const sorted = [...scores].sort((a, b) => b.affinity - a.affinity || a.type - b.type)

  const core = sorted[0].type
  const coreType = typeByNumber(core)
  const byType = (n: TypeNumber) => scores.find((s) => s.type === n)!

  const [wingA, wingB] = coreType.wings
  const wing = A(wingA.neighbor) >= A(wingB.neighbor) ? wingA : wingB
  const wingPct = byType(wing.neighbor).pct
  const wingClarity = wingClarityFromGap(Math.abs(A(wingA.neighbor) - A(wingB.neighbor)))

  const leadOf = (group: TypeNumber[]) => [...group].sort((a, b) => A(b) - A(a) || a - b)
  const centerScores: CenterScore[] = ([['Gut', GUT], ['Heart', HEART], ['Head', HEAD]] as [Center, TypeNumber[]][]).map(
    ([center, group]) => {
      const ranked = leadOf(group)
      return { center, type: ranked[0], pct: byType(ranked[0]).pct, close: A(ranked[0]) - A(ranked[1]) < CENTER_CLOSE_GAP }
    },
  )

  const triLeads = [centerScores[0].type, centerScores[1].type, centerScores[2].type].sort((a, b) => A(b) - A(a) || a - b)
  const triWings = triLeads.map((n) => wingOf(n, A))

  const clarity = clarityFromGap(sorted[0].affinity - sorted[1].affinity)
  const closeWith = sorted.slice(1).filter((s) => sorted[0].affinity - s.affinity <= CLOSE_GAP).map((s) => s.type)

  return {
    scores: sorted,
    core,
    wing,
    wingPct,
    wingClarity,
    clarity,
    closeWith,
    centerScores,
    tritype: {
      lead: triLeads[0],
      order: triLeads,
      set: [...triLeads].sort((a, b) => a - b).join(''),
      display: triLeads.join('–'),
      wings: triWings,
      displayWithWings: triWings.map((w) => w.id).join('–'),
      archetype: tritypeBySet(triLeads),
    },
    usedTiebreaker: picks.length > 0,
  }
}

/** Fisher–Yates shuffle (used to interleave items and tiebreakers). */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
