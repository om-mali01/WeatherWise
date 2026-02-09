import { useState, useCallback } from 'react'

const API_KEY = import.meta.env.VITE_API_KEY || 'f84a1b89dff8deafd6ee57c416578c02'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
      ])

      const weatherData = await weatherRes.json()
      const forecastData = await forecastRes.json()

      if (weatherData.cod === '404' || weatherData.cod === 404) {
        throw new Error('City not found. Please check the spelling and try again.')
      }

      if (weatherData.cod !== 200) {
        throw new Error(weatherData.message || 'Failed to fetch weather data')
      }

      setWeather({
        city: weatherData.name,
        country: weatherData.sys.country,
        temp: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        tempMin: Math.round(weatherData.main.temp_min),
        tempMax: Math.round(weatherData.main.temp_max),
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        windSpeed: weatherData.wind.speed,
        windDeg: weatherData.wind.deg,
        visibility: weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) : 'N/A',
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        main: weatherData.weather[0].main,
        sunrise: weatherData.sys.sunrise,
        sunset: weatherData.sys.sunset,
        dt: weatherData.dt,
        timezone: weatherData.timezone,
      })

      // Process 5-day forecast (one entry per day at noon)
      if (forecastData.list) {
        const dailyMap = {}
        forecastData.list.forEach(item => {
          const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })
          if (!dailyMap[date]) {
            dailyMap[date] = item
          }
        })
        const dailyForecast = Object.values(dailyMap).slice(0, 5).map(item => ({
          day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: Math.round(item.main.temp),
          tempMin: Math.round(item.main.temp_min),
          tempMax: Math.round(item.main.temp_max),
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          main: item.weather[0].main,
        }))
        setForecast(dailyForecast)
      }

      setError(null)
    } catch (err) {
      setError(err.message)
      setWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return { weather, forecast, loading, error, fetchWeather }
}
