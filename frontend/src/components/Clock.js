import React, { useState, useEffect } from 'react';
import './Clock.css';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className="clock">
      <div className="time-display">
        <span className="time-unit">{hours}</span>
        <span className="separator">:</span>
        <span className="time-unit">{minutes}</span>
        <span className="separator">:</span>
        <span className="time-unit">{seconds}</span>
      </div>
    </div>
  );
}

export default Clock;
