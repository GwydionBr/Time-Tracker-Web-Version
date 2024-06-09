import React from "react";

function StartSelector(props){

  return(
    <div>
      <p>Do you want to create a new Project or use an old one?</p>
      <form className="startForm container" >
        <div className="radioContainer" onClick={props.new}>
          <input type="radio" id="newProject" name="projectSelector" value="new"></input>
          <label>New Project</label>
        </div>
        <div className="radioContainer" onClick={props.old}>
          <input type="radio" id="oldProject" name="projectSelector" value="old" ></input>
          <label>Exisiting Project</label>
        </div>
      </form>
      </div>
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