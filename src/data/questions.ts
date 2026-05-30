import type { Facet, Question, TypeNumber } from './types'

// 10 first-person statements per type (90 total), balanced across facets so each type
// is measured across its whole construct — its motivation, core fear, behavior, relational
// style, stress pattern, and self-image — not just surface traits. Rated 1 (strongly
// disagree) to 5 (strongly agree). Two `signature` items per type (concise + highly
// discriminating) feed the forced-choice tiebreaker.
type Item = [TypeNumber, string, Facet, boolean?]

const ITEMS: Item[] = [
  // ── Type 1 — Reformer ──
  [1, 'I have a strong inner critic that notices what is wrong or could be improved.', 'behavior'],
  [1, 'It matters to me to do things the right way, even when no one is watching.', 'motivation', true],
  [1, 'I feel a personal obligation to fix mistakes and improve things around me.', 'motivation'],
  [1, 'I hold myself to high standards and feel guilty when I fall short.', 'image'],
  [1, 'I have clear convictions about what is right and what is wrong.', 'motivation'],
  [1, 'Disorder, sloppiness, and carelessness genuinely bother me.', 'behavior'],
  [1, 'I work hard to control my impulses and act with self-discipline.', 'behavior'],
  [1, "I get frustrated when people don't take their responsibilities seriously.", 'relational'],
  [1, 'I am afraid of being seen as bad, wrong, or corrupt.', 'fear', true],
  [1, 'Often it feels like I am the only one who will do something properly.', 'relational'],

  // ── Type 2 — Helper ──
  [2, 'I instinctively notice what other people need and move to help.', 'behavior', true],
  [2, "I feel most valuable when I'm being needed by the people around me.", 'motivation'],
  [2, 'I find it hard to ask for help or to admit my own needs.', 'stress'],
  [2, 'I want to be close to people and to be important in their lives.', 'motivation'],
  [2, 'I am naturally warm, generous, and affectionate.', 'image'],
  [2, 'I sometimes give so much that I end up feeling unappreciated.', 'stress'],
  [2, 'I adjust myself to be liked by whoever I am with.', 'relational'],
  [2, 'Being there for others is central to who I am.', 'image'],
  [2, "I worry that if I stopped giving, people wouldn't want me around.", 'fear', true],
  [2, "I focus on others' feelings far more easily than on my own.", 'relational'],

  // ── Type 3 — Achiever ──
  [3, 'I am driven to succeed and to be the best at what I do.', 'motivation', true],
  [3, 'I am very aware of the image I project to others.', 'image'],
  [3, 'I can become whatever a situation needs me to be in order to win.', 'behavior'],
  [3, 'I measure my worth by my accomplishments and productivity.', 'motivation'],
  [3, 'I avoid failure and hate appearing incompetent.', 'stress'],
  [3, 'I am efficient, goal-oriented, and good at getting results.', 'behavior'],
  [3, 'I can lose touch with my own feelings while chasing a goal.', 'stress'],
  [3, 'Being admired and respected matters a great deal to me.', 'relational'],
  [3, "I fear that without my successes I wouldn't be worth much.", 'fear', true],
  [3, 'I naturally present the most impressive version of myself to a room.', 'image'],

  // ── Type 4 — Individualist ──
  [4, 'I feel fundamentally different from other people.', 'image', true],
  [4, 'I am drawn to beauty, depth, and authentic emotional expression.', 'motivation'],
  [4, 'I often long for something that feels missing from my life.', 'motivation'],
  [4, 'My emotions are intense and shape much of my experience.', 'behavior'],
  [4, "I don't want to be ordinary — I want to be authentically myself.", 'motivation'],
  [4, 'I can feel envious of what others seem to have or be.', 'stress'],
  [4, 'I turn inward to explore my feelings and my identity.', 'behavior'],
  [4, 'Melancholy and longing feel familiar, even meaningful, to me.', 'image'],
  [4, 'I fear I am missing something essential that others were simply born with.', 'fear', true],
  [4, 'I push away the ordinary in search of something more meaningful.', 'relational'],

  // ── Type 5 — Investigator ──
  [5, 'I need plenty of private time alone to recharge and think.', 'behavior'],
  [5, "I'd rather observe and understand than jump into action.", 'behavior', true],
  [5, 'I conserve my energy, time, and resources carefully.', 'behavior'],
  [5, 'I feel most secure when I am knowledgeable and competent.', 'motivation', true],
  [5, 'Too many social or emotional demands leave me drained.', 'stress'],
  [5, 'I love going deep into subjects that fascinate me.', 'motivation'],
  [5, "I keep my needs minimal so I don't have to depend on others.", 'relational'],
  [5, 'I detach from my feelings in order to think clearly.', 'image'],
  [5, 'I dread being put on the spot before I feel fully prepared.', 'fear'],
  [5, 'I build up knowledge and reserves before I feel ready to engage.', 'relational'],

  // ── Type 6 — Loyalist ──
  [6, 'I scan for what could go wrong so I can be prepared.', 'behavior', true],
  [6, 'Loyalty and trust are extremely important to me.', 'motivation'],
  [6, 'I frequently question and doubt myself and others.', 'behavior'],
  [6, 'I feel safer when I have allies and clear guidance.', 'motivation'],
  [6, 'My mind can spin with worst-case scenarios.', 'stress'],
  [6, 'I am responsible and committed to the people and groups I belong to.', 'image'],
  [6, 'I am wary of authority yet crave something dependable to believe in.', 'relational'],
  [6, 'I seek reassurance when I feel anxious or uncertain.', 'stress'],
  [6, 'I feel uneasy without something or someone reliable to count on.', 'fear', true],
  [6, 'Before I commit, I test whether people and plans can really be trusted.', 'relational'],

  // ── Type 7 — Enthusiast ──
  [7, "I'm always looking forward to the next exciting possibility.", 'motivation', true],
  [7, 'I keep myself busy and upbeat to avoid boredom and pain.', 'stress'],
  [7, 'I love having lots of options and hate feeling trapped.', 'motivation'],
  [7, 'My mind jumps quickly from one idea to the next.', 'behavior'],
  [7, 'I am enthusiastic, spontaneous, and fun-loving.', 'image'],
  [7, 'I tend to reframe negatives into positives.', 'behavior'],
  [7, 'I can struggle to follow through once the novelty wears off.', 'stress'],
  [7, 'I want to experience everything life has to offer.', 'motivation'],
  [7, 'The thought of being stuck in boredom or pain makes me restless.', 'fear', true],
  [7, 'When things get heavy, I instinctively pivot to something more fun.', 'relational'],

  // ── Type 8 — Challenger ──
  [8, 'I am direct, assertive, and not afraid of confrontation.', 'behavior', true],
  [8, 'I instinctively take charge when I am in a group.', 'behavior'],
  [8, 'I protect the people and the causes I care about.', 'motivation'],
  [8, "I can't stand being controlled or told what to do.", 'motivation'],
  [8, 'I show strength and keep my vulnerability hidden.', 'image'],
  [8, 'I respect people who stand up to me.', 'relational'],
  [8, 'I go after what I want with intensity and force.', 'behavior'],
  [8, 'Injustice and bullying make me want to step in and act.', 'relational'],
  [8, "I'd rather be in control than risk being at someone else's mercy.", 'fear', true],
  [8, 'I size people up quickly to see who is strong and who can be trusted.', 'stress'],

  // ── Type 9 — Peacemaker ──
  [9, 'I go along with others to keep the peace.', 'behavior', true],
  [9, 'I can easily see and appreciate every side of a situation.', 'behavior'],
  [9, 'I tend to avoid conflict and tension whenever I can.', 'motivation'],
  [9, 'I sometimes lose track of my own priorities and wants.', 'stress'],
  [9, 'I have a calm, easygoing, and steady presence.', 'image'],
  [9, 'I can be stubborn through quiet, passive resistance.', 'stress'],
  [9, 'I numb out or distract myself rather than face a problem.', 'stress'],
  [9, 'Harmony and comfort matter deeply to me.', 'motivation'],
  [9, 'I downplay my own wants to avoid disconnection or tension.', 'fear', true],
  [9, "I merge with others' agendas and lose track of my own.", 'relational'],
]

export const QUESTIONS: Question[] = ITEMS.map(([type, text, facet, signature], i) => ({
  id: i,
  type,
  text,
  facet,
  signature: signature || undefined,
}))

export const ITEMS_PER_TYPE = 10

/** The two signature items per type, used to build forced-choice tiebreakers. */
export const SIGNATURES: Record<number, Question[]> = QUESTIONS.reduce(
  (acc, q) => {
    if (q.signature) (acc[q.type] ||= []).push(q)
    return acc
  },
  {} as Record<number, Question[]>,
)
