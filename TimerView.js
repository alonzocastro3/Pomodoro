import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import beepSound from '../assets/sounds/bbcclocks.mp3'; 

const CountdownTimer = ({ defaultMinutes = 25 }) => {
  const initial = defaultMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(initial);
  const [initialSeconds] = useState(initial);
  const [isRunning, setIsRunning] = useState(false);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          new Audio(beepSound).play();
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  };

  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;

    return [hours, minutes, seconds]
      .map(unit => String(unit).padStart(2, '0'))
      .join(':');
  };

  const handleTimeClick = () => {
    setEditing(true);
    setInputValue(formatTime(secondsLeft));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const [h, m, s] = inputValue.split(':').map(Number);
    const total = (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
    setSecondsLeft(total);
    setEditing(false);
  };

  return (
    <div style={{
      backgroundColor: '#e3eafc',
      padding: '40px',
      textAlign: 'center',
      borderRadius: '20px',
      marginTop: '40px'
    }}>
      {editing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          style={{
            fontSize: '48px',
            textAlign: 'center',
            width: '200px',
            border: 'none',
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '10px'
          }}
        />
      ) : (
        <h1
          onClick={handleTimeClick}
          style={{ fontSize: '64px', cursor: 'pointer', margin: '0' }}
        >
          {formatTime(secondsLeft)}
        </h1>
      )}

      <div style={{ marginTop: '30px' }}>
        <button
          onClick={toggleTimer}
          style={{
            backgroundColor: '#2f56d8',
            border: 'none',
            borderRadius: '999px',
            color: 'white',
            fontSize: '32px',
            padding: '20px 50px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          {isRunning ? '⏸️ Pause' : '▶️ Start'}
        </button>

        <button
          onClick={resetTimer}
          style={{
            backgroundColor: '#2f56d8',
            border: 'none',
            borderRadius: '999px',
            color: 'white',
            fontSize: '32px',
            padding: '20px 50px',
            cursor: 'pointer'
          }}
        >
          🔁 Reset
        </button>
      </div>
    </div>
  );
};

const TimerView = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [duration, setDuration] = useState(25);

  const createTimer = async (e) => {
    e.preventDefault();
    try {
      await API.post('/timers', {
        project_id: parseInt(projectId),
        duration_minutes: parseInt(duration),
        completed: false,
      });
      setDuration(25); // reset form
    } catch (err) {
      console.error('Error creating timer:', err);
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <button onClick={() => navigate('/')} style={{
        marginBottom: '20px',
        backgroundColor: '#ddd',
        border: 'none',
        padding: '10px 16px',
        borderRadius: '8px',
        cursor: 'pointer'
      }}>
        ← Back to Projects
      </button>

      <CountdownTimer defaultMinutes={25} />
    </div>
  );
};

export default TimerView;
