import React from 'react';
import { Fab, Zoom } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


export default function StartButton(props){
  return(
    <Zoom in={true}>
      <Fab className="timerFab">
        <PlayCircleIcon fontSize="large" onClick={props.startTimer}/>
      </Fab>
    </Zoom>
  )
}