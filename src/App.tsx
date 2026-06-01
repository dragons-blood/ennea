import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import GeometryBackground from './components/GeometryBackground'
import IntroScreen from './features/intro/IntroScreen'
import TestScreen from './features/test/TestScreen'
import ResultScreen from './features/result/ResultScreen'
import { computeResult } from './lib/scoring'
import { deleteFromHistory, loadHistory, saveToHistory, type HistoryEntry } from './lib/history'
import type { Answer, FcPick, Result } from './data/types'

type Screen = 'intro' | 'test' | 'result'

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [result, setResult] = useState<Result | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory())

  function handleComplete(answers: Record<number, Answer>, picks: FcPick[]) {
    const r = computeResult(answers, picks)
    setResult(r)
    setHistory(saveToHistory(r))
    setScreen('result')
    window.scrollTo({ top: 0 })
  }

  function openFromHistory(entry: HistoryEntry) {
    setResult(entry.result)
    setScreen('result')
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <GeometryBackground />
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(6px)' }} transition={{ duration: 0.5 }}>
            <IntroScreen
              onBegin={() => setScreen('test')}
              history={history}
              onOpen={openFromHistory}
              onDelete={(id) => setHistory(deleteFromHistory(id))}
            />
          </motion.div>
        )}
        {screen === 'test' && (
          <motion.div key="test" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <TestScreen onComplete={handleComplete} onExit={() => setScreen('intro')} />
          </motion.div>
        )}
        {screen === 'result' && result && (
          <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <ResultScreen result={result} onRetake={() => setScreen('test')} onHome={() => setScreen('intro')} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
