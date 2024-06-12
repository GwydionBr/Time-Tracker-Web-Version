import React from "react";
import { Fab, Zoom } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircleOutline';


export default function ContinueButton(props){
  return(
    <Zoom in={true}>
      <Fab className="timerFab">
        <PlayCircleIcon fontSize="large" onClick={props.continue}/>
      </Fab>
    </Zoom>
  )
}

