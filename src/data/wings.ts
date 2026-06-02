// Rich, wing-specific depth for all 18 type+wing combinations, keyed by wing id (e.g. '4w5').
// A wing is the neighbouring type that most colours your core; two people of the same core can
// feel quite different depending on which wing leads. `lean` is a short flavour phrase reused to
// describe each member of a full tritype and to contrast a wing with its sibling.

export interface WingDetail {
  description: string // 2–3 sentences on how this wing colours the core
  gift: string // what the wing adds at its best
  watch: string // the growth edge the wing introduces
  lean: string // short flavour phrase, e.g. "more withdrawn, cerebral, and original"
}

export const WING_DETAIL: Record<string, WingDetail> = {
  // ── Type 1 ──
  '1w9': {
    description:
      'The One’s drive to improve is cooled and steadied by the Nine’s calm. You’re more reserved, objective, and philosophical — an idealist who reforms quietly, from principle and big-picture vision rather than heat.',
    gift: 'Serene, fair-minded perspective; principled without being preachy.',
    watch: 'Detachment and a slow simmer — anger and disorder get suppressed rather than addressed.',
    lean: 'cooler, more detached and idealistic',
  },
  '1w2': {
    description:
      'The One’s standards are warmed and aimed outward by the Two’s heart. You’re more interpersonal, helpful, and zealous — a crusader who wants to put things right *for people*, with conviction and care.',
    gift: 'Warm, persuasive zeal for a better world.',
    watch: 'Self-righteous crusading and correcting others “for their own good.”',
    lean: 'warmer, more relational and crusading',
  },
  // ── Type 2 ──
  '2w1': {
    description:
      'The Two’s warmth is given a conscience and boundaries by the One. You’re more principled, dutiful, and self-controlled — serving from a sense of what’s right, more reserved and less overtly needy.',
    gift: 'Devoted, high-integrity service that quietly does the right thing.',
    watch: 'Guilt, self-criticism, and martyred over-giving.',
    lean: 'more principled, dutiful, and reserved',
  },
  '2w3': {
    description:
      'The Two’s heart is energised and polished by the Three. You’re more ambitious, sociable, and image-aware — a charming connector who helps with flair and loves to be at the centre of things.',
    gift: 'Charisma and warmth that draw people in and get things done.',
    watch: 'Seductiveness, status-seeking, and helping that’s really self-promotion.',
    lean: 'more ambitious, sociable, and image-aware',
  },
  // ── Type 3 ──
  '3w2': {
    description:
      'The Three’s drive is softened and warmed by the Two. You’re more personable, encouraging, and relationship-savvy — a charmer who wins through likeability as much as achievement.',
    gift: 'Magnetic encouragement that lifts a whole team.',
    watch: 'Approval-seeking and an image built on being liked.',
    lean: 'warmer, more charming and people-oriented',
  },
  '3w4': {
    description:
      'The Three’s ambition is deepened and made tasteful by the Four. You’re more introspective, serious, and craft-focused — treating success as artistry, with real depth under the polish.',
    gift: 'Excellence with substance, depth, and taste.',
    watch: 'Pretentiousness, self-doubt, and a sharper fear of failure.',
    lean: 'more introspective, serious, and craft-focused',
  },
  // ── Type 4 ──
  '4w3': {
    description:
      'The Four’s depth is propelled outward by the Three. You’re more ambitious, expressive, and image-aware — a dramatic creator who turns inner life into something polished and seen.',
    gift: 'Expressive, original creativity that actually ships.',
    watch: 'Elitism, comparison, and performing the emotions.',
    lean: 'more ambitious, expressive, and image-aware',
  },
  '4w5': {
    description:
      'The Four’s feeling is drawn inward and intellectualised by the Five. You’re more withdrawn, cerebral, and unconventional — an original whose depth runs private and idiosyncratic.',
    gift: 'Profound, genuinely original inner vision.',
    watch: 'Isolation, alienation, and living more in the inner world than the real one.',
    lean: 'more withdrawn, cerebral, and original',
  },
  // ── Type 5 ──
  '5w4': {
    description:
      'The Five’s analysis is coloured by the Four’s feeling and aesthetics. You’re more creative, emotional, and individualistic — a thinker whose curiosity bends toward art, meaning, and the unconventional.',
    gift: 'Imaginative, original synthesis of idea and feeling.',
    watch: 'Moody withdrawal and self-absorption.',
    lean: 'more creative, emotional, and original',
  },
  '5w6': {
    description:
      'The Five’s mind is grounded and made practical by the Six. You’re more cooperative, loyal, and useful — a rigorous problem-solver who builds dependable expertise and sticks with a team.',
    gift: 'Careful, trustworthy analysis applied to real problems.',
    watch: 'Anxiety, skepticism, and over-caution.',
    lean: 'more practical, loyal, and grounded',
  },
  // ── Type 6 ──
  '6w5': {
    description:
      'The Six’s vigilance is sharpened and made self-reliant by the Five. You’re more independent, intellectual, and serious — a careful, private defender who thinks problems through alone.',
    gift: 'Thoughtful, well-prepared vigilance and quiet steadiness.',
    watch: 'Withdrawal, suspicion, and isolating under threat.',
    lean: 'more intellectual, guarded, and self-reliant',
  },
  '6w7': {
    description:
      'The Six’s loyalty is lightened and made sociable by the Seven. You’re more outgoing, playful, and engaging — a warm, funny ally whose anxiety hides behind activity and humour.',
    gift: 'Endearing, energising loyalty that keeps spirits up.',
    watch: 'Scattered escapism and impulsive avoidance of fear.',
    lean: 'more outgoing, playful, and engaging',
  },
  // ── Type 7 ──
  '7w6': {
    description:
      'The Seven’s appetite is grounded and made loyal by the Six. You’re more responsible, relatable, and endearing — an enthusiast who actually commits to people and sticks around.',
    gift: 'Warm, grounded enthusiasm with real follow-through on relationships.',
    watch: 'Anxiety and neediness under the fun.',
    lean: 'more loyal, relatable, and grounded',
  },
  '7w8': {
    description:
      'The Seven’s energy is focused and powered by the Eight. You’re more assertive, bold, and driven — a high-octane go-getter who turns ideas into action and pushes hard for what you want.',
    gift: 'Charismatic drive that launches things and makes them real.',
    watch: 'Excess, impatience, and steamrolling.',
    lean: 'more assertive, bold, and driven',
  },
  // ── Type 8 ──
  '8w7': {
    description:
      'The Eight’s force is energised and made enterprising by the Seven. You’re more outgoing, visionary, and adventurous — a bold, charismatic maverick always building something bigger.',
    gift: 'Magnetic, enterprising leadership with big vision.',
    watch: 'Impulsive empire-building and excess.',
    lean: 'more outgoing, enterprising, and restless',
  },
  '8w9': {
    description:
      'The Eight’s power is calmed and made steady by the Nine. You’re more grounded, even-keeled, and quietly forceful — a protective presence whose strength is felt more than shown.',
    gift: 'Steady, reassuring strength; immovable when it matters.',
    watch: 'Stubborn stonewalling and slow-building, hidden anger.',
    lean: 'calmer, steadier, and quietly forceful',
  },
  // ── Type 9 ──
  '9w8': {
    description:
      'The Nine’s ease is given backbone and instinct by the Eight. You’re more assertive, grounded, and independent — easygoing on the surface, but with real strength and a will of your own underneath.',
    gift: 'Approachable, grounded leadership that can hold its ground.',
    watch: 'Stubbornness and blunt eruptions after too much going-along.',
    lean: 'more assertive, grounded, and independent',
  },
  '9w1': {
    description:
      'The Nine’s calm is given order and conscience by the One. You’re more principled, idealistic, and reserved — a gentle peacemaker with quiet convictions and a sense of how things should be.',
    gift: 'Gentle, principled idealism and a steadying moral compass.',
    watch: 'Passive resistance, repression, and quiet judgment.',
    lean: 'more orderly, principled, and idealistic',
  },
}
