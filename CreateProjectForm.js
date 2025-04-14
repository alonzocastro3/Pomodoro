import React, { useState } from 'react';
import API from '../services/api';

const CreateProjectForm = ({ onProjectCreated }) => {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    try {
      const res = await API.post('/projects', { name: projectName });
      onProjectCreated(res.data);
      setProjectName('');
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      <input
        type="text"
        placeholder="Enter project name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        style={{
          padding: '10px 12px',
          fontSize: '14px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '200px'
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 18px',
          fontSize: '14px',
          backgroundColor: '#3366ff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Add
      </button>
    </form>
  );
};

export default CreateProjectForm;
