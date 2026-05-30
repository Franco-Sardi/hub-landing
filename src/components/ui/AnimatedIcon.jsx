import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function AnimatedIcon({ paths, size = 24, strokeWidth = 1.5, className = '', isHovered = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const initialDone = useRef(false)
  const [triggerCount, setTriggerCount] = useState(0)

  useEffect(() => {
    if (inView && !initialDone.current) {
      initialDone.current = true
      setTriggerCount(c => c + 1)
    }
  }, [inView])

  useEffect(() => {
    if (isHovered && initialDone.current) {
      setTriggerCount(c => c + 1)
    }
  }, [isHovered])

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths.map((d, i) => (
        <g key={i}>
          {/* Base siempre visible a baja opacidad */}
          <path d={d} opacity={0.15} />
          {/* Redibuja cuando cambia triggerCount */}
          <motion.path
            key={`${i}-${triggerCount}`}
            d={d}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: triggerCount > 0 ? 1 : 0 }}
            transition={{
              duration: 0.55,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        </g>
      ))}
    </svg>
  )
}
