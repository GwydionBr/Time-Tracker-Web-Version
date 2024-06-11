import React from 'react';

export default function StartSelectorInput(props){

  return(
    <div>
      <p>Do you want to create a new Project or use an old one?</p>
      <form className="startForm container" >
        <label className="radioContainer" onClick={props.new}>
          <input type="radio" id="newProject" name="projectSelector" value="new"></input>
          New Project
        </label>
        <label className="radioContainer" onClick={props.old}>
          <input type="radio" id="oldProject" name="projectSelector" value="old" ></input>
          Exisiting Project
        </label>
      </form>
      </div>
  )
}