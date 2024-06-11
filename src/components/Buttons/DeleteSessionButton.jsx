import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab, Zoom } from '@mui/material';
import { deleteSession } from '../ServerComunication';
import PropTypes from 'prop-types';

const iconSize = 30;

export default function DeleteSessionButton({ session_id, setProjects }) {
  return (
    <Zoom in={true}>
      <Fab className="deleteFab" size="small" style={{ transform: 'scale(0.7)' }}>
        <DeleteIcon sx={{ fontSize: iconSize }} onClick={() => deleteSession(session_id, setProjects)} />
      </Fab>
    </Zoom>
  );
}

DeleteSessionButton.propTypes = {
  session_id: PropTypes.number.isRequired,
  setProjects: PropTypes.func.isRequired,
};