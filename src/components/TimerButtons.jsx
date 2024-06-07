import React from "react";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleIcon from '@mui/icons-material/PauseCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';

function StartButton(props){
  return(
    <Zoom in={true}>
      <Fab className="customFab">
        <PlayCircleIcon fontSize="large" onClick={props.startTimer}/>
      </Fab>
    </Zoom>
  )
}

function PauseButton(props){
  return(
    <Zoom in={true}>
      <Fab className="customFab">
        <PauseCircleIcon fontSize="large" onClick={props.pause}/>
      </Fab>
    </Zoom>
  )
}

function ContinueButton(props){
  return(
    <Zoom in={true}>
      <Fab className="customFab">
        <PlayCircleIcon fontSize="large" onClick={props.continue}/>
      </Fab>
    </Zoom>
  )
}

function StopButton(props){
  return(
    <Zoom in={true}>
      <Fab className="customFab">
        <StopCircleIcon fontSize="large" onClick={props.stopTimer}/>
      </Fab>
    </Zoom>
  )
}

export {StartButton, PauseButton, ContinueButton, StopButton};