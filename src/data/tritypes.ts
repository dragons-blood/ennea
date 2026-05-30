import type { Tritype, TypeNumber } from './types'

// The 27 tritype archetypes — one type from each center {1,8,9} × {2,3,4} × {5,6,7}.
// `members` is in canonical center order [gut, heart, head]; `id` is the ascending set.
// Nicknames follow the tritype model popularized by Katherine Fauvre.
const RAW: [TypeNumber[], string, string][] = [
  [[1, 2, 5], 'The Mentor', 'Principled, caring, and perceptive — a wise teacher who betters the world through knowledge and service, holding high standards with a thoughtful, generous heart.'],
  [[1, 2, 6], 'The Supporter', 'Conscientious, warm, and loyal — a devoted helper who shows up dependably, blending duty, care, and steadfast commitment.'],
  [[1, 2, 7], 'The Teacher', 'Idealistic, giving, and upbeat — an inspiring guide who uplifts others with optimism, warmth, and a vision of how good things could be.'],
  [[1, 3, 5], 'The Technical Expert', 'Precise, driven, and analytical — a master of competence who pursues excellence and gets things exactly right.'],
  [[1, 3, 6], 'The Taskmaster', 'Organized, ambitious, and responsible — a results-driven builder who creates reliable systems and holds everyone to the standard.'],
  [[1, 3, 7], 'The Systems Builder', 'Principled, productive, and visionary — an energetic improver who turns big ideas into well-run, high-performing realities.'],
  [[1, 4, 5], 'The Researcher', 'Principled, deep, and investigative — a meticulous seeker of truth and meaning who blends ideals, depth, and rigorous understanding.'],
  [[1, 4, 6], 'The Philosopher', 'Idealistic, sensitive, and questioning — a truth-seeker wrestling with meaning, conscience, and the way things ought to be.'],
  [[1, 4, 7], 'The Visionary', 'Idealistic, expressive, and imaginative — an inspired dreamer who sees how beautiful and good the world could become.'],
  [[8, 2, 5], 'The Strategist', 'Powerful, caring, and shrewd — a protective force who reads situations astutely and acts decisively on behalf of others.'],
  [[8, 2, 6], 'The Rescuer', 'Strong, warm, and loyal — a fierce protector who stands up and shows up for the people and causes they love.'],
  [[8, 2, 7], 'The Free Spirit', 'Bold, generous, and spontaneous — a big-hearted, high-energy force who champions others while chasing life fully.'],
  [[8, 3, 5], 'The Solution Master', 'Driven, competent, and commanding — a formidable problem-solver who gets results and makes things happen.'],
  [[8, 3, 6], 'The Justice Fighter', 'Assertive, capable, and committed — a determined champion who fights for fairness and protects what matters.'],
  [[8, 3, 7], 'The Mover & Shaker', 'Powerful, ambitious, and energetic — a charismatic doer who drives bold initiatives and rallies others to act.'],
  [[8, 4, 5], 'The Scholar', 'Intense, deep, and intellectual — a profound, self-directed thinker who pursues truth with unusual independence and depth.'],
  [[8, 4, 6], 'The Truth Teller', 'Honest, sensitive, and fierce — a courageous voice who names hard truths and defends authenticity and justice.'],
  [[8, 4, 7], 'The Messenger', 'Expressive, intense, and bold — a passionate communicator who pursues meaning and freedom with unflinching honesty.'],
  [[9, 2, 5], 'The Problem Solver', 'Calm, caring, and perceptive — a gentle helper who quietly understands people and finds peaceful, thoughtful solutions.'],
  [[9, 2, 6], 'The Good Samaritan', 'Warm, steady, and loyal — a kind, dependable presence who supports others and harmonizes everyone around them.'],
  [[9, 2, 7], 'The Peacemaker', 'Easygoing, generous, and optimistic — a warm, upbeat soul who spreads comfort, kindness, and gentle joy.'],
  [[9, 3, 5], 'The Thinker', 'Composed, capable, and reflective — a quietly accomplished mind who pursues goals with calm, thoughtful focus.'],
  [[9, 3, 6], 'The Mediator', 'Adaptable, reassuring, and committed — a natural diplomat who keeps the peace and brings people into agreement.'],
  [[9, 3, 7], 'The Ambassador', 'Friendly, capable, and upbeat — a charming, easygoing achiever who connects people and keeps the mood bright.'],
  [[9, 4, 5], 'The Contemplative', 'Deep, sensitive, and withdrawn — an introspective soul who turns inward to seek meaning, beauty, and quiet understanding.'],
  [[9, 4, 6], 'The Seeker', 'Searching, sensitive, and loyal — a soulful questioner who longs for meaning, truth, and a place to belong.'],
  [[9, 4, 7], 'The Gentle Spirit', 'Imaginative, sensitive, and easygoing — a dreamy, gentle soul who blends depth and longing with lightness and hope.'],
]

export const TRITYPES: Tritype[] = RAW.map(([members, nickname, blurb]) => ({
  id: [...members].sort((a, b) => a - b).join(''),
  members,
  nickname,
  blurb,
}))

export function tritypeBySet(typesInAnyOrder: TypeNumber[]): Tritype {
  const id = [...typesInAnyOrder].sort((a, b) => a - b).join('')
  return TRITYPES.find((t) => t.id === id) ?? TRITYPES[0]
}
