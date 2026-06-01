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

export type Facet = 'motivation' | 'fear' | 'behavior' | 'relational' | 'stress' | 'image'

export interface Question {
  id: number
  type: TypeNumber
  text: string
  facet: Facet
  signature?: boolean // a punchy, discriminating item — used in forced-choice tiebreakers
}

// 1 (strongly disagree) … 5 (strongly agree)
export type Answer = 1 | 2 | 3 | 4 | 5

export interface ForcedChoicePair {
  id: string
  a: { type: TypeNumber; text: string }
  b: { type: TypeNumber; text: string }
}

export interface FcPick {
  pairId: string
  chosen: TypeNumber
}

export type Clarity = 'clear' | 'moderate' | 'close'

export interface TypeScore {
  type: TypeNumber
  raw: number // raw agreement sum (reference only)
  affinity: number // ipsative, within-person-centred score — drives the ranking
  pct: number // 0–100 display, derived from affinity
}

export interface TritypeResult {
  lead: TypeNumber // dominant overall
  order: TypeNumber[] // the three center-leads, by dominance
  set: string // ascending id, e.g. '459'
  display: string // dominance order, e.g. '9-4-5'
  wings: Wing[] // the wing of each member, aligned to `order`
  displayWithWings: string // e.g. '9w1-4w5-5w4'
  archetype: Tritype
}

export interface CenterScore {
  center: Center
  type: TypeNumber
  pct: number
  close: boolean // lead and runner-up in this center are near-tied
}

export interface Result {
  scores: TypeScore[] // all 9, sorted by affinity desc
  core: TypeNumber
  wing: Wing
  wingPct: number
  wingClarity: Clarity
  clarity: Clarity // how clearly the core type stands above the rest
  closeWith: TypeNumber[] // other types near-tied with the core (the "could also be")
  centerScores: CenterScore[]
  tritype: TritypeResult
  usedTiebreaker: boolean
  manual?: boolean // built by hand from a chosen tritype rather than scored from the test
}
