import React, {useState, useEffect} from "react";
import displayTime from "../assets/logicFunctions";
import ProjectContainer from "./ProjectContainer";

function ProjectOverview(props){

  return(
    
    <div className="projectOverview">
      {props.projects.map( project => (
        <ProjectContainer 
          key={project.projectId} project={project}
        />
      ))}
    </div>
  )
}

export default ProjectOverview;