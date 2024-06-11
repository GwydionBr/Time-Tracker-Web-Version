import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Zoom, TextField, Button } from '@mui/material';
import { addProject } from '../ServerComunication';
import PropTypes from 'prop-types';

const iconSize = 30;

export default function AddProjectButton({ setProjects }) {
  const [isAdding, setIsAdding] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectSalary, setProjectSalary] = useState('');

  const handleAddProject = () => {
    addProject(projectName, projectDescription, projectSalary, setProjects);
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <div className="addProjectForm">
        <TextField label="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <TextField label="Project Description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
        <TextField label="Project Salary" type="number" value={projectSalary} onChange={(e) => setProjectSalary(e.target.value)} />
        <Button onClick={handleAddProject}>Add Project</Button>
        <Button onClick={() => setIsAdding(false)}>Cancel</Button>
      </div>
    );
  } else {
    return (
      <Zoom in={true}>
        <Fab className="addFab" size="small" style={{ transform: 'scale(0.7)' }} onClick={() => setIsAdding(true)}>
          <AddIcon sx={{ fontSize: iconSize }} />
        </Fab>
      </Zoom>
    );
  }
}

AddProjectButton.propTypes = {
  setProjects: PropTypes.func.isRequired,
};