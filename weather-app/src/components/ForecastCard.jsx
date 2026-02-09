import { motion } from 'framer-motion'
import WeatherIcon from './WeatherIcon'
import TiltCard from './TiltCard'

export default function ForecastCard({ forecast }) {
  if (!forecast || forecast.length === 0) return null

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="rounded-3xl" tiltAmount={4}>
        <div className="relative rounded-3xl p-6 shadow-2xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12]" />

          <div className="relative z-10">
            <h3 className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 px-1">
              5-Day Forecast
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {forecast.map((day, index) => (
                <motion.div
                  key={day.day}
                  className="relative flex flex-col items-center gap-3 py-5 px-2 rounded-2xl hover:bg-white/[0.08] transition-all duration-500 cursor-default group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  {/* Active day indicator */}
                  {index === 0 && (
                    <motion.div
                      className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
                      layoutId="activeDayIndicator"
                    />
                  )}

                  <span className={`text-sm font-semibold transition-colors duration-300 ${
                    index === 0 ? 'text-white/90' : 'text-white/40 group-hover:text-white/70'
                  }`}>
                    {index === 0 ? 'Today' : day.day}
                  </span>

                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="relative"
                  >
                    {/* Glow behind icon on hover */}
                    <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                      <WeatherIcon code={day.icon} size="text-4xl" />
                    </div>
                    <WeatherIcon code={day.icon} size="text-4xl" />
                  </motion.div>

                  <div className="text-center">
                    <span className="text-white font-bold text-xl">{day.temp}°</span>
                  </div>

                  <span className="text-white/25 text-[10px] text-center capitalize leading-tight font-medium">
                    {day.description}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}
