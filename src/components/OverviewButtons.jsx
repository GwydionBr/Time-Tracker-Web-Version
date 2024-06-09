import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

const iconSize = 30;

function DeleteSessionButton(props){
  const id = props.id;
  const deleteSession = async () => {
    try {
      const response = await fetch(`http://localhost:3000/deleteSession/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      props.setProjects(await response.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  return(
    <Zoom in={true}>
      <Fab className="deleteFab" size="small" style={{ transform: 'scale(0.7)' }}>
        <DeleteIcon sx={{ fontSize: iconSize }} onClick={deleteSession}/>
      </Fab>
    </Zoom>
  )
}

function DeleteProjectButton(props){
  const id = props.id;
  const deleteProject = async () => {
    try {
      const response = await fetch(`http://localhost:3000/deleteProject/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      props.setProjects(await response.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  return(
    <Zoom in={true}>
      <Fab className="deleteFab" size="small" style={{ transform: 'scale(0.7)' }}>
        <DeleteIcon sx={{ fontSize: iconSize }} onClick={deleteProject}/>
      </Fab>
    </Zoom>
  )
}

export {DeleteSessionButton, DeleteProjectButton};