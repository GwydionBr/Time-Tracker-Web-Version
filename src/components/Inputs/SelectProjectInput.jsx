import React from "react";


export default function SelectProjectInput(props){
  return(
    <form className="startForm">
      <label>Choose the Project: </label>
      <select name="chooseProject" id="chooseProject">
        {props.projects.map( project => (
          <option key={project.projectId} value={project.projectId} onClick={() => props.selectProjectName(project.projectId)}>{project.projectName}</option>
        ))}
      </select>
    </form>
  )
}

