import type { Question, TypeNumber } from './types'

// 8 first-person statements per type (72 total). Each taps that type's core
// motivation / pattern, not just surface behavior. Rated 1 (strongly disagree)
// to 5 (strongly agree); higher agreement = more of that type.
const ITEMS: [TypeNumber, string][] = [
  // Type 1 — Reformer
  [1, 'I have a strong inner critic that notices what is wrong or could be improved.'],
  [1, 'It matters to me to do things the right way, even when no one is watching.'],
  [1, 'I feel a personal obligation to fix mistakes and improve things around me.'],
  [1, 'I hold myself to high standards and feel guilty when I fall short.'],
  [1, 'I have clear convictions about what is right and what is wrong.'],
  [1, 'Disorder, sloppiness, and carelessness genuinely bother me.'],
  [1, 'I work hard to control my impulses and act with self-discipline.'],
  [1, "I get frustrated when people don't take their responsibilities seriously."],

  // Type 2 — Helper
  [2, 'I instinctively notice what other people need and move to help.'],
  [2, "I feel most valuable when I'm being needed by the people around me."],
  [2, 'I find it hard to ask for help or to admit my own needs.'],
  [2, 'I want to be close to people and to be important in their lives.'],
  [2, 'I am naturally warm, generous, and affectionate.'],
  [2, 'I sometimes give so much that I end up feeling unappreciated.'],
  [2, 'I adjust myself to be liked by whoever I am with.'],
  [2, 'Being there for others is central to who I am.'],

  // Type 3 — Achiever
  [3, 'I am driven to succeed and to be the best at what I do.'],
  [3, 'I am very aware of the image I project to others.'],
  [3, 'I can become whatever a situation needs me to be in order to win.'],
  [3, 'I measure my worth by my accomplishments and productivity.'],
  [3, 'I avoid failure and hate appearing incompetent.'],
  [3, 'I am efficient, goal-oriented, and good at getting results.'],
  [3, 'I can lose touch with my own feelings while chasing a goal.'],
  [3, 'Being admired and respected matters a great deal to me.'],

  // Type 4 — Individualist
  [4, 'I feel fundamentally different from other people.'],
  [4, 'I am drawn to beauty, depth, and authentic emotional expression.'],
  [4, 'I often long for something that feels missing from my life.'],
  [4, 'My emotions are intense and shape much of my experience.'],
  [4, "I don't want to be ordinary — I want to be authentically myself."],
  [4, 'I can feel envious of what others seem to have or be.'],
  [4, 'I turn inward to explore my feelings and my identity.'],
  [4, 'Melancholy and longing feel familiar, even meaningful, to me.'],

  // Type 5 — Investigator
  [5, 'I need plenty of private time alone to recharge and think.'],
  [5, "I'd rather observe and understand than jump into action."],
  [5, 'I conserve my energy, time, and resources carefully.'],
  [5, 'I feel most secure when I am knowledgeable and competent.'],
  [5, 'Too many social or emotional demands leave me drained.'],
  [5, 'I love going deep into subjects that fascinate me.'],
  [5, "I keep my needs minimal so I don't have to depend on others."],
  [5, 'I detach from my feelings in order to think clearly.'],

  // Type 6 — Loyalist
  [6, 'I scan for what could go wrong so I can be prepared.'],
  [6, 'Loyalty and trust are extremely important to me.'],
  [6, 'I frequently question and doubt myself and others.'],
  [6, 'I feel safer when I have allies and clear guidance.'],
  [6, 'My mind can spin with worst-case scenarios.'],
  [6, 'I am responsible and committed to the people and groups I belong to.'],
  [6, 'I am wary of authority yet crave something dependable to believe in.'],
  [6, 'I seek reassurance when I feel anxious or uncertain.'],

  // Type 7 — Enthusiast
  [7, "I'm always looking forward to the next exciting possibility."],
  [7, 'I keep myself busy and upbeat to avoid boredom and pain.'],
  [7, 'I love having lots of options and hate feeling trapped.'],
  [7, 'My mind jumps quickly from one idea to the next.'],
  [7, 'I am enthusiastic, spontaneous, and fun-loving.'],
  [7, 'I tend to reframe negatives into positives.'],
  [7, 'I can struggle to follow through once the novelty wears off.'],
  [7, 'I want to experience everything life has to offer.'],

  // Type 8 — Challenger
  [8, 'I am direct, assertive, and not afraid of confrontation.'],
  [8, 'I instinctively take charge when I am in a group.'],
  [8, 'I protect the people and the causes I care about.'],
  [8, "I can't stand being controlled or told what to do."],
  [8, 'I show strength and keep my vulnerability hidden.'],
  [8, 'I respect people who stand up to me.'],
  [8, 'I go after what I want with intensity and force.'],
  [8, 'Injustice and bullying make me want to step in and act.'],

  // Type 9 — Peacemaker
  [9, 'I go along with others to keep the peace.'],
  [9, 'I can easily see and appreciate every side of a situation.'],
  [9, 'I tend to avoid conflict and tension whenever I can.'],
  [9, 'I sometimes lose track of my own priorities and wants.'],
  [9, 'I have a calm, easygoing, and steady presence.'],
  [9, 'I can be stubborn through quiet, passive resistance.'],
  [9, 'I numb out or distract myself rather than face a problem.'],
  [9, 'Harmony and comfort matter deeply to me.'],
]

export const QUESTIONS: Question[] = ITEMS.map(([type, text], i) => ({ id: i, type, text }))

export const ITEMS_PER_TYPE = 8
