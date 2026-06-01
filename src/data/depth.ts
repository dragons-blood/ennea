// Dense, grounded depth content per type — the core knot (why you're here), an honest
// shadow/flaws list, how you show up in love and at work, and your growth path (toward
// your integration point) with concrete practices.

export interface Depth {
  coreKnot: string
  shadow: string[]
  love: { gives: string; struggles: string; needs: string }
  work: { strengths: string; environment: string; pitfall: string }
  growth: string
  practices: string[]
}

export const DEPTH: Record<number, Depth> = {
  1: {
    coreKnot:
      'Beneath the drive to be good runs a fear of being corrupt or wrong — so you earn your worth by being right and improving everything. But the inner critic never signs off, and "good" quietly becomes a cage.',
    shadow: ['A relentless inner critic you also aim at others', 'Resentment from over-controlling your anger', 'Rigid, black-and-white thinking', 'Self-righteousness — your way is the right way', 'Confusing being good with being lovable'],
    love: { gives: 'Loyalty, devotion, and a partner who genuinely keeps trying to be better.', struggles: 'Criticism, nit-picking, and withholding warmth until things are "right".', needs: "To hear you're good enough as you are — and permission to let perfect go." },
    work: { strengths: 'Integrity, precision, ethics, and dependable follow-through.', environment: 'Clear standards, a meaningful mission, and fair process.', pitfall: 'Micromanaging, perfectionism, and burnout from over-responsibility.' },
    growth: 'You grow toward Type 7 — lightening up, playing, and trusting the world is okay even when imperfect.',
    practices: ['Catch the inner critic and answer it with "good enough"', 'Schedule real rest and pleasure you didn\'t have to earn', 'Let small mistakes simply stand'],
  },
  2: {
    coreKnot:
      'Beneath the giving is a fear of being unwanted — so you make yourself loved by being needed. The cost: you lose track of your own needs, then quietly resent that no one meets them.',
    shadow: ['Giving with strings, then feeling unappreciated', "Pride — 'they couldn't manage without me'", 'People-pleasing and flattery', 'Difficulty even feeling your own needs', 'Intrusiveness dressed up as helpfulness'],
    love: { gives: 'Warmth, attentiveness, and deep, demonstrative devotion.', struggles: 'Over-giving, hinting instead of asking, and resentment when unreciprocated.', needs: 'To be loved for who you are, not what you do — and to actually receive.' },
    work: { strengths: 'People skills, generosity, reading needs, building loyalty.', environment: 'Relational, appreciative, people-facing roles.', pitfall: 'Over-committing, collapsed boundaries, and caretaking burnout.' },
    growth: 'You grow toward Type 4 — turning inward to honour your own feelings and needs without guilt.',
    practices: ['Name one of your own needs each day and ask for it directly', 'Give only what you can give freely, with no ledger', 'Let yourself be cared for'],
  },
  3: {
    coreKnot:
      'Beneath the success is a fear of being worthless without it — so you become the image that wins approval. The danger is losing contact with who you actually are beneath the performance.',
    shadow: ['Equating your worth with achievement and image', 'Shape-shifting into whatever impresses', 'Burying feelings to keep performing', 'Spin, vanity, and competitiveness', 'Workaholism and a deep fear of failure'],
    love: { gives: 'Energy, ambition, and a partner who makes things happen.', struggles: 'Image-management, emotional unavailability, valuing wins over intimacy.', needs: 'To be loved for the real you, not your highlight reel.' },
    work: { strengths: 'Drive, efficiency, adaptability, leadership, results.', environment: 'Goal-oriented, high-performing, with room to shine.', pitfall: 'Cutting corners on truth, overwork, and identity fused to winning.' },
    growth: 'You grow toward Type 6 — loyalty, cooperation, and valuing the team over the spotlight.',
    practices: ['Rest without guilt and without "being productive"', 'Share a real feeling instead of a performance', "Ask what you actually want beneath the goals"],
  },
  4: {
    coreKnot:
      "Beneath the longing is a fear of having no identity — so you guard your specialness and your feelings. But the focus on what's missing keeps fulfilment permanently one step away.",
    shadow: ['Envy and comparison — others have what you lack', 'Melancholy as identity; disdain for the ordinary', 'Moodiness and withdrawal', 'Self-absorption in your own drama', 'Romanticising the unavailable'],
    love: { gives: 'Depth, authenticity, romance, and rare emotional honesty.', struggles: 'Push-pull, idealising then devaluing, and craving intensity.', needs: 'To be truly seen in your depths — and to find the extraordinary in the ordinary.' },
    work: { strengths: 'Creativity, aesthetics, emotional attunement, originality.', environment: 'Expressive, meaningful work with room for individuality.', pitfall: 'Moodiness, taking things personally, and scorn for the mundane.' },
    growth: 'You grow toward Type 1 — discipline, structure, and acting on principle rather than mood.',
    practices: ['Do the thing even when you don\'t feel like it', 'Each day, notice what you already have', 'Turn the feeling into something made'],
  },
  5: {
    coreKnot:
      'Beneath the detachment is a fear of being incapable or drained — so you retreat into knowledge and shrink your needs to stay self-sufficient. But life is lived out there, not only in the mind.',
    shadow: ['Hoarding time, energy, and yourself', 'Detachment and emotional withholding', 'Isolation and avoidance of demands', 'Quiet arrogance about what you know', 'Living in your head instead of your life'],
    love: { gives: 'Depth, loyalty, independence, and a calm, undemanding presence.', struggles: 'Withdrawal, stinginess with time and energy, dread of emotional demand.', needs: 'Space that\'s respected — and a gentle nudge to show up and connect.' },
    work: { strengths: 'Expertise, analysis, innovation, deep independent focus.', environment: 'Autonomy, depth, minimal politics and interruption.', pitfall: 'Detaching, under-communicating, and researching instead of acting.' },
    growth: 'You grow toward Type 8 — embodiment, action, and trusting you have enough to fully engage.',
    practices: ['Share before you feel fully ready', 'Spend energy generously on one relationship', 'Move your body out into the world'],
  },
  6: {
    coreKnot:
      "Beneath the vigilance is a fear of being without support — so you scan for danger and hunt for certainty. But most of the threat you're managing lives inside, not out there.",
    shadow: ['Anxiety, doubt, and worst-case spirals', 'Suspicion and constant testing of others', "Projection — your fear becomes 'their' threat", 'Reactivity and contrarian defiance', 'Trouble trusting your own mind'],
    love: { gives: 'Loyalty, commitment, warmth, and showing up when it counts.', struggles: 'Doubt, testing, neediness, and accusing before asking.', needs: 'Reassurance, consistency, and a partner who proves steady over time.' },
    work: { strengths: 'Troubleshooting, loyalty, responsibility, foreseeing problems.', environment: 'Stable, clear, trustworthy, collaborative.', pitfall: 'Indecision, anxiety, and tangled relationships with authority.' },
    growth: 'You grow toward Type 9 — inner steadiness, trust, and faith that you can handle what comes.',
    practices: ['Name the fear, then check it against the actual facts', 'Act on your own counsel without seeking one more opinion', 'Trust a little before it feels fully earned'],
  },
  7: {
    coreKnot:
      "Beneath the fun is a fear of being trapped in pain — so you keep your options open and chase the next bright thing. But you're often fleeing a feeling rather than choosing a life.",
    shadow: ['Escapism and avoidance of anything painful', "Scattered, over-committed, can't finish", 'Impulsiveness and excess', 'Reframing real problems away', 'Restless "grass is greener" dissatisfaction'],
    love: { gives: 'Fun, optimism, adventure, and infectious energy.', struggles: 'Commitment-phobia, distraction, and bailing when it gets hard.', needs: 'Freedom and a partner who helps you stay, and go deep.' },
    work: { strengths: 'Ideas, energy, versatility, vision, and optimism.', environment: 'Variety, autonomy, fast pace, fresh challenges.', pitfall: 'Weak follow-through and skipping the boring-but-necessary.' },
    growth: 'You grow toward Type 5 — depth, focus, and staying with one thing long enough to master it.',
    practices: ['Feel the uncomfortable feeling instead of escaping it', 'Finish something before you start the next thing', 'Choose less, but go deeper'],
  },
  8: {
    coreKnot:
      'Beneath the armour is a fear of being controlled or harmed — so you take charge and stay strong. But the vulnerability you guard so fiercely is exactly where your tenderness and real connection live.',
    shadow: ['Domination and intimidation', 'Confusing vulnerability with weakness', 'Excess and all-or-nothing intensity', 'Bluntness that bulldozes people', 'Difficulty trusting, softening, or yielding'],
    love: { gives: 'Protection, loyalty, passion, and fierce devotion.', struggles: 'Control, guardedness, and steamrolling gentler partners.', needs: 'Someone strong enough to be trusted with your hidden softness.' },
    work: { strengths: 'Leadership, decisiveness, courage, and protecting the team.', environment: 'Autonomy, real impact, direct people, a just cause.', pitfall: 'Domineering, impatience, and clashing with authority.' },
    growth: 'You grow toward Type 2 — open-hearted generosity and letting other people in.',
    practices: ['Let one person see you completely unguarded', 'Ask, where you would normally command', 'Aim your strength at protecting, not controlling'],
  },
  9: {
    coreKnot:
      'Beneath the calm is a fear of loss and conflict — so you merge with others and keep the peace. But you fall asleep to your own priorities, your anger, and your own presence in the process.',
    shadow: ['Self-forgetting — your own agenda vanishes', 'Passive resistance and quiet stubbornness', 'Numbing out, procrastination, inertia', 'Avoiding conflict at the cost of honesty', 'Minimising yourself and your impact'],
    love: { gives: 'Acceptance, steadiness, ease, and unconditional presence.', struggles: 'Conflict avoidance, passivity, and disappearing your own wants.', needs: 'To be asked what YOU want — and to matter, not just merge.' },
    work: { strengths: 'Mediation, steadiness, seeing all sides, calm under pressure.', environment: 'Harmonious, low-conflict, with clear priorities.', pitfall: 'Procrastination, avoidance, and not asserting your view.' },
    growth: 'You grow toward Type 3 — waking up, prioritising, and showing up fully for your own life.',
    practices: ['Name what YOU want and act on it today', 'Let yourself feel anger as useful information', "Stop going along just to get along"],
  },
}
