import React from "react";
import SessionContainer from "./SessionContainer";
import {DeleteProjectButton} from "./OverviewButtons";

function ProjectContainer(props){
  const project = props.project;
  const {projectName, projectDescription, projectSalary} = project;

  return(
          <div className="project">
            <DeleteProjectButton id={project.projectId}/>
            <h3>{projectName}</h3>
            <h4>{projectDescription}</h4>
            <h4>{projectSalary} $/h</h4>
            {project.sessions.map( session => (
              <SessionContainer key={session.id} session={session}/>
            ))}
          </div> 
  )
}

export default ProjectContainer;