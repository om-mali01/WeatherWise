import {
  WiDaySunny, WiNightClear,
  WiDayCloudy, WiNightAltCloudy,
  WiCloud, WiCloudy,
  WiDayShowers, WiNightAltShowers,
  WiDayRain, WiNightAltRain,
  WiDayThunderstorm, WiNightAltThunderstorm,
  WiDaySnow, WiNightAltSnow,
  WiDayFog, WiNightFog,
} from 'react-icons/wi'

const iconMap = {
  '01d': WiDaySunny,
  '01n': WiNightClear,
  '02d': WiDayCloudy,
  '02n': WiNightAltCloudy,
  '03d': WiCloud,
  '03n': WiCloud,
  '04d': WiCloudy,
  '04n': WiCloudy,
  '09d': WiDayShowers,
  '09n': WiNightAltShowers,
  '10d': WiDayRain,
  '10n': WiNightAltRain,
  '11d': WiDayThunderstorm,
  '11n': WiNightAltThunderstorm,
  '13d': WiDaySnow,
  '13n': WiNightAltSnow,
  '50d': WiDayFog,
  '50n': WiNightFog,
}

const iconColors = {
  '01d': 'text-yellow-300',
  '01n': 'text-blue-200',
  '02d': 'text-yellow-200',
  '02n': 'text-blue-300',
  '03d': 'text-gray-300',
  '03n': 'text-gray-400',
  '04d': 'text-gray-400',
  '04n': 'text-gray-500',
  '09d': 'text-blue-300',
  '09n': 'text-blue-400',
  '10d': 'text-blue-400',
  '10n': 'text-blue-500',
  '11d': 'text-purple-300',
  '11n': 'text-purple-400',
  '13d': 'text-blue-100',
  '13n': 'text-blue-200',
  '50d': 'text-gray-300',
  '50n': 'text-gray-400',
}

export default function WeatherIcon({ code, size = 'text-6xl', className = '' }) {
  const IconComponent = iconMap[code] || WiDaySunny
  const color = iconColors[code] || 'text-yellow-300'

  return (
    <div className={`${color} ${size} ${className} drop-shadow-lg`}>
      <IconComponent />
    </div>
  )
}
