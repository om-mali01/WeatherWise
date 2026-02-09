import { useMemo } from 'react'
import { motion } from 'framer-motion'
import WeatherParticles from './WeatherParticles'

const weatherGradients = {
  Clear: 'from-amber-400 via-orange-500 to-rose-500',
  Clouds: 'from-slate-400 via-slate-500 to-slate-700',
  Rain: 'from-slate-600 via-blue-700 to-slate-800',
  Drizzle: 'from-slate-500 via-blue-600 to-slate-700',
  Thunderstorm: 'from-slate-800 via-purple-900 to-slate-900',
  Snow: 'from-blue-100 via-blue-200 to-slate-300',
  Mist: 'from-slate-400 via-slate-500 to-slate-600',
  Haze: 'from-yellow-400 via-orange-400 to-amber-500',
  Fog: 'from-slate-400 via-slate-500 to-slate-600',
  default: 'from-indigo-500 via-purple-600 to-pink-500',
}

const nightGradients = {
  Clear: 'from-indigo-900 via-blue-900 to-slate-900',
  Clouds: 'from-slate-700 via-slate-800 to-slate-900',
  Rain: 'from-slate-800 via-slate-900 to-black',
  Thunderstorm: 'from-gray-900 via-purple-950 to-black',
  Snow: 'from-slate-700 via-blue-900 to-slate-800',
  default: 'from-slate-800 via-indigo-900 to-slate-900',
}

function FloatingOrb({ className, style, color = 'bg-white/20' }) {
  return (
    <div
      className={`absolute rounded-full opacity-20 blur-3xl ${color} ${className}`}
      style={style}
    />
  )
}

function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{ background: 'rgba(168, 85, 247, 0.2)', top: '20%', left: '10%' }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: 'rgba(59, 130, 246, 0.15)', bottom: '10%', right: '15%' }}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.8, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full blur-[100px]"
        style={{ background: 'rgba(236, 72, 153, 0.12)', top: '50%', left: '50%' }}
        animate={{
          x: [0, 70, -40, 0],
          y: [0, -40, 70, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export default function AnimatedBackground({ weatherMain, icon }) {
  const isNight = icon ? icon.includes('n') : false

  const gradient = useMemo(() => {
    if (isNight) {
      return nightGradients[weatherMain] || nightGradients.default
    }
    return weatherGradients[weatherMain] || weatherGradients.default
  }, [weatherMain, isNight])

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${gradient} bg-animated-gradient transition-all duration-[2000ms]`}>
      {/* Mesh gradient blobs */}
      <MeshGradient />

      {/* Animated floating orbs */}
      <FloatingOrb
        className="w-96 h-96 animate-float"
        color={isNight ? 'bg-blue-400/10' : 'bg-white/15'}
        style={{ top: '10%', left: '5%' }}
      />
      <FloatingOrb
        className="w-72 h-72 animate-float-delay"
        color={isNight ? 'bg-purple-400/10' : 'bg-white/10'}
        style={{ top: '50%', right: '10%' }}
      />
      <FloatingOrb
        className="w-80 h-80 animate-float-slow"
        color={isNight ? 'bg-indigo-400/10' : 'bg-white/10'}
        style={{ bottom: '10%', left: '30%' }}
      />
      <FloatingOrb
        className="w-64 h-64 animate-float"
        color={isNight ? 'bg-cyan-400/5' : 'bg-white/5'}
        style={{ top: '30%', left: '60%' }}
      />

      {/* Weather-specific particle effects */}
      <WeatherParticles weatherMain={weatherMain} />

      {/* Stars for night mode */}
      {isNight && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 70}%`,
                left: `${Math.random() * 100}%`,
                width: Math.random() > 0.8 ? 2 : 1,
                height: Math.random() > 0.8 ? 2 : 1,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeInOut',
              }}
            />
          ))}
          {/* Shooting star */}
          <motion.div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ top: '15%', left: '-5%' }}
            animate={{
              x: [0, window.innerWidth * 0.6],
              y: [0, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 8,
              ease: 'easeOut',
            }}
          >
            <div className="absolute top-0 right-0 w-20 h-px bg-gradient-to-l from-white/80 to-transparent" />
          </motion.div>
        </div>
      )}

      {/* Grid overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
      }} />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
