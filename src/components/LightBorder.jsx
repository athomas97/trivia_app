import { useState, useEffect, useRef } from 'react'

function LightBorder() {
  const [isOnPhase, setIsOnPhase] = useState(true)
  const [lightCount, setLightCount] = useState(0)
  const innerRef = useRef(null)

  useEffect(() => {
    const updateLightCount = () => {
      const inner = innerRef.current
      if (!inner) return

      const height = inner.clientHeight
      const style = window.getComputedStyle(inner)
      const gap = parseFloat(style.gap) || parseFloat(style.rowGap) || 0
      const itemHeight = 60
      const count = Math.ceil(height / (itemHeight + gap))

      setLightCount(count)
    }

    updateLightCount()
    window.addEventListener('resize', updateLightCount)
    return () => window.removeEventListener('resize', updateLightCount)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnPhase((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const lights = Array.from({ length: lightCount })

  return (
    <div className="light-border-outer">
      <div className="light-border-inner" ref={innerRef}>
        {lights.map((_, index) => {
          const isOn = (index % 2 === 0) === isOnPhase
          return (
            <div
              key={index}
              className={isOn ? 'circle-light-on' : 'circle-light-off'}
            />
          )
        })}
      </div>
    </div>
  )
}

export default LightBorder