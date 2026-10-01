import { useCallback, useEffect, useState } from 'react'

export default function useCountdown(initialSeconds = 0) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

  const start = useCallback((seconds) => {
    setSecondsLeft(seconds)
  }, [])

  useEffect(() => {
    if (secondsLeft <= 0) {
      return
    }

    const timeoutId = setTimeout(() => {
      setSecondsLeft((currentSeconds) => currentSeconds - 1)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [secondsLeft])

  return {
    secondsLeft,
    start,
  }
}