import { motion } from 'framer-motion'
import type { TypeNumber } from '../data/types'
import { useReducedMotion } from './useReducedMotion'

const C = 100
const R = 92
const TRIANGLE: TypeNumber[] = [9, 3, 6]
const HEXAD: TypeNumber[] = [1, 4, 2, 8, 5, 7]
const pos = (n: number) => {
  const a = ((-90 + (n % 9) * 40) * Math.PI) / 180
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) }
}
const line = (seq: TypeNumber[]) => seq.map((n, i) => `${i === 0 ? 'M' : 'L'} ${pos(n).x} ${pos(n).y}`).join(' ') + ' Z'

/** A large, faint, slowly-rotating Enneagram figure behind everything. */
export default function GeometryBackground() {
  const reduced = useReducedMotion()
  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, display: 'grid', placeItems: 'center', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <motion.svg
        viewBox="0 0 200 200"
        style={{ width: 'min(140vh, 140vw)', height: 'min(140vh, 140vw)', opacity: 0.05 }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 320, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx={C} cy={C} r={R} fill="none" stroke="var(--brass)" strokeWidth={0.4} />
        <path d={line(TRIANGLE)} fill="none" stroke="var(--brass)" strokeWidth={0.3} />
        <path d={line(HEXAD)} fill="none" stroke="var(--brass)" strokeWidth={0.3} />
      </motion.svg>
    </div>
  )
}
