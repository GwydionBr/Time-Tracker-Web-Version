import React from 'react';
import { Fab, Zoom } from '@mui/material';
import StopCircleIcon from '@mui/icons-material/StopCircle';

export default function StopButton(props){
  return(
    <Zoom in={true}>
      <Fab className="customFab">
        <StopCircleIcon fontSize="large" onClick={props.stopTimer}/>
      </Fab>
    </Zoom>
  )
}