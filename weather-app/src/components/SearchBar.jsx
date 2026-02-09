import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { WiDaySunny } from 'react-icons/wi'
import { FiSearch, FiMapPin } from 'react-icons/fi'

const popularCities = ['London', 'New York', 'Tokyo', 'Paris', 'Mumbai', 'Sydney']

function MagneticButton({ children, onClick, className, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.92 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)
  const [borderPos, setBorderPos] = useState({ x: 50, y: 50 })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
    }
  }

  const handleQuickSearch = (cityName) => {
    setCity(cityName)
    onSearch(cityName)
  }

  const handleSearchBarMouse = (e) => {
    if (!inputRef.current) return
    const rect = inputRef.current.getBoundingClientRect()
    setBorderPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Logo & Title */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] glass-strong mb-5 shadow-2xl relative overflow-hidden group cursor-pointer"
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {/* Animated ring around icon */}
          <motion.div
            className="absolute inset-0 rounded-[2rem]"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(255,200,50,0.4), transparent, rgba(255,150,50,0.3), transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-[2px] rounded-[calc(2rem-2px)] bg-white/10 backdrop-blur-xl flex items-center justify-center">
            <WiDaySunny className="text-yellow-300 text-6xl drop-shadow-[0_0_20px_rgba(250,204,21,0.5)] group-hover:drop-shadow-[0_0_30px_rgba(250,204,21,0.8)] transition-all" />
          </div>
        </motion.div>

        <motion.h1
          className="text-6xl font-black text-white tracking-tight"
          style={{
            textShadow: '0 0 40px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          Weather
        </motion.h1>
        <motion.p
          className="text-white/50 mt-3 text-lg font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Discover weather around the world
        </motion.p>
      </motion.div>

      {/* Search Form with aurora border */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          ref={inputRef}
          onMouseMove={handleSearchBarMouse}
          className="relative rounded-2xl p-[1px] group"
        >
          {/* Animated gradient border */}
          <div
            className="absolute inset-0 rounded-2xl transition-opacity duration-500"
            style={{
              background: isFocused
                ? `radial-gradient(circle at ${borderPos.x}% ${borderPos.y}%, rgba(139,92,246,0.6), rgba(59,130,246,0.4), rgba(236,72,153,0.3), transparent 70%)`
                : `radial-gradient(circle at ${borderPos.x}% ${borderPos.y}%, rgba(255,255,255,0.2), transparent 60%)`,
              opacity: 1,
            }}
          />

          <motion.div
            className={`relative flex items-center rounded-2xl transition-all duration-500 ${
              isFocused
                ? 'bg-white/[0.12] backdrop-blur-xl shadow-[0_0_60px_rgba(139,92,246,0.15),0_0_30px_rgba(59,130,246,0.1)]'
                : 'bg-white/[0.07] backdrop-blur-xl shadow-xl'
            }`}
            layout
          >
            <motion.div
              animate={isFocused ? { rotate: 90, scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FiSearch className={`absolute left-5 top-1/2 -translate-y-1/2 text-xl transition-colors duration-300 ${
                isFocused ? 'text-purple-300' : 'text-white/30'
              }`} />
            </motion.div>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search any city..."
              className="w-full bg-transparent text-white placeholder-white/25 pl-14 pr-36 py-6 text-lg font-medium outline-none rounded-2xl"
              style={{ caretColor: '#a78bfa' }}
            />
            <motion.button
              type="submit"
              disabled={loading || !city.trim()}
              className="absolute right-3 px-7 py-3.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 hover:from-purple-500/50 hover:to-blue-500/50 disabled:opacity-20 disabled:hover:from-purple-500/30 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white/20 border-t-purple-300 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                'Search'
              )}
            </motion.button>
          </motion.div>
        </div>
      </form>

      {/* Quick Search Cities with magnetic effect */}
      <motion.div
        className="flex flex-wrap justify-center gap-2.5 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {popularCities.map((cityName, index) => (
          <MagneticButton
            key={cityName}
            onClick={() => handleQuickSearch(cityName)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] hover:border-white/20 text-white/60 hover:text-white hover:bg-white/[0.12] text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            <FiMapPin className="text-xs" />
            {cityName}
          </MagneticButton>
        ))}
      </motion.div>
    </motion.div>
  )
}
