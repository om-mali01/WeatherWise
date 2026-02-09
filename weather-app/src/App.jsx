import { AnimatePresence } from 'framer-motion'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import AnimatedBackground from './components/AnimatedBackground'
import ErrorMessage from './components/ErrorMessage'
import LoadingSkeleton from './components/LoadingSkeleton'
import CursorGlow from './components/CursorGlow'
import { useWeather } from './hooks/useWeather'

export default function App() {
  const { weather, forecast, loading, error, fetchWeather } = useWeather()

  return (
    <div className="relative min-h-screen">
      {/* Cursor tracking glow & sparkles */}
      <CursorGlow />

      {/* Dynamic Animated Background */}
      <AnimatedBackground
        weatherMain={weather?.main}
        icon={weather?.icon}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-10 md:py-16">
        <SearchBar onSearch={fetchWeather} loading={loading} />

        <AnimatePresence mode="wait">
          {error && (
            <ErrorMessage message={error} />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {loading && !weather && (
            <LoadingSkeleton />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {weather && !loading && (
            <>
              <WeatherCard weather={weather} />
              <ForecastCard forecast={forecast} />
            </>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-auto pt-16">
          <p className="text-white/15 text-[11px] font-medium text-center tracking-wider">
            Powered by OpenWeatherMap &middot; Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  )
}
