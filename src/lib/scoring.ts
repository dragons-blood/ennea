import { QUESTIONS, ITEMS_PER_TYPE } from '../data/questions'
import { TYPES, typeByNumber } from '../data/enneatypes'
import { tritypeBySet } from '../data/tritypes'
import type { Answer, Center, Result, TypeNumber, TypeScore } from '../data/types'

export const GUT: TypeNumber[] = [8, 9, 1]
export const HEART: TypeNumber[] = [2, 3, 4]
export const HEAD: TypeNumber[] = [5, 6, 7]

const MIN = ITEMS_PER_TYPE * 1 // 8
const SPAN = ITEMS_PER_TYPE * 5 - MIN // 40 - 8 = 32

/** Turn a map of {questionId: 1..5} into a full Enneagram result. */
export function computeResult(answers: Record<number, Answer>): Result {
  const raw: Record<TypeNumber, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
  for (const q of QUESTIONS) raw[q.type] += answers[q.id] ?? 3

  const scores: TypeScore[] = TYPES.map((t) => ({
    type: t.number,
    raw: raw[t.number],
    pct: Math.round(((raw[t.number] - MIN) / SPAN) * 100),
  }))
  const byType = (n: TypeNumber) => scores.find((s) => s.type === n)!
  const sorted = [...scores].sort((a, b) => b.raw - a.raw || a.type - b.type)

  const core = sorted[0].type
  const coreType = typeByNumber(core)
  const [wingA, wingB] = coreType.wings
  const wing = byType(wingA.neighbor).raw >= byType(wingB.neighbor).raw ? wingA : wingB
  const wingPct = byType(wing.neighbor).pct

  const leadOf = (group: TypeNumber[]) =>
    group.map(byType).sort((a, b) => b.raw - a.raw || a.type - b.type)[0]
  const gut = leadOf(GUT)
  const heart = leadOf(HEART)
  const head = leadOf(HEAD)

  const centerScores: { center: Center; type: TypeNumber; pct: number }[] = [
    { center: 'Gut', type: gut.type, pct: gut.pct },
    { center: 'Heart', type: heart.type, pct: heart.pct },
    { center: 'Head', type: head.type, pct: head.pct },
  ]

  const triLeads = [gut, heart, head].sort((a, b) => b.raw - a.raw || a.type - b.type)
  const order = triLeads.map((s) => s.type)

  return {
    scores: sorted,
    core,
    wing,
    wingPct,
    centerScores,
    tritype: {
      lead: order[0],
      order,
      set: [...order].sort((a, b) => a - b).join(''),
      display: order.join('–'),
      archetype: tritypeBySet(order),
    },
  }
}

/** Fisher–Yates shuffle (used to interleave the test items). */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
