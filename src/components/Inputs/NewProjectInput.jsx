import React from "react";

export default function NewProjectInput(props){
  
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