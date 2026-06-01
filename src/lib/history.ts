import type { Result } from '../data/types'
import { typeByNumber } from '../data/enneatypes'

// Locally-saved past results (this browser only). Each completed test is stored with a
// small summary for the list plus the full Result so it can be reopened instantly.
export interface HistoryEntry {
  id: string
  savedAt: number
  core: number
  wingId: string
  tritype: string
  archetype: string
  color: string
  result: Result
}

const KEY = 'ennea.history'
const MAX = 12

export function loadHistory(): HistoryEntry[] {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

function persist(list: HistoryEntry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    /* quota / private mode — ignore */
  }
}

export function saveToHistory(result: Result): HistoryEntry[] {
  const entry: HistoryEntry = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    savedAt: Date.now(),
    core: result.core,
    wingId: result.wing.id,
    tritype: result.tritype.display,
    archetype: result.tritype.archetype.nickname,
    color: typeByNumber(result.core).color,
    result,
  }
  const list = [entry, ...loadHistory()].slice(0, MAX)
  persist(list)
  return list
}

export function deleteFromHistory(id: string): HistoryEntry[] {
  const list = loadHistory().filter((e) => e.id !== id)
  persist(list)
  return list
}
