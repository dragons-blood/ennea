import type { Facet, Question, TypeNumber } from './types'

// 10 first-person statements per type (90 total). Each type is measured across its WHOLE
// construct, with a balanced facet spread (≈ 2 motivation · 2 behavior · 2 relational ·
// 2 stress · 1 image · 1 fear) and a deliberately varied register — values, situations,
// behaviours, relational tells — rather than one transparent "I am X" label after another.
//
// Two design choices sharpen the read:
//   • { rev: true } — REVERSE-KEYED items (exactly 2 per type). Agreeing means LESS of that
//     type; scored as (6 - answer). They blunt yea-saying and add nuance. Because every type
//     carries the same count, a flat responder still lands near 50% everywhere.
//   • { sig: true } — SIGNATURE items (2 per type): concise, highly discriminating, never
//     reversed. These feed the adaptive forced-choice tiebreaker when top types are close.
// Several items are written to separate look-alikes (1↔6, 2↔9, 3↔7, 4↔5, 8↔3).
type Flags = { sig?: boolean; rev?: boolean }
type Item = [TypeNumber, string, Facet, Flags?]

const ITEMS: Item[] = [
  // ── Type 1 — Reformer ──
  [1, 'I follow my own inner sense of the right way to do things — even when no one would ever know.', 'motivation', { sig: true }], // vs 6: internal standard, not external authority
  [1, 'Improving what is flawed and tidying what is sloppy feels like my personal responsibility.', 'motivation'],
  [1, 'I notice small errors and imperfections that most people glide right past.', 'behavior'],
  [1, "I'm happy to wing it, act on impulse, and leave things 'good enough'.", 'behavior', { rev: true }],
  [1, 'When people are careless or cut corners, I get quietly irritated.', 'relational'],
  [1, 'I swallow what I really feel to stay proper and self-controlled.', 'stress'], // vs 8: anger internalised
  [1, 'I am harder on myself for my own mistakes than anyone else could ever be.', 'stress'],
  [1, 'I think of myself as principled, fair, and disciplined.', 'image'],
  [1, 'Being wrong, bad, or corrupt is one of my deepest fears.', 'fear', { sig: true }],
  [1, "I'm easygoing about other people's mistakes and relaxed about my own standards.", 'relational', { rev: true }],

  // ── Type 2 — Helper ──
  [2, 'I feel most worthwhile when the people I love clearly need me.', 'motivation', { sig: true }],
  [2, 'I move toward people — drawing close, helping, becoming part of their lives.', 'motivation'], // vs 9: actively moves toward
  [2, 'I sense what someone needs almost before they say it, and I act on it.', 'behavior'],
  [2, 'I find it easy to say no and put my own needs first without guilt.', 'behavior', { rev: true }],
  [2, 'I shape myself to be liked by whoever I am with.', 'relational'],
  [2, "I quietly keep track of what I've given, and feel hurt when it isn't returned.", 'relational'],
  [2, 'When I overextend, I grow resentful that no one looks after me.', 'stress'],
  [2, 'I have a hard time naming my own needs, even to myself.', 'stress'],
  [2, "I worry that if I stopped giving, people wouldn't want me around.", 'fear', { sig: true }],
  [2, "Honestly, I'm not especially attentive to other people's feelings.", 'image', { rev: true }],

  // ── Type 3 — Achiever ──
  [3, 'I am driven to win and to be the best at whatever I take on.', 'motivation', { sig: true }],
  [3, 'My sense of worth rises and falls with what I accomplish.', 'motivation'],
  [3, 'I read a room and reshape myself into whoever will succeed in it.', 'behavior'], // vs 7: chameleon for success
  [3, "I don't really tailor how I come across — I'm the same no matter who's watching.", 'behavior', { rev: true }],
  [3, 'Being admired and seen as successful matters a great deal to me.', 'relational'],
  [3, 'When I am not being productive, I feel restless and almost worthless.', 'stress'],
  [3, 'I can lose touch with what I actually feel while chasing a goal.', 'stress'],
  [3, 'People would call me polished, capable, and impressive.', 'image'],
  [3, "Without my achievements, I'm afraid I wouldn't be worth much.", 'fear', { sig: true }],
  [3, "I'd rather be authentic than impressive, even if it costs me status.", 'relational', { rev: true }],

  // ── Type 4 — Individualist ──
  [4, 'I want to be authentically, unmistakably myself — never generic.', 'motivation', { sig: true }],
  [4, 'I am drawn to depth, beauty, and the bittersweet; the shallow leaves me cold.', 'motivation'],
  [4, 'I turn inward and dwell in my feelings to understand who I am.', 'behavior'],
  [4, "I'm fairly even-keeled and rarely swept up in intense emotion.", 'behavior', { rev: true }],
  [4, 'I can feel a pang of envy at what others seem to have or simply be.', 'relational'],
  [4, 'I belong easily and feel like I fit in wherever I go.', 'relational', { rev: true }],
  [4, 'Melancholy and longing feel familiar — almost like home.', 'stress'],
  [4, 'I sometimes amplify a mood and sink into it rather than let it pass.', 'stress'],
  [4, 'For as long as I can remember, I have felt fundamentally different from others.', 'image'],
  [4, 'I fear I am missing something essential that others were simply born with.', 'fear', { sig: true }],

  // ── Type 5 — Investigator ──
  [5, 'I feel safest when I am competent and deeply understand how things work.', 'motivation', { sig: true }],
  [5, "I'd rather step back and understand something than jump in and do it.", 'motivation'], // vs 6/9
  [5, 'I guard my time, energy, and privacy carefully.', 'behavior'],
  [5, 'I dive into new experiences first and figure them out as I go.', 'behavior', { rev: true }],
  [5, "I keep my needs small so I don't have to rely on anyone.", 'relational'],
  [5, "I'm an open book — I share my thoughts and feelings freely.", 'relational', { rev: true }],
  [5, 'When I feel low on energy or knowledge, I withdraw rather than wing it.', 'stress'],
  [5, 'Too many people and demands at once leave me depleted and wanting out.', 'stress'],
  [5, 'I see myself as private, perceptive, and self-sufficient.', 'image'],
  [5, 'I dread being overwhelmed, intruded on, or exposed as not knowing enough.', 'fear', { sig: true }],

  // ── Type 6 — Loyalist ──
  [6, 'I look to something dependable — a person, group, or set of rules — to feel secure.', 'motivation', { sig: true }], // vs 1: external authority
  [6, 'Loyalty and trust, once earned, matter enormously to me.', 'motivation'],
  [6, 'I scan ahead for what could go wrong so I am never caught off guard.', 'behavior'],
  [6, "I rarely think about what could go wrong — I just assume things will work out.", 'behavior', { rev: true }],
  [6, 'I test people and plans before I really trust them.', 'relational'],
  [6, 'I am torn between craving an authority to trust and wanting to rebel against it.', 'relational'],
  [6, 'My mind can spin out into worst-case scenarios.', 'stress'],
  [6, 'When I am anxious, I seek reassurance from people I trust.', 'stress'],
  [6, 'I feel unsafe without something or someone reliable to count on.', 'fear', { sig: true }],
  [6, 'I feel self-assured and steady, and rarely second-guess myself.', 'image', { rev: true }],

  // ── Type 7 — Enthusiast ──
  [7, "I'm always anticipating the next exciting possibility or plan.", 'motivation', { sig: true }],
  [7, 'I want to taste everything life offers and keep my options wide open.', 'motivation'],
  [7, 'My mind leaps quickly from one idea to the next.', 'behavior'],
  [7, "I'm content to keep the same familiar routine for a long time.", 'behavior', { rev: true }],
  [7, 'When a conversation turns heavy, I instinctively lighten it or pivot to something fun.', 'relational'],
  [7, 'I stay busy and upbeat partly to outrun boredom and pain.', 'stress'],
  [7, 'Once the novelty fades, I struggle to follow a thing through to the end.', 'stress'],
  [7, 'People see me as enthusiastic, spontaneous, and fun.', 'image'],
  [7, 'Being trapped in boredom, limitation, or pain is one of my worst fears.', 'fear', { sig: true }],
  [7, "I'm comfortable sitting with hard feelings rather than escaping into distraction.", 'relational', { rev: true }],

  // ── Type 8 — Challenger ──
  [8, 'I go after what I want directly, with force and intensity.', 'motivation', { sig: true }],
  [8, "I can't stand being told what to do or boxed in.", 'motivation'],
  [8, 'I take charge instinctively when no one else will.', 'behavior'],
  [8, 'I tend to hold back and let others take the lead.', 'behavior', { rev: true }],
  [8, "I protect the people under my wing, and I'll confront anyone who threatens them.", 'relational'],
  [8, 'I respect people more when they push back and stand up to me.', 'relational'],
  [8, 'I keep my softer, vulnerable side hidden behind a strong front.', 'stress'],
  [8, 'People experience me as bold, blunt, and hard to intimidate.', 'image'],
  [8, 'Deep down, I fear being harmed or controlled if I ever let my guard down.', 'fear', { sig: true }], // the hidden 8 vulnerability
  [8, "I'd usually rather smooth things over than have a confrontation.", 'stress', { rev: true }],

  // ── Type 9 — Peacemaker ──
  [9, 'Keeping peace and harmony matters more to me than getting my own way.', 'motivation', { sig: true }],
  [9, 'I go along with others to avoid conflict and tension.', 'motivation'],
  [9, 'I can see and honor every side of a situation — sometimes too well to choose one.', 'behavior'],
  [9, 'I readily speak up and push for what I want, even if it stirs friction.', 'behavior', { rev: true }],
  [9, "I blend into the people around me and lose track of my own agenda.", 'relational'], // vs 2: merges/blends
  [9, 'I show disagreement through quiet, passive resistance rather than open conflict.', 'relational'],
  [9, "I numb out — snacks, screens, routine — rather than face what's bothering me.", 'stress'],
  [9, 'I have a calm, steady, easy-to-be-around presence.', 'image'],
  [9, 'I fear that asserting myself will cause disconnection or conflict.', 'fear', { sig: true }],
  [9, 'I stay sharply aware of my own priorities and rarely lose myself in others wishes.', 'stress', { rev: true }],
]

export const QUESTIONS: Question[] = ITEMS.map(([type, text, facet, flags], i) => ({
  id: i,
  type,
  text,
  facet,
  signature: flags?.sig || undefined,
  reverse: flags?.rev || undefined,
}))

export const ITEMS_PER_TYPE = 10

/** The signature items per type (concise, discriminating, never reverse-keyed) — used to build
 * forced-choice tiebreakers when the top types are close. */
export const SIGNATURES: Record<number, Question[]> = QUESTIONS.reduce(
  (acc, q) => {
    if (q.signature) (acc[q.type] ||= []).push(q)
    return acc
  },
  {} as Record<number, Question[]>,
)
