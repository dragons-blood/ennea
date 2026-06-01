import type { TypeNumber } from './types'

// Callings — fields and roles each type tends to gravitate toward and thrive in. Type never
// dictates a career (every type appears in every field), but the work that fits your core
// motivation tends to energize rather than drain you. `paths` are illustrative, not a ceiling.

export interface Careers {
  paths: string[]
  note: string
}

export const CAREERS: Record<TypeNumber, Careers> = {
  1: {
    paths: ['Judge / lawyer', 'Editor', 'Teacher / professor', 'Quality & standards', 'Surgeon', 'Auditor / accountant', 'Engineer', 'Reformer / activist', 'Craftsperson'],
    note: 'Work where precision, integrity, and improving a flawed system are the whole point — not a side task. They shine where “done right” is measurable.',
  },
  2: {
    paths: ['Nurse / caregiver', 'Counselor / therapist', 'Teacher', 'Social work', 'Hospitality', 'Human resources', 'Ministry', 'Customer success', 'Fundraising'],
    note: 'Relationship-centred roles where warmth is the work and they can see the difference they make — provided they guard against giving past their own limits.',
  },
  3: {
    paths: ['Entrepreneur / CEO', 'Sales', 'Marketing & branding', 'Law', 'Finance', 'Athletics', 'Entertainment', 'Politics', 'Consulting'],
    note: 'Goal-driven, visible, results-rewarded arenas where they can win — best when the goal is something they genuinely value, not just applause.',
  },
  4: {
    paths: ['Artist / writer', 'Musician', 'Actor', 'Designer', 'Filmmaker', 'Therapist', 'Photographer', 'Curator', 'Creative founder'],
    note: 'Work that lets them express a singular vision and bring emotional depth. They wither in the generic and bloom where authenticity is the point.',
  },
  5: {
    paths: ['Researcher / scientist', 'Engineer', 'Software / data', 'Professor', 'Analyst', 'Philosopher / writer', 'Inventor', 'Strategist', 'Archivist'],
    note: 'Roles that reward deep expertise and independent thought, with room to go far down the rabbit hole — and minimal forced socializing.',
  },
  6: {
    paths: ['Law / law enforcement', 'Medicine & nursing', 'Teaching', 'Civil service', 'IT & security', 'Project management', 'Journalism', 'Skilled trades', 'Risk & compliance'],
    note: 'Team-oriented, mission-driven work with clear structures and a cause worth defending — they excel at spotting what could go wrong and shoring it up.',
  },
  7: {
    paths: ['Entrepreneur', 'Travel & hospitality', 'Marketing / advertising', 'Journalism', 'Food & wine', 'Event production', 'Comedy / entertainment', 'Design & innovation', 'Startups'],
    note: 'Variety-rich, fast-moving, idea-generating work that resists routine. They shine at launching and connecting, less at the long maintenance tail.',
  },
  8: {
    paths: ['Founder / CEO', 'Trial lawyer', 'Military / police leadership', 'Surgeon', 'Politics', 'Dealmaking & finance', 'Construction', 'Activism', 'Crisis management'],
    note: 'High-stakes, high-autonomy arenas where decisiveness moves things. They need to lead rather than be micromanaged — and to fight for something larger than themselves.',
  },
  9: {
    paths: ['Counselor / mediator', 'Diplomat / HR', 'Teaching', 'Ministry', 'Healthcare', 'Veterinary', 'Editing', 'Design', 'Nonprofit'],
    note: 'Calm, cooperative settings where they bridge differences and steady the room — best when the role nudges them to assert their own voice, not just absorb everyone else’s.',
  },
}
