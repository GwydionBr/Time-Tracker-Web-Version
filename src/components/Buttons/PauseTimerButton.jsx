import React from 'react';
import { Fab, Zoom } from '@mui/material';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

export default function PauseButton(props){
  return(
    <Zoom in={true}>
      <Fab className="timerFab">
        <PauseCircleIcon fontSize="large" onClick={props.pause}/>
      </Fab>
    </Zoom>
  )
}