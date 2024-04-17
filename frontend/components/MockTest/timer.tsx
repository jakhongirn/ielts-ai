import React, { useState, useEffect } from 'react';

interface TimerProps {
  duration: number; // duration in minutes
  onTimeUp: () => void; // Callback when time is up
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  // State to keep track of time left in seconds
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    // Exit early when we reach 0
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  // Convert timeLeft to minutes and seconds for display
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <span className='font-bold'>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`} </span> <span>remaining</span>
    </div>
  );
};

export default Timer;
