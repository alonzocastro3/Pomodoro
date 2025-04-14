import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import TimerView from './components/TimerView'; 



function App() {
  return (
    <Router>
    <div style ={{ padding: '20px'}}>
      <h1>Pomodoro App</h1>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/projects/:projectId/timers" element={<TimerView />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
