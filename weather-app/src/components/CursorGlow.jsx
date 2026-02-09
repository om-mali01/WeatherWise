import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useMouse } from '../hooks/useMouse'

function Trail({ x, y, delay, size, opacity }) {
  const springX = useSpring(0, { stiffness: 80 - delay * 15, damping: 20 + delay * 3 })
  const springY = useSpring(0, { stiffness: 80 - delay * 15, damping: 20 + delay * 3 })

  useEffect(() => {
    springX.set(x)
    springY.set(y)
  }, [x, y, springX, springY])

  return (
    <motion.div
      className="fixed pointer-events-none z-50 rounded-full"
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(255,255,255,${opacity}) 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

function SparkleParticle({ x, y, id, onComplete }) {
  const angle = Math.random() * Math.PI * 2
  const distance = 30 + Math.random() * 60
  const targetX = x + Math.cos(angle) * distance
  const targetY = y + Math.sin(angle) * distance
  const size = 2 + Math.random() * 4

  return (
    <motion.div
      className="fixed pointer-events-none z-40 rounded-full"
      style={{
        left: 0,
        top: 0,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(255,255,255,0.9), rgba(168,162,255,0.6))`,
        boxShadow: `0 0 ${size * 2}px rgba(168,162,255,0.5)`,
      }}
      initial={{ x, y, opacity: 1, scale: 1 }}
      animate={{
        x: targetX,
        y: targetY,
        opacity: 0,
        scale: 0,
      }}
      transition={{ duration: 0.6 + Math.random() * 0.4, ease: 'easeOut' }}
      onAnimationComplete={() => onComplete(id)}
    />
  )
}

export default function CursorGlow() {
  const { position, velocity } = useMouse()
  const [sparkles, setSparkles] = useState([])
  const sparkleCounter = useRef(0)
  const lastSparkle = useRef(0)

  // Spawn sparkles based on cursor speed
  useEffect(() => {
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2)
    const now = Date.now()

    if (speed > 8 && now - lastSparkle.current > 50) {
      lastSparkle.current = now
      const count = Math.min(Math.floor(speed / 15), 3)

      const newSparkles = Array.from({ length: count }, () => ({
        id: sparkleCounter.current++,
        x: position.x + (Math.random() - 0.5) * 20,
        y: position.y + (Math.random() - 0.5) * 20,
      }))

      setSparkles(prev => [...prev, ...newSparkles].slice(-30))
    }
  }, [position, velocity])

  const removeSparkle = (id) => {
    setSparkles(prev => prev.filter(s => s.id !== id))
  }

  return (
    <>
      {/* Main cursor glow */}
      <Trail x={position.x} y={position.y} delay={0} size={300} opacity={0.06} />

      {/* Inner bright core */}
      <Trail x={position.x} y={position.y} delay={1} size={150} opacity={0.08} />

      {/* Trailing glow - follows with delay */}
      <Trail x={position.x} y={position.y} delay={2} size={200} opacity={0.04} />

      {/* Sparkle particles */}
      {sparkles.map(sparkle => (
        <SparkleParticle
          key={sparkle.id}
          x={sparkle.x}
          y={sparkle.y}
          id={sparkle.id}
          onComplete={removeSparkle}
        />
      ))}
    </>
  )
}
