import type { Center, CenterInfo, EnneaType, TypeNumber } from './types'

export const CENTERS: CenterInfo[] = [
  {
    name: 'Gut',
    also: 'Body / Instinctive',
    emotion: 'anger',
    types: [8, 9, 1],
    blurb:
      'The instinctive center moves through the world by gut feeling, autonomy, and a relationship to anger and control. Eights externalize it, Ones internalize it, Nines fall asleep to it.',
  },
  {
    name: 'Heart',
    also: 'Feeling / Image',
    emotion: 'shame',
    types: [2, 3, 4],
    blurb:
      'The feeling center is concerned with identity, connection, and a hidden relationship to shame. Twos turn outward to others, Threes toward achievement, Fours inward toward their own depths.',
  },
  {
    name: 'Head',
    also: 'Thinking / Fear',
    emotion: 'fear',
    types: [5, 6, 7],
    blurb:
      'The thinking center seeks security and meets the world through a relationship to fear and the mind. Fives withdraw into knowledge, Sixes scan for danger, Sevens flee into possibility.',
  },
]

export const TYPES: EnneaType[] = [
  {
    number: 1,
    name: 'The Reformer',
    also: 'The Perfectionist',
    center: 'Gut',
    color: '#4F86C6',
    hold: 'Principled, purposeful, and self-controlled — striving to be good and make things right.',
    basicFear: 'being corrupt, defective, or wrong',
    basicDesire: 'to be good, to have integrity, to be balanced',
    coreMotivation: 'to be right, to improve everything, and to be consistent with their ideals',
    description:
      'Ones are conscientious and ethical, with a strong sense of right and wrong. Teachers and crusaders at heart, they are always striving to improve things while fearing their own mistakes. Orderly and fastidious, they hold themselves and the world to high standards and carry a relentless inner critic and a sense of personal obligation to make things better.',
    atBest: 'wise, discerning, and noble — morally grounded yet able to accept imperfection with grace.',
    atWorst: 'critical, resentful, and rigid — self-righteous and ruled by an inner critic that never rests.',
    keyTraits: ['principled', 'responsible', 'self-disciplined', 'idealistic', 'orderly'],
    growthTo: 7,
    stressTo: 4,
    wings: [
      { neighbor: 9, id: '1w9', name: 'The Idealist', blurb: 'cooler and more detached — a reserved, philosophical reformer with a calm, principled idealism.' },
      { neighbor: 2, id: '1w2', name: 'The Advocate', blurb: 'warmer and more interpersonal — a passionate crusader who actively helps, persuades, and corrects.' },
    ],
  },
  {
    number: 2,
    name: 'The Helper',
    also: 'The Giver',
    center: 'Heart',
    color: '#E8788A',
    hold: 'Warm, caring, and giving — drawn to be loved by becoming indispensable to others.',
    basicFear: 'being unwanted or unworthy of love',
    basicDesire: 'to feel loved and wanted',
    coreMotivation: 'to be loved, to be needed and appreciated, to express their feelings for others',
    description:
      'Twos are empathetic, sincere, and warm-hearted — friendly, generous, and self-sacrificing. They want to be close to others and often do things for people in order to be needed, while struggling to admit their own needs. Beneath the giving is a longing to be loved for who they are, not only for what they do.',
    atBest: 'unconditionally loving and humble — giving for the sheer joy of it, with no strings attached.',
    atWorst: 'possessive and martyr-like — giving to be needed, then feeling unappreciated and resentful.',
    keyTraits: ['warm', 'generous', 'empathetic', 'supportive', 'people-pleasing'],
    growthTo: 4,
    stressTo: 8,
    wings: [
      { neighbor: 1, id: '2w1', name: 'The Servant', blurb: 'more principled and dutiful — gives with conscience, restraint, and a sense of obligation.' },
      { neighbor: 3, id: '2w3', name: 'The Host', blurb: 'more outgoing and ambitious — charming, sociable, and image-aware in the way they care.' },
    ],
  },
  {
    number: 3,
    name: 'The Achiever',
    also: 'The Performer',
    center: 'Heart',
    color: '#E8B84B',
    hold: 'Driven, adaptable, and image-aware — pursuing success and the admiration it brings.',
    basicFear: 'being worthless — without value apart from their achievements',
    basicDesire: 'to feel valuable and worthwhile',
    coreMotivation: 'to be affirmed and admired, to distinguish themselves, to impress',
    description:
      'Threes are self-assured, charming, and ambitious — competent, energetic, and highly driven for advancement. Diplomatic and poised, they are excellent at motivating others, but can become overly concerned with image and what people think of them. Skilled at becoming whatever earns approval, they risk losing touch with their own feelings beneath the role they play.',
    atBest: 'authentic and self-accepting — inspiring others through real substance, not just polish.',
    atWorst: 'image-obsessed and deceptive — chasing success to outrun a private feeling of emptiness.',
    keyTraits: ['driven', 'adaptable', 'efficient', 'ambitious', 'image-conscious'],
    growthTo: 6,
    stressTo: 9,
    wings: [
      { neighbor: 2, id: '3w2', name: 'The Charmer', blurb: 'warmer and more engaging — a charismatic people-person who succeeds through connection.' },
      { neighbor: 4, id: '3w4', name: 'The Professional', blurb: 'more introspective and serious — driven toward excellence with depth and self-awareness.' },
    ],
  },
  {
    number: 4,
    name: 'The Individualist',
    also: 'The Romantic',
    center: 'Heart',
    color: '#9B7EDE',
    hold: 'Sensitive, expressive, and introspective — seeking identity and authentic depth.',
    basicFear: 'having no identity or personal significance',
    basicDesire: 'to find themselves and their significance, to create an identity',
    coreMotivation: 'to express their individuality, to surround themselves with beauty, to be authentically themselves',
    description:
      'Fours are self-aware, sensitive, and reserved — emotionally honest and personal, but prone to moodiness and self-consciousness. Feeling different and somehow defective, they withhold from others and can feel exempt from ordinary life. They long for what is missing and are drawn to beauty, depth, and the bittersweet, turning experience into meaning and art.',
    atBest: 'profoundly creative and self-renewing — transforming pain and longing into beauty and insight.',
    atWorst: 'self-absorbed and melancholic — trapped in envy, longing, and a story of being defective.',
    keyTraits: ['expressive', 'authentic', 'sensitive', 'romantic', 'introspective'],
    growthTo: 1,
    stressTo: 2,
    wings: [
      { neighbor: 3, id: '4w3', name: 'The Aristocrat', blurb: 'more ambitious and social — channels uniqueness into refinement, image, and accomplishment.' },
      { neighbor: 5, id: '4w5', name: 'The Bohemian', blurb: 'more withdrawn and cerebral — an original whose depth turns inward and unconventional.' },
    ],
  },
  {
    number: 5,
    name: 'The Investigator',
    also: 'The Observer',
    center: 'Head',
    color: '#2FA8A0',
    hold: 'Perceptive, cerebral, and private — mastering understanding to feel capable.',
    basicFear: 'being useless, helpless, incapable, or overwhelmed',
    basicDesire: 'to be capable and competent',
    coreMotivation: 'to understand the world, to possess knowledge, to conserve energy and resources',
    description:
      'Fives are alert, insightful, and curious, able to concentrate and develop complex ideas and skills. Independent and innovative, they can become preoccupied with their thoughts, detaching from the world in order to observe it. They guard their time and energy, minimize their needs, and feel most secure when they are knowledgeable and self-sufficient.',
    atBest: 'visionary and original — perceiving the world in a wholly new way and sharing it generously.',
    atWorst: 'isolated and detached — retreating into the mind, hoarding resources, and avoiding life.',
    keyTraits: ['perceptive', 'analytical', 'private', 'independent', 'curious'],
    growthTo: 8,
    stressTo: 7,
    wings: [
      { neighbor: 4, id: '5w4', name: 'The Iconoclast', blurb: 'more creative and emotional — a visionary blending intellect with imaginative intensity.' },
      { neighbor: 6, id: '5w6', name: 'The Problem Solver', blurb: 'more practical and loyal — an analytical builder focused on systems and reliability.' },
    ],
  },
  {
    number: 6,
    name: 'The Loyalist',
    also: 'The Skeptic',
    center: 'Head',
    color: '#6C7BD1',
    hold: 'Committed, vigilant, and questioning — seeking security, support, and certainty.',
    basicFear: 'being without support or guidance, unable to survive on their own',
    basicDesire: 'to have security and support',
    coreMotivation: 'to feel supported and certain, to have allies, to test the reliability of others',
    description:
      'Sixes are reliable, hard-working, and responsible, but also vigilant and anxious — running on stress while complaining about it. Deeply loyal to the people and beliefs they trust, they are gifted troubleshooters who foresee problems. Scanning constantly for danger, they can be wary of authority yet yearn for something dependable to believe in.',
    atBest: 'courageous and grounded — a steadfast, trustworthy ally who meets fear with faith.',
    atWorst: 'anxious and suspicious — reactive and spinning in doubt and worst-case scenarios.',
    keyTraits: ['loyal', 'responsible', 'vigilant', 'questioning', 'committed'],
    growthTo: 9,
    stressTo: 3,
    wings: [
      { neighbor: 5, id: '6w5', name: 'The Defender', blurb: 'more independent and intellectual — a serious, self-reliant guardian who leans on expertise.' },
      { neighbor: 7, id: '6w7', name: 'The Buddy', blurb: 'more outgoing and playful — a warm, engaging loyalist who lightens fear with humor.' },
    ],
  },
  {
    number: 7,
    name: 'The Enthusiast',
    also: 'The Epicure',
    center: 'Head',
    color: '#F2933C',
    hold: 'Spontaneous, versatile, and upbeat — chasing experience to stay free of pain.',
    basicFear: 'being deprived or trapped in pain and limitation',
    basicDesire: 'to be satisfied and content, to have their needs fulfilled',
    coreMotivation: 'to keep themselves happy and free, excited and occupied, and to avoid pain',
    description:
      'Sevens are extroverted, optimistic, versatile, and spontaneous — playful, high-spirited, and always pursuing novelty and adventure. In constant search of stimulation, they keep their options open and can become scattered and over-extended. Quick thinkers who reframe pain into possibility, they fear being trapped in discomfort more than almost anything.',
    atBest: 'joyful and deeply grateful — finding wonder and contentment in the present moment.',
    atWorst: 'scattered and escapist — impulsive and undisciplined, fleeing pain into endless distraction.',
    keyTraits: ['spontaneous', 'enthusiastic', 'versatile', 'optimistic', 'adventurous'],
    growthTo: 5,
    stressTo: 1,
    wings: [
      { neighbor: 6, id: '7w6', name: 'The Entertainer', blurb: 'more loyal and relatable — a fun, endearing optimist who values people and connection.' },
      { neighbor: 8, id: '7w8', name: 'The Realist', blurb: 'more assertive and grounded — a bold go-getter who pursues experience with drive.' },
    ],
  },
  {
    number: 8,
    name: 'The Challenger',
    also: 'The Protector',
    center: 'Gut',
    color: '#CB3B3B',
    hold: 'Powerful, decisive, and protective — taking charge to stay strong and uncontrolled.',
    basicFear: 'being harmed, controlled, or violated by others',
    basicDesire: 'to protect themselves and be in control of their own life and destiny',
    coreMotivation: 'to be self-reliant, to prove their strength, to resist weakness, to stay in control',
    description:
      'Eights are self-confident, strong, and assertive — protective, resourceful, and decisive, but also willful and confrontational. They want to be independent and refuse to be vulnerable or controlled. Natural leaders with big energy, they use their power to champion others and guard a surprisingly soft heart fiercely behind a tough exterior.',
    atBest: 'magnanimous and heroic — self-mastering, using their strength to protect and uplift others.',
    atWorst: 'domineering and ruthless — combative and intimidating, equating vulnerability with weakness.',
    keyTraits: ['assertive', 'protective', 'decisive', 'independent', 'intense'],
    growthTo: 2,
    stressTo: 5,
    wings: [
      { neighbor: 7, id: '8w7', name: 'The Maverick', blurb: 'more energetic and enterprising — a charismatic, adventurous, hard-charging powerhouse.' },
      { neighbor: 9, id: '8w9', name: 'The Bear', blurb: 'calmer and more grounded — a steady, quietly formidable protector with a long fuse.' },
    ],
  },
  {
    number: 9,
    name: 'The Peacemaker',
    also: 'The Mediator',
    center: 'Gut',
    color: '#7FA66B',
    hold: 'Receptive, reassuring, and steady — keeping inner and outer peace at all costs.',
    basicFear: 'loss of connection, fragmentation, and conflict',
    basicDesire: 'to have inner stability and peace of mind',
    coreMotivation: 'to create harmony, to avoid conflict and tension, to keep things as they are',
    description:
      'Nines are accepting, trusting, and stable — easygoing, self-effacing, and gifted mediators who see every side and bring people together. To avoid conflict they can be too willing to go along with others and minimize their own presence, becoming complacent and stubborn through quiet resistance. Seeking comfort and harmony, they can lose themselves in the process.',
    atBest: 'deeply present and self-possessed — a healing, unifying presence that is peaceful yet awake.',
    atWorst: 'complacent and self-forgetting — numbing out and stubbornly resisting to avoid all conflict.',
    keyTraits: ['easygoing', 'accepting', 'steady', 'harmonizing', 'patient'],
    growthTo: 3,
    stressTo: 6,
    wings: [
      { neighbor: 8, id: '9w8', name: 'The Referee', blurb: 'more assertive and grounded — a sociable peacemaker with backbone and presence.' },
      { neighbor: 1, id: '9w1', name: 'The Dreamer', blurb: 'more idealistic and orderly — a gentle, principled harmonizer with quiet conviction.' },
    ],
  },
]

export function typeByNumber(n: TypeNumber): EnneaType {
  return TYPES[n - 1]
}

export function centerOf(n: TypeNumber): Center {
  return TYPES[n - 1].center
}
