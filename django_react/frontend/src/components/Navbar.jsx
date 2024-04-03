import React, {useState, useEffect} from 'react'

const Navbar = ({onSubmit}) => {
    const [time, setTime] = useState(3600);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(time - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
  return (
    <nav>
        <div>{formatTime(time)} minutes remaining</div>
    </nav>
  )
}

export default Navbar