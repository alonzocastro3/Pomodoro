import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import CreateProjectForm from './CreateProjectForm';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    API.get('/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Error fetching projects:', err));
  };

  const addProject = (newProject) => {
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = async (projectId) => {
    try {
      await API.delete(`/projects/${projectId}`);
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      padding: '60px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        padding: '40px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Pomodoro App</h1>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2>Create a New Project</h2>
          <CreateProjectForm onProjectCreated={addProject} />
        </div>

        <h3>Your Projects</h3>
        {projects.length === 0 ? (
          <p>No projects yet. Add one above!</p>
        ) : (
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {projects.map(project => (
              <li
                key={project.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 20px',
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  backgroundColor: '#fefefe'
                }}
              >
                <Link to={`/projects/${project.id}/timers`} style={{
                  textDecoration: 'none',
                  color: '#3366ff',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  {project.name}
                </Link>

                <button
                  onClick={() => deleteProject(project.id)}
                  style={{
                    backgroundColor: '#ff4d4f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
