import React from 'react';
import PropTypes from 'prop-types';
import { Fab, Zoom } from '@mui/material';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

export default function PauseButton({ timerFunction }) {
  return(
    <Zoom in={true}>
      <Fab className="timerFab">
        <PauseCircleIcon fontSize="large" onClick={timerFunction}/>
      </Fab>
    </Zoom>
  )
}

PauseButton.propTypes = {
  timerFunction: PropTypes.func.isRequired
}