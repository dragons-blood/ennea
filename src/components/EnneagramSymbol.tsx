import { motion } from 'framer-motion'
import { TYPES, typeByNumber } from '../data/enneatypes'
import type { Result, TypeNumber } from '../data/types'
import { useReducedMotion } from './useReducedMotion'

const C = 100
const R = 78
const TRIANGLE: TypeNumber[] = [9, 3, 6]
const HEXAD: TypeNumber[] = [1, 4, 2, 8, 5, 7]

const GROWTH = '#74cf9e'
const STRESS = '#e0796f'

function pos(n: number) {
  const a = ((-90 + (n % 9) * 40) * Math.PI) / 180
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) }
}
function linePath(seq: TypeNumber[]) {
  return seq.map((n, i) => `${i === 0 ? 'M' : 'L'} ${pos(n).x.toFixed(2)} ${pos(n).y.toFixed(2)}`).join(' ') + ' Z'
}
function arrow(from: TypeNumber, to: TypeNumber) {
  const a = pos(from)
  const b = pos(to)
  // stop a little short of the target so the arrowhead sits cleanly outside the node
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  const ex = b.x - (dx / len) * 9
  const ey = b.y - (dy / len) * 9
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} L ${ex.toFixed(2)} ${ey.toFixed(2)}`
}

interface Props {
  size?: number
  result?: Result | null
  onSelect?: (n: TypeNumber) => void
  animate?: boolean
}

export default function EnneagramSymbol({ size = 360, result = null, onSelect, animate = true }: Props) {
  const reduced = useReducedMotion()
  const anim = animate && !reduced
  const core = result?.core ?? null
  const wingN = result?.wing.neighbor ?? null
  const triSet = new Set<number>(result?.tritype.order ?? [])
  const coreType = core ? typeByNumber(core) : null

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ overflow: 'visible', maxWidth: '100%', display: 'block' }}>
      <defs>
        <filter id="enn-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id="ah-growth" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={GROWTH} />
        </marker>
        <marker id="ah-stress" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={STRESS} />
        </marker>
      </defs>

      <motion.circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke="rgba(200,168,107,0.32)"
        strokeWidth={0.8}
        initial={anim ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.3, ease: 'easeInOut' }}
      />
      <motion.path
        d={linePath(TRIANGLE)}
        fill="none"
        stroke="rgba(200,168,107,0.26)"
        strokeWidth={0.7}
        initial={anim ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.3, delay: anim ? 0.3 : 0, ease: 'easeInOut' }}
      />
      <motion.path
        d={linePath(HEXAD)}
        fill="none"
        stroke="rgba(200,168,107,0.26)"
        strokeWidth={0.7}
        initial={anim ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: anim ? 0.5 : 0, ease: 'easeInOut' }}
      />

      {/* integration (growth) + disintegration (stress) arrows for the core type */}
      {coreType && (
        <>
          <motion.path
            d={arrow(coreType.number, coreType.growthTo)}
            fill="none"
            stroke={GROWTH}
            strokeWidth={1.4}
            markerEnd="url(#ah-growth)"
            initial={anim ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 0.95 }}
            transition={{ duration: 0.9, delay: anim ? 1.5 : 0, ease: 'easeInOut' }}
          />
          <motion.path
            d={arrow(coreType.number, coreType.stressTo)}
            fill="none"
            stroke={STRESS}
            strokeWidth={1.4}
            markerEnd="url(#ah-stress)"
            initial={anim ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 0.9, delay: anim ? 1.7 : 0, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* the nine points */}
      {TYPES.map((t, i) => {
        const p = pos(t.number)
        const isCore = t.number === core
        const inTri = triSet.has(t.number)
        const isWing = t.number === wingN
        const highlighted = result ? isCore || inTri : true
        const r = isCore ? 9 : inTri ? 7 : highlighted ? 6 : 3.6
        const fillOpacity = isCore ? 1 : inTri ? 0.92 : result ? 0.22 : 0.85
        return (
          <motion.g
            key={t.number}
            style={{ cursor: onSelect ? 'pointer' : 'default' }}
            onClick={() => onSelect?.(t.number)}
            role={onSelect ? 'button' : undefined}
            aria-label={`Type ${t.number}, ${t.name}`}
            initial={anim ? { scale: 0, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: anim ? 0.6 + i * 0.06 : 0, duration: 0.5, ease: 'backOut' }}
            whileHover={onSelect ? { scale: 1.18 } : undefined}
          >
            {(isCore || isWing) && (
              <circle cx={p.x} cy={p.y} r={r + 4} fill="none" stroke={t.color} strokeWidth={isCore ? 1.2 : 0.8} strokeDasharray={isWing && !isCore ? '2 2' : undefined} opacity={isCore ? 0.9 : 0.7} />
            )}
            <circle cx={p.x} cy={p.y} r={r} fill={t.color} fillOpacity={fillOpacity} filter={highlighted ? 'url(#enn-glow)' : undefined} />
            <text
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Spectral, serif"
              fontSize={isCore ? 8 : 5.4}
              fontWeight={600}
              fill={highlighted ? '#0d0e16' : 'rgba(236,230,218,0.5)'}
            >
              {t.number}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}
