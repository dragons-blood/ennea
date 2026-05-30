import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import GeometryBackground from './components/GeometryBackground'
import IntroScreen from './features/intro/IntroScreen'
import TestScreen from './features/test/TestScreen'
import ResultScreen from './features/result/ResultScreen'
import { computeResult } from './lib/scoring'
import type { Answer, Result } from './data/types'

type Screen = 'intro' | 'test' | 'result'
const KEY = 'ennea.result'

function loadResult(): Result | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Result) : null
  } catch {
    return null
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [result, setResult] = useState<Result | null>(() => loadResult())

  function handleComplete(answers: Record<number, Answer>) {
    const r = computeResult(answers)
    setResult(r)
    try {
      localStorage.setItem(KEY, JSON.stringify(r))
    } catch {
      /* ignore */
    }
    setScreen('result')
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <GeometryBackground />
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(6px)' }} transition={{ duration: 0.5 }}>
            <IntroScreen onBegin={() => setScreen('test')} lastResult={result} onViewLast={() => setScreen('result')} />
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
