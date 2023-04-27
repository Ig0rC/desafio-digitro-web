import { useEffect, useState, useCallback } from 'react';


interface Props {
  acceptedCallTime: Date,
  offCallTime?: Date,
}

function Timer({ acceptedCallTime, offCallTime }: Props) {
  const [duration, setDuration] = useState('');

  function formatValue(value: number) {
    if(value < 10) {
      return `0${value}`
    }
    return value;
  }

  const calcTime = useCallback((currentDate: Date, previousDate: Date) => {
    const differenceMilliseconds = currentDate.getTime() - previousDate.getTime();
    const minutes = Math.floor((differenceMilliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((differenceMilliseconds / 1000) % 60);
    
    return `${formatValue(minutes)}:${formatValue(seconds)}`;
  }, [])


  useEffect(() => {
    if(!offCallTime) {
      const idInterval = setInterval(() => {
        const today = new Date();
        const time = calcTime(today, acceptedCallTime)
        setDuration(time)
      }, 1000)
  
      return () => clearInterval(idInterval)
    } else {
      const time = calcTime(offCallTime, acceptedCallTime)
      setDuration(`Duração - ${time}`)
    }
  }, [acceptedCallTime, offCallTime, calcTime]);


  return (
    <div>
      <small>{duration}</small>
    </div>
  )
}

export default Timer;