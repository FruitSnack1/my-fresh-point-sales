import React, { useEffect, useState } from 'react'

const Timer = () => {
  const [time, setTime] = useState(10 * 60)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevCount) => {
        if (prevCount == 2) location.reload()
        return prevCount - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const parseTime = () => {
    var minutes = Math.floor(time / 60)
    var seconds = time - minutes * 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
  return (
    <span className='text-secondary h5'>Next refresh in {parseTime()}</span>
  )
}

export default Timer
