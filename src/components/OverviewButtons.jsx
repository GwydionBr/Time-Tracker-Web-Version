import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import {deleteSession, deleteProject} from "./ServerComunication";

const iconSize = 30;

function DeleteSessionButton(props){
  const id = props.id;

  // Return the delete button
  return(
    <Zoom in={true}>
      <Fab className="deleteFab" size="small" style={{ transform: 'scale(0.7)' }}>
        <DeleteIcon sx={{ fontSize: iconSize }} onClick={() => deleteSession(id, props.setProjects)}/>
      </Fab>
    </Zoom>
  )
}

function DeleteProjectButton(props){
  const id = props.id;

  // Return the delete button
  return(
    <Zoom in={true}>
      <Fab className="deleteFab" size="small" style={{ transform: 'scale(0.7)' }}>
        <DeleteIcon sx={{ fontSize: iconSize }} onClick={() => deleteProject(id, props.setProjects)}/>
      </Fab>
    </Zoom>
  )
}

function AddProjectButton(props){
  return(
    <Zoom in={true}>
      <Fab className="addFab" size="small" style={{ transform: 'scale(0.7)' }}>
        <AddIcon sx={{ fontSize: iconSize }} />
      </Fab>
    </Zoom>
  )
}

function AddSessionButton(props){
  return(
    <Zoom in={true}>
      <Fab className="addFab" size="small" style={{ transform: 'scale(0.7)' }}>
        <AddIcon sx={{ fontSize: iconSize }} />
      </Fab>
    </Zoom>
  )
}

export {DeleteSessionButton, DeleteProjectButton, AddProjectButton, AddSessionButton};