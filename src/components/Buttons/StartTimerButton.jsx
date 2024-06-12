import React from 'react';
import PropTypes from "prop-types";
import { Fab, Zoom } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


export default function StartButton({timerFunction}){
  return(
    <Zoom in={true}>
      <Fab className="timerFab">
        <PlayCircleIcon fontSize="large" onClick={timerFunction}/>
      </Fab>
    </Zoom>
  )
}

StartButton.propTypes = {
  timerFunction: PropTypes.func.isRequired
}