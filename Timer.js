import React, {useState, useEffect} from 'react';

const Timer = ({duration = 25}) =>{
    const [secondsLeft, setSecondsLeft] = useState(duration * 60);

    useEffect(() =>{
        const interval = setInterval(() =>{
            setSecondsLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = () => {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };
    return (
        <div>
            <h2>{formatTime()}</h2>
        </div>
    );
};
export default Timer;
