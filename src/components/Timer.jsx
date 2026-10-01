import { useEffect, useRef } from 'react'
import useCountdown from '../hooks/useCountdown'

function Timer({ onTimeUp }) {
  const countDownTime = 10
  const { secondsLeft } = useCountdown(countDownTime)
  const timeUpHandled = useRef(false)

  useEffect(() => {
    if (secondsLeft === 0 && !timeUpHandled.current) {
      timeUpHandled.current = true
      onTimeUp()
    }
  }, [secondsLeft, onTimeUp])

  return (
    <div className="timer">
      <div
        className="progress-bar"
        style={{
          width: `${(secondsLeft / countDownTime) * 100}%`,
        }}
      >
        {/* <p>{secondsLeft > 0 ? secondsLeft : 'Time is up!'}</p> */}
      </div>
    </div>
  )
}

export default Timer