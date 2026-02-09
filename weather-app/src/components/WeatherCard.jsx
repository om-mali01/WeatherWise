import { motion } from 'framer-motion'
import { FiDroplet, FiWind, FiEye, FiSunrise, FiSunset, FiThermometer, FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { WiBarometer } from 'react-icons/wi'
import WeatherIcon from './WeatherIcon'
import TiltCard from './TiltCard'

function formatTime(timestamp, timezone) {
  const date = new Date((timestamp + timezone) * 1000)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  })
}

function getWindDirection(deg) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions[Math.round(deg / 45) % 8]
}

function StatCard({ icon: Icon, label, value, unit, delay = 0, color }) {
  return (
    <TiltCard className="rounded-2xl" tiltAmount={12}>
      <motion.div
        className="glass rounded-2xl p-5 flex flex-col items-center justify-center gap-2.5 hover:bg-white/[0.12] transition-all duration-500 group relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + delay * 0.1 }}
      >
        {/* Subtle glow behind icon */}
        <div className={`absolute top-2 w-12 h-12 rounded-full ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

        <Icon className="text-white/40 text-2xl group-hover:text-white/90 transition-all duration-500 relative z-10" />
        <span className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.15em]">{label}</span>
        <span className="text-white text-xl font-bold relative z-10">
          {value}
          <span className="text-white/40 text-xs font-normal ml-1">{unit}</span>
        </span>
      </motion.div>
    </TiltCard>
  )
}

export default function WeatherCard({ weather }) {
  if (!weather) return null

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mt-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Main Weather Display */}
      <TiltCard className="rounded-3xl" tiltAmount={5}>
        <motion.div
          className="relative rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Card background with animated gradient edge */}
          <div className="absolute inset-0 rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12]" />

          {/* Moving gradient accent */}
          <motion.div
            className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{
              background: weather.main === 'Clear'
                ? 'radial-gradient(circle, rgba(250,204,21,0.5), transparent)'
                : weather.main === 'Rain'
                  ? 'radial-gradient(circle, rgba(59,130,246,0.5), transparent)'
                  : 'radial-gradient(circle, rgba(139,92,246,0.5), transparent)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* City & Country */}
            <motion.div
              className="flex items-center justify-between mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white"
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
                >
                  {weather.city}
                </h2>
                <p className="text-white/40 text-lg font-light mt-1">
                  {weather.country} &middot;{' '}
                  <span className="text-white/60">
                    {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
                  </span>
                </p>
              </div>
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  y: [0, -5, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Icon glow */}
                <div className="absolute inset-0 blur-2xl opacity-30">
                  <WeatherIcon code={weather.icon} size="text-8xl" />
                </div>
                <WeatherIcon code={weather.icon} size="text-8xl" />
              </motion.div>
            </motion.div>

            {/* Temperature */}
            <motion.div
              className="flex items-end gap-4 mt-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                {/* Temp glow */}
                <span className="absolute text-8xl md:text-9xl font-black text-white/5 blur-2xl leading-none tracking-tighter select-none">
                  {weather.temp}°
                </span>
                <span className="text-8xl md:text-9xl font-black text-white leading-none tracking-tighter relative"
                  style={{ textShadow: '0 0 60px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.3)' }}
                >
                  {weather.temp}°
                </span>
              </div>
              <div className="mb-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-white/50 bg-white/[0.06] rounded-full px-3 py-1">
                  <FiThermometer className="text-xs" />
                  <span className="text-xs font-medium">Feels {weather.feelsLike}°</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs">
                  <span className="flex items-center gap-1 text-red-300/80 bg-red-500/10 rounded-full px-2.5 py-1">
                    <FiArrowUp className="text-[10px]" /> {weather.tempMax}°
                  </span>
                  <span className="flex items-center gap-1 text-blue-300/80 bg-blue-500/10 rounded-full px-2.5 py-1">
                    <FiArrowDown className="text-[10px]" /> {weather.tempMin}°
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Sunrise & Sunset Bar */}
            <motion.div
              className="flex items-center justify-between mt-8 px-5 py-4 rounded-2xl bg-white/[0.05] border border-white/[0.06]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <FiSunrise className="text-orange-300 text-lg" />
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-wider font-semibold">Sunrise</p>
                  <p className="text-white font-bold text-sm">{formatTime(weather.sunrise, weather.timezone)}</p>
                </div>
              </div>

              {/* Animated sun arc */}
              <div className="flex-1 mx-6 relative h-8">
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-orange-400/20 via-yellow-300/30 to-indigo-400/20" />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 30" preserveAspectRatio="none">
                  <path
                    d="M0,28 Q100,0 200,28"
                    fill="none"
                    stroke="url(#sunArc)"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    opacity="0.3"
                  />
                  <defs>
                    <linearGradient id="sunArc" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fb923c" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                  </defs>
                </svg>
                <motion.div
                  className="absolute w-2.5 h-2.5 rounded-full bg-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.6)]"
                  style={{ bottom: 2 }}
                  animate={{ left: ['5%', '95%'] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <FiSunset className="text-indigo-300 text-lg" />
                </div>
                <div className="text-right">
                  <p className="text-white/30 text-[10px] uppercase tracking-wider font-semibold">Sunset</p>
                  <p className="text-white font-bold text-sm">{formatTime(weather.sunset, weather.timezone)}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </TiltCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <StatCard icon={FiDroplet} label="Humidity" value={weather.humidity} unit="%" delay={0} color="bg-blue-400" />
        <StatCard icon={FiWind} label="Wind" value={weather.windSpeed} unit={`m/s ${getWindDirection(weather.windDeg)}`} delay={1} color="bg-cyan-400" />
        <StatCard icon={WiBarometer} label="Pressure" value={weather.pressure} unit="hPa" delay={2} color="bg-purple-400" />
        <StatCard icon={FiEye} label="Visibility" value={weather.visibility} unit="km" delay={3} color="bg-green-400" />
      </div>
    </motion.div>
  )
}
