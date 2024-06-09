import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import {deleteSession, deleteProject} from "./ServerComunication";
import {addProject, addSession} from "./ServerComunication";

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
  const [isAdding, setIsAdding] = React.useState(false);

  if(isAdding){
    return(
      <div className="addProjectForm">
        <input type="text" placeholder="Project Name" id="projectName"/>
        <input type="text" placeholder="Project Description" id="projectDescription"/>
        <input type="number" placeholder="Project Salary" id="projectSalary"/>
        <button onClick={() => {
          addProject(
            document.getElementById("projectName").value,
            document.getElementById("projectDescription").value,
            document.getElementById("projectSalary").value,
            props.setProjects
          )
          setIsAdding(false);
        }}>Add Project</button>
        <button onClick={() => setIsAdding(false)}>Cancel</button>
      </div>
    )
  } else {
  // Return the add button
  return(
    <Zoom in={true}>
      <Fab className="addFab" size="small" style={{ transform: 'scale(0.7)' }} onClick={() => setIsAdding(true)}>
        <AddIcon sx={{ fontSize: iconSize }} />
      </Fab>
    </Zoom>
  )}
}

function AddSessionButton(props){
  const [isAdding, setIsAdding] = React.useState(false);
  if(isAdding){
    return(
      <div className="addSessionForm">
        <input type="number" placeholder="Time spent" id="sessionTimeSpent"/>
        <input type="number" placeholder="Earned Money" id="sessionEarnedMoney"/>
        <input type="date" placeholder="Date" id="sessionDate"/>
        <input type="time" placeholder="Time" id="sessionTime"/>
        <button onClick={() => {
          addSession(
            props.projectId,
            document.getElementById("sessionTimeSpent").value,
            document.getElementById("sessionEarnedMoney").value,
            document.getElementById("sessionDate").value,
            document.getElementById("sessionTime").value,
            props.setProjects
          )
          setIsAdding(false);
        }}>Add Session</button>
        <button onClick={() => setIsAdding(false)}>Cancel</button>
      </div>
    )
  } else {
  return(
    <Zoom in={true}>
      <Fab className="addFab" size="small" style={{ transform: 'scale(0.7)' }} onClick={() => setIsAdding(true)}>
        <AddIcon sx={{ fontSize: iconSize }} />
      </Fab>
    </Zoom>
  )}
}

export {DeleteSessionButton, DeleteProjectButton, AddProjectButton, AddSessionButton};