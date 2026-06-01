import type { TypeNumber } from './types'

// Levels of Development — the same type can show up liberated or imprisoned. Adapted in our own
// words from the Riso–Hudson "nine Levels of Development", grouped into the three bands every
// type moves through: Healthy (free), Average (the everyday social self, run by the passion),
// and Unhealthy (gripped and self-defeating). Each band gets telltale signs; the wake-up call
// marks the slide from healthy into average, and the red flag the slide from average into
// unhealthy — the two thresholds worth catching in yourself.

export interface LevelBand {
  headline: string
  body: string
  signs: string[]
}
export interface Levels {
  healthy: LevelBand
  average: LevelBand
  unhealthy: LevelBand
  wakeUpCall: string // the thought/behaviour that tips healthy → average
  redFlag: string // the fear that tips average → unhealthy
}

export const LEVELS: Record<TypeNumber, Levels> = {
  1: {
    healthy: {
      headline: 'Wise, discerning, accepting',
      body: 'Realistic and conscientious, they hold high standards lightly — able to accept what is while working to improve it. Principled without preaching, tolerant, and at peace; extraordinarily ethical, even noble, and a quiet inspiration to others.',
      signs: ['Hold high standards with patience and humility', 'Accept reality even while improving it', 'Teach by example, not by correction'],
    },
    average: {
      headline: 'Driven, critical, controlled',
      body: 'Dissatisfied with reality, they feel obligated to fix everything and everyone. Orderly, punctual, and opinionated about the “right way”; the inner critic grows loud, impulses get policed as “wrong,” and frustration leaks out as impatience.',
      signs: ['A loud inner critic, aimed at self and others', 'Punctual, orderly, sure of the “right way”', 'Resentment and impatience leak out sideways'],
    },
    unhealthy: {
      headline: 'Rigid, self-righteous, condemning',
      body: 'Severe and intolerant, certain of their own correctness while quietly contradicting their ideals. Obsessive judgment can curdle into cruelty toward others — and crushing self-condemnation within.',
      signs: ['Rigid, self-righteous moralizing', 'Harsh and contradictory — secretly hypocritical', 'Perfectionism collapsing into depression'],
    },
    wakeUpCall: 'Feeling personally obligated to fix everything — as if it’s all on you to make it right.',
    redFlag: 'The fear that your own ideals, judgments, or actions might be wrong.',
  },
  2: {
    healthy: {
      headline: 'Loving, generous, humble',
      body: 'Genuinely caring and empathetic, attuned to others without strings. They give from overflow rather than to be needed — and, crucially, extend that same warmth and care to themselves.',
      signs: ['Attuned and warm, giving freely', 'Care for themselves as well as others', 'Let love flow rather than collecting it back'],
    },
    average: {
      headline: 'People-pleasing, possessive, needy',
      body: 'Warm and flattering, they give in order to be loved and feel indispensable. Pride grows — “they couldn’t manage without me” — while their own needs are denied and a quiet ledger of debts is kept.',
      signs: ['Give in order to be needed and loved', 'Flattering, intrusive, “only trying to help”', 'Deny their own needs while keeping score'],
    },
    unhealthy: {
      headline: 'Manipulative, martyred, entitled',
      body: 'Love becomes coercion: guilt, victimhood, and “after all I’ve done for you.” Long-buried needs erupt, sometimes as illness, and they feel owed for a self-sacrifice no one ever asked for.',
      signs: ['Guilt and victimhood as leverage', 'Feel owed for unasked-for sacrifice', 'Repressed needs erupt — sometimes as illness'],
    },
    wakeUpCall: 'Believing you must go out and win people over — that love has to be earned.',
    redFlag: 'The fear that you’re driving away the very people you love.',
  },
  3: {
    healthy: {
      headline: 'Authentic, self-accepting, inspiring',
      body: 'Self-assured and genuinely admirable, they pour ambition into real contribution. At their best the mask drops — they value themselves for who they are, becoming role models who motivate and lift others.',
      signs: ['Self-accepting — valued for who they are', 'Channel drive into real contribution', 'Drop the mask and inspire others'],
    },
    average: {
      headline: 'Image-conscious, driven, competitive',
      body: 'They begin performing for the audience, tuning the self to win approval and chasing status by comparison. Workaholic and expedient, they fear that slowing down — or failing — means being worthless.',
      signs: ['Tune the self to whatever the audience wants', 'Compare, compete, chase status and applause', 'Workaholic and image-managed; afraid to stop'],
    },
    unhealthy: {
      headline: 'Deceptive, exploitative, hollow',
      body: 'To protect the illusion of success they misrepresent themselves, undercut rivals, and grow cut off from real feeling — a polished surface over an increasingly empty interior.',
      signs: ['Misrepresent themselves to keep the illusion', 'Expedient and devious toward rivals', 'A polished shell over an empty interior'],
    },
    wakeUpCall: 'Starting to perform for validation — needing to be the best and be seen as it.',
    redFlag: 'The fear of failing and being exposed as a fraud.',
  },
  4: {
    healthy: {
      headline: 'Creative, self-aware, authentic',
      body: 'Profoundly in touch with feeling, they transform experience into art and meaning. Self-renewing and inspired, they find the universal in the personal — and beauty in the ordinary.',
      signs: ['Deeply self-aware and emotionally honest', 'Turn raw experience into art and meaning', 'Find the universal in the personal'],
    },
    average: {
      headline: 'Romantic, melancholic, self-absorbed',
      body: 'They heighten feeling through imagination and take everything personally, certain they’re fundamentally different or flawed. Longing for what’s missing, they withdraw into moodiness and fantasy.',
      signs: ['Amplify feeling through imagination', 'Take everything personally; feel set apart', 'Withdraw into moodiness and longing'],
    },
    unhealthy: {
      headline: 'Alienated, self-pitying, self-destructive',
      body: 'Tormented by shame and self-hatred, depressed and inhibited, they can sabotage the good in their lives — and, at the depths, slide toward despair.',
      signs: ['Self-hatred, shame, and depression', 'Sabotage the good in their lives', 'At the depths, despair and self-harm'],
    },
    wakeUpCall: 'Holding on to and amplifying your feelings through the imagination.',
    redFlag: 'The fear that you’re wasting your life and missing your chance.',
  },
  5: {
    healthy: {
      headline: 'Visionary, perceptive, inventive',
      body: 'Pioneering minds who see the world afresh and master complexity, producing genuinely original insight. At their best they’re engaged and present — participating in life, not only studying it.',
      signs: ['See the world in fresh, original ways', 'Master complexity; produce real insight', 'Engaged and present, not only observing'],
    },
    average: {
      headline: 'Detached, secretive, cerebral',
      body: 'They withdraw to observe and conceptualize, conserving energy and minimizing needs, substituting thinking for living. Increasingly specialized and private, reluctant to be drawn out.',
      signs: ['Withdraw to think rather than to act', 'Minimize needs; hoard time, space, energy', 'Specialized, private, hard to draw out'],
    },
    unhealthy: {
      headline: 'Isolated, nihilistic, reclusive',
      body: 'Cut off from people and even their own bodies, they become eccentric, fearful, and antagonistic — retreating into a distorted private world.',
      signs: ['Cut off from people and the body', 'Eccentric, fearful, antagonistic', 'Retreat into a distorted private world'],
    },
    wakeUpCall: 'Retreating from life into concepts, plans, and mental worlds.',
    redFlag: 'The fear that you’re helpless, incapable, and losing your grip on reality.',
  },
  6: {
    healthy: {
      headline: 'Courageous, committed, trustworthy',
      body: 'Grounded and self-affirming, they build security through cooperation and earn deep trust. At their best, brave leaders who act in spite of fear and stand faithfully by their people.',
      signs: ['Grounded, self-affirming, and steady', 'Build trust and security through cooperation', 'Brave — act in spite of the fear'],
    },
    average: {
      headline: 'Anxious, vigilant, ambivalent',
      body: 'Forever scanning for danger and testing others’ loyalty, they swing between dependence and defiance, doubt and reassurance-seeking — reactive, complaining, and caught in worst-case loops.',
      signs: ['Scan for danger; test others’ loyalty', 'Swing between obedience and defiance', 'Doubt, complain, seek reassurance'],
    },
    unhealthy: {
      headline: 'Panicked, paranoid, volatile',
      body: 'Overwhelmed by anxiety, they cling or lash out, grow suspicious and divisive, and lurch between submission and aggressive over-reaction.',
      signs: ['Anxiety tips into panic', 'Suspicious, divisive, accusatory', 'Lurch between clinging and lashing out'],
    },
    wakeUpCall: 'Looking outside yourself — to an authority, group, or belief — for certainty.',
    redFlag: 'The fear that your own choices have endangered your security.',
  },
  7: {
    healthy: {
      headline: 'Joyful, versatile, grateful',
      body: 'Quick and enthusiastic, gifted at weaving experience into wisdom and delight. At their best they aim their gifts at worthwhile ends and find deep satisfaction in the present — not just the next thing.',
      signs: ['Joyful, quick, deeply grateful', 'Weave experience into wisdom and delight', 'Satisfied in the present, not the next thing'],
    },
    average: {
      headline: 'Scattered, restless, excess-seeking',
      body: 'Chasing stimulation and options to stay ahead of pain, they grow busy, distracted, and self-indulgent — dabbling rather than committing and reframing every problem away.',
      signs: ['Chase options and stimulation to outrun pain', 'Busy and scattered; never quite land', 'Reframe every problem away'],
    },
    unhealthy: {
      headline: 'Impulsive, escapist, out of control',
      body: 'Frantic to outrun anxiety, they turn reckless and addictive, unable to follow through — leaving a wake of abandoned plans and hard crashes.',
      signs: ['Impulsive and addictive', 'Unable to follow through on anything', 'Frantic escape, then the crash'],
    },
    wakeUpCall: 'Feeling that something better is always available somewhere else.',
    redFlag: 'The fear that your own choices are trapping you in pain.',
  },
  8: {
    healthy: {
      headline: 'Magnanimous, self-mastered, heroic',
      body: 'They use their strength to protect and empower — decisive, courageous, and surprisingly tender. At their best, magnanimous leaders who shoulder great responsibility and raise others up.',
      signs: ['Use strength to protect and empower', 'Decisive, courageous — and surprisingly tender', 'Magnanimous; carry real responsibility'],
    },
    average: {
      headline: 'Dominating, willful, confrontational',
      body: 'Asserting control and self-reliance, they become combative and intimidating, expanding their turf, bristling at being controlled, and refusing to show any softness.',
      signs: ['Assert control; insist on self-reliance', 'Combative, intimidating, territorial', 'Refuse to show softness or need'],
    },
    unhealthy: {
      headline: 'Ruthless, vengeful, tyrannical',
      body: 'Hardened against all vulnerability, they can turn destructive and dictatorial — treating others as threats to crush, and dangerously overreaching.',
      signs: ['Ruthless and vengeful', 'Treat others as threats to crush', 'Dictatorial; dangerously overreaching'],
    },
    wakeUpCall: 'Feeling you must push and struggle to make things go your way.',
    redFlag: 'The fear that others are turning against you — so you move to strike first.',
  },
  9: {
    healthy: {
      headline: 'Serene, accepting, dynamic',
      body: 'Deeply receptive and at peace, yet fully present and engaged. They bring people together and heal conflict, showing up for their own lives with quiet, steady strength.',
      signs: ['Serene yet fully present and engaged', 'Bring people together; heal conflict', 'Show up for their own life with quiet strength'],
    },
    average: {
      headline: 'Accommodating, complacent, self-forgetting',
      body: 'Going along to keep the peace, they merge with others’ agendas, minimize problems, and numb out through comfort and routine — slowly losing track of their own priorities.',
      signs: ['Go along to keep the peace', 'Merge with others; minimize problems', 'Numb out through comfort and routine'],
    },
    unhealthy: {
      headline: 'Repressed, stubborn, dissociated',
      body: 'To avoid conflict they shut down — neglectful, obstinate, and checked-out — dissociating from anger and reality until things quietly fall apart around them.',
      signs: ['Shut down; stubborn and neglectful', 'Dissociate from anger and reality', 'Checked-out as things fall apart'],
    },
    wakeUpCall: 'Quietly going along with others and “checking out” of your own priorities.',
    redFlag: 'The fear of being forced by reality to finally face your problems.',
  },
}
