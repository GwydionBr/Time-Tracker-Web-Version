import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

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
    } catch (err) {
      console.error(err.message);
    }
  };

  return(
    <Zoom in={true}>
      <Fab className="deleteFab">
        <DeleteIcon fontSize="small" onClick={deleteSession}/>
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
    } catch (err) {
      console.error(err.message);
    }
  };

  return(
    <Zoom in={true}>
      <Fab className="deleteFab">
        <DeleteIcon fontSize="small" onClick={deleteProject}/>
      </Fab>
    </Zoom>
  )
}

export {DeleteSessionButton, DeleteProjectButton};