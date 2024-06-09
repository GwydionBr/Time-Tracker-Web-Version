import React from "react";

function StartSelector(props){

  return(
      <form className="startForm" >
        <p>Do you want to create a new Project or use an old one?</p>
        <input type="radio" id="newProject" name="projectSelector" value="new" onClick={props.new}></input>
        <label>New Project</label>
        <input type="radio" id="oldProject" name="projectSelector" value="old" onClick={props.old}></input>
        <label>Exisiting Project</label>
      </form>
  )
}


function NewProjectInput(props){
  
  return(
    <form className="startForm">
      <label>Project Name:</label><br/>
      <input type="text" value={props.timerProject} onChange={props.handleProjectChange} id="project"/><br/>
      <label>Project Description:</label><br/>
      <input type="text" value={props.timerDescription} onChange={props.handleDescriptionChange} id="description"/><br/>
      <label>Payment in $/hour</label><br/>
      <input type="number" value={props.timerSalary} onChange={props.handleSalaryChange} id="salary" step="0.1"/>
    </form>
  )
}

function SelectProjectInput(props){
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



export {NewProjectInput, StartSelector, SelectProjectInput};