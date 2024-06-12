import React from 'react';
import PropTypes from "prop-types";
import { Fab, Zoom } from '@mui/material';
import StopCircleIcon from '@mui/icons-material/StopCircle';

export default function StopButton({timerFunction}){
  return(
    <Zoom in={true}>
      <Fab className="timerFab">
        <StopCircleIcon fontSize="large" onClick={timerFunction}/>
      </Fab>
    </Zoom>
  )
}

StopButton.propTypes = {
  timerFunction: PropTypes.func.isRequired
}