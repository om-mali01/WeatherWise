import { useMemo } from 'react'
import { motion } from 'framer-motion'

function RainDrop({ delay, x, duration }) {
  return (
    <motion.div
      className="absolute w-[2px] rounded-full bg-gradient-to-b from-transparent via-blue-300/40 to-blue-400/60"
      style={{ left: `${x}%`, top: '-5%', height: '30px' }}
      animate={{ y: ['0vh', '110vh'] }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    />
  )
}

function SnowFlake({ delay, x, duration, size }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/60"
      style={{ left: `${x}%`, top: '-3%', width: size, height: size }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, Math.random() > 0.5 ? 30 : -30, 0],
        rotate: [0, 360],
      }}
      transition={{
        y: { duration, repeat: Infinity, delay, ease: 'linear' },
        x: { duration: duration * 0.6, repeat: Infinity, delay, ease: 'easeInOut' },
        rotate: { duration: duration * 1.5, repeat: Infinity, delay, ease: 'linear' },
      }}
    />
  )
}

function CloudPuff({ delay, y, duration, size }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/5 blur-2xl"
      style={{ top: `${y}%`, right: '-20%', width: size, height: size * 0.6 }}
      animate={{ x: [0, -(window.innerWidth + 400)] }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    />
  )
}

function SunRay({ angle, delay }) {
  return (
    <motion.div
      className="absolute origin-center"
      style={{
        top: '15%',
        right: '15%',
        width: '3px',
        height: '80px',
        background: 'linear-gradient(to bottom, rgba(255,200,50,0.3), transparent)',
        transform: `rotate(${angle}deg)`,
      }}
      animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.9, 1.1, 0.9] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

function ThunderBolt({ delay }) {
  return (
    <motion.div
      className="absolute bg-yellow-200/80 blur-sm"
      style={{
        top: '10%',
        left: `${20 + Math.random() * 60}%`,
        width: '3px',
        height: '0px',
      }}
      animate={{
        height: ['0px', '200px', '0px'],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 0.15,
        repeat: Infinity,
        delay: delay + Math.random() * 8,
        repeatDelay: 4 + Math.random() * 6,
        ease: 'easeOut',
      }}
    />
  )
}

export default function WeatherParticles({ weatherMain }) {
  const particles = useMemo(() => {
    switch (weatherMain) {
      case 'Rain':
      case 'Drizzle':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(60)].map((_, i) => (
              <RainDrop
                key={i}
                delay={Math.random() * 3}
                x={Math.random() * 100}
                duration={0.6 + Math.random() * 0.6}
              />
            ))}
          </div>
        )

      case 'Snow':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <SnowFlake
                key={i}
                delay={Math.random() * 5}
                x={Math.random() * 100}
                duration={4 + Math.random() * 6}
                size={3 + Math.random() * 6}
              />
            ))}
          </div>
        )

      case 'Clouds':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <CloudPuff
                key={i}
                delay={i * 8}
                y={5 + Math.random() * 30}
                duration={20 + Math.random() * 15}
                size={150 + Math.random() * 200}
              />
            ))}
          </div>
        )

      case 'Clear':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <SunRay key={i} angle={i * 30} delay={i * 0.2} />
            ))}
          </div>
        )

      case 'Thunderstorm':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(60)].map((_, i) => (
              <RainDrop
                key={`rain-${i}`}
                delay={Math.random() * 2}
                x={Math.random() * 100}
                duration={0.4 + Math.random() * 0.4}
              />
            ))}
            {[...Array(3)].map((_, i) => (
              <ThunderBolt key={`bolt-${i}`} delay={i * 3} />
            ))}
          </div>
        )

      default:
        return null
    }
  }, [weatherMain])

  return particles
}
