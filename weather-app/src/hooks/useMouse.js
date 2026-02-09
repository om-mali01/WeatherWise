import { useState, useEffect, useCallback, useRef } from 'react'

export function useMouse() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const prevPos = useRef({ x: 0, y: 0 })
  const frame = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (frame.current) return
    frame.current = requestAnimationFrame(() => {
      const newX = e.clientX
      const newY = e.clientY
      setVelocity({
        x: newX - prevPos.current.x,
        y: newY - prevPos.current.y,
      })
      prevPos.current = { x: newX, y: newY }
      setPosition({ x: newX, y: newY })
      frame.current = null
    })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [handleMouseMove])

  return { position, velocity }
}
