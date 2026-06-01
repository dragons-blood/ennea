import type { TypeNumber } from './types'

// Levels of Development — the same type can show up liberated or imprisoned. Adapted in our own
// words from the Riso–Hudson "nine Levels of Development", grouped into the three bands every
// type moves through: Healthy (free), Average (the everyday social self, run by the passion),
// and Unhealthy (gripped and self-defeating). Where you sit isn't fixed — it shifts with stress,
// growth, and awareness.

export interface LevelBand {
  headline: string
  body: string
}
export interface Levels {
  healthy: LevelBand
  average: LevelBand
  unhealthy: LevelBand
}

export const LEVELS: Record<TypeNumber, Levels> = {
  1: {
    healthy: {
      headline: 'Wise, discerning, accepting',
      body: 'Realistic and conscientious, they hold high standards lightly — able to accept what is while improving it. Principled without preaching, tolerant, and at peace; extraordinarily ethical, even noble.',
    },
    average: {
      headline: 'Driven, critical, controlled',
      body: 'Dissatisfied with reality, they feel obligated to fix everything and everyone. Orderly, punctual, and opinionated; the inner critic grows loud, impulses get policed as “wrong,” and frustration leaks out as impatience.',
    },
    unhealthy: {
      headline: 'Rigid, self-righteous, condemning',
      body: 'Severe and intolerant, certain of their own correctness while contradicting their ideals in secret. Obsessive judgment can curdle into cruelty toward others — and crushing self-condemnation within.',
    },
  },
  2: {
    healthy: {
      headline: 'Loving, generous, humble',
      body: 'Genuinely caring and empathetic, attuned to others without strings. They give from overflow rather than to be needed — and, crucially, extend that same care to themselves.',
    },
    average: {
      headline: 'People-pleasing, possessive, needy',
      body: 'Warm and flattering, they give in order to be loved and feel indispensable. Pride grows — “they couldn’t manage without me” — while their own needs are denied and a quiet ledger of debts is kept.',
    },
    unhealthy: {
      headline: 'Manipulative, martyred, entitled',
      body: 'Love becomes coercion: guilt, victimhood, and “after all I’ve done for you.” Long-buried needs erupt, sometimes as illness, and they feel owed for a self-sacrifice no one asked for.',
    },
  },
  3: {
    healthy: {
      headline: 'Authentic, self-accepting, inspiring',
      body: 'Self-assured and genuinely admirable, they pour ambition into real contribution. At their best the mask drops — they value themselves for who they are, becoming role models who lift others.',
    },
    average: {
      headline: 'Image-conscious, driven, competitive',
      body: 'They begin performing for the audience, tuning the self to win approval and chasing status by comparison. Workaholic and expedient, they fear that slowing down — or failing — means being worthless.',
    },
    unhealthy: {
      headline: 'Deceptive, exploitative, hollow',
      body: 'To protect the illusion of success they misrepresent themselves, undercut rivals, and grow cut off from real feeling — a polished surface over an increasingly empty interior.',
    },
  },
  4: {
    healthy: {
      headline: 'Creative, self-aware, authentic',
      body: 'Profoundly in touch with feeling, they transform experience into art and meaning. Self-renewing and inspired, they find the universal in the personal — and beauty in the ordinary.',
    },
    average: {
      headline: 'Romantic, melancholic, self-absorbed',
      body: 'They heighten feeling through imagination and take everything personally, certain they’re fundamentally different or flawed. Longing for what’s missing, they withdraw into moodiness and fantasy.',
    },
    unhealthy: {
      headline: 'Alienated, self-pitying, self-destructive',
      body: 'Tormented by shame and self-hatred, depressed and inhibited, they can sabotage the good in their lives — and, at the depths, slide toward despair.',
    },
  },
  5: {
    healthy: {
      headline: 'Visionary, perceptive, inventive',
      body: 'Pioneering minds who see the world afresh and master complexity, producing genuinely original insight. At their best they’re engaged and present — participating in life, not only studying it.',
    },
    average: {
      headline: 'Detached, secretive, cerebral',
      body: 'They withdraw to observe and conceptualize, conserving energy and minimizing needs, substituting thinking for living. Increasingly specialized and private, reluctant to be drawn out.',
    },
    unhealthy: {
      headline: 'Isolated, nihilistic, reclusive',
      body: 'Cut off from people and even their own bodies, they become eccentric, fearful, and antagonistic — retreating into a distorted private world.',
    },
  },
  6: {
    healthy: {
      headline: 'Courageous, committed, trustworthy',
      body: 'Grounded and self-affirming, they build security through cooperation and earn deep trust. At their best, brave leaders who act in spite of fear and stand by their people.',
    },
    average: {
      headline: 'Anxious, vigilant, ambivalent',
      body: 'Forever scanning for danger and testing others’ loyalty, they swing between dependence and defiance, doubt and reassurance-seeking — reactive, complaining, and caught in worst-case loops.',
    },
    unhealthy: {
      headline: 'Panicked, paranoid, volatile',
      body: 'Overwhelmed by anxiety, they cling or lash out, grow suspicious and divisive, and lurch between submission and aggressive over-reaction.',
    },
  },
  7: {
    healthy: {
      headline: 'Joyful, versatile, grateful',
      body: 'Quick and enthusiastic, gifted at weaving experience into wisdom and delight. At their best they aim their gifts at worthwhile ends and find deep satisfaction in the present — not just the next thing.',
    },
    average: {
      headline: 'Scattered, restless, excess-seeking',
      body: 'Chasing stimulation and options to stay ahead of pain, they grow busy, distracted, and self-indulgent — dabbling rather than committing and reframing every problem away.',
    },
    unhealthy: {
      headline: 'Impulsive, escapist, out of control',
      body: 'Frantic to outrun anxiety, they turn reckless and addictive, unable to follow through — leaving a wake of abandoned plans and hard crashes.',
    },
  },
  8: {
    healthy: {
      headline: 'Magnanimous, self-mastered, heroic',
      body: 'They use their strength to protect and empower — decisive, courageous, and surprisingly tender. At their best, magnanimous leaders who shoulder great responsibility and raise others up.',
    },
    average: {
      headline: 'Dominating, willful, confrontational',
      body: 'Asserting control and self-reliance, they become combative and intimidating, expanding their turf, bristling at being controlled, and refusing to show any softness.',
    },
    unhealthy: {
      headline: 'Ruthless, vengeful, tyrannical',
      body: 'Hardened against all vulnerability, they can turn destructive and dictatorial — treating others as threats to crush, and dangerously overreaching.',
    },
  },
  9: {
    healthy: {
      headline: 'Serene, accepting, dynamic',
      body: 'Deeply receptive and at peace, yet fully present and engaged. They bring people together and heal conflict, showing up for their own lives with quiet, steady strength.',
    },
    average: {
      headline: 'Accommodating, complacent, self-forgetting',
      body: 'Going along to keep the peace, they merge with others’ agendas, minimize problems, and numb out through comfort and routine — slowly losing track of their own priorities.',
    },
    unhealthy: {
      headline: 'Repressed, stubborn, dissociated',
      body: 'To avoid conflict they shut down — neglectful, obstinate, and checked-out — dissociating from anger and reality until things quietly fall apart around them.',
    },
  },
}
