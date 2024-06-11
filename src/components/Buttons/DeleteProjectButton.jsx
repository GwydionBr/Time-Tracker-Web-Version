import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab, Zoom } from '@mui/material';
import { deleteProject } from '../ServerComunication';
import PropTypes from 'prop-types';

const iconSize = 30;


export default function DeleteProjectButton({ id, setProjects }) {
  return (
    <Zoom in={true}>
      <Fab className="deleteFab" size="small" style={{ transform: 'scale(0.7)' }}>
        <DeleteIcon sx={{ fontSize: iconSize }} onClick={() => deleteProject(id, setProjects)} />
      </Fab>
    </Zoom>
  );
}

DeleteProjectButton.propTypes = {
  id: PropTypes.number.isRequired,
  setProjects: PropTypes.func.isRequired,
};