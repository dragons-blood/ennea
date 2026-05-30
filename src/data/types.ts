export type TypeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type Center = 'Gut' | 'Heart' | 'Head'

export interface Wing {
  neighbor: TypeNumber
  id: string // '1w9'
  name: string // 'The Idealist'
  blurb: string
}

export interface EnneaType {
  number: TypeNumber
  name: string // 'The Reformer'
  also: string // 'The Perfectionist'
  center: Center
  color: string // accent hex
  hold: string // one-line essence
  basicFear: string
  basicDesire: string
  coreMotivation: string
  description: string
  atBest: string
  atWorst: string
  keyTraits: string[]
  wings: Wing[] // the two adjacent-type wings
  growthTo: TypeNumber // integration / growth arrow
  stressTo: TypeNumber // disintegration / stress arrow
}

export interface CenterInfo {
  name: Center
  also: string
  emotion: string // anger / shame / fear
  types: TypeNumber[]
  blurb: string
}

export interface Tritype {
  id: string // ascending-sorted set, e.g. '459'
  members: TypeNumber[] // [gut, heart, head] (canonical center order)
  nickname: string
  blurb: string
}

export interface Question {
  id: number
  type: TypeNumber
  text: string
}

// 1 (strongly disagree) … 5 (strongly agree)
export type Answer = 1 | 2 | 3 | 4 | 5

export interface TypeScore {
  type: TypeNumber
  raw: number
  pct: number // 0–100
}

export interface TritypeResult {
  lead: TypeNumber // dominant overall
  order: TypeNumber[] // the three center-leads, by dominance
  set: string // ascending id, e.g. '459'
  display: string // dominance order, e.g. '9-4-5'
  archetype: Tritype
}

export interface Result {
  scores: TypeScore[] // all 9, sorted desc
  core: TypeNumber
  wing: Wing
  wingPct: number
  centerScores: { center: Center; type: TypeNumber; pct: number }[]
  tritype: TritypeResult
}
