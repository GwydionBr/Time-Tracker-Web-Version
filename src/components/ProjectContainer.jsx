import React from "react";
import SessionContainer from "./SessionContainer";
import {DeleteProjectButton} from "./OverviewButtons";
import { AddSessionButton } from "./OverviewButtons";

function ProjectContainer(props){
  const project = props.project;
  const {projectName, projectDescription, projectSalary} = project;

  return(
          <div className="projectContainer">
            <div className="container">
              <p className="projectName">{projectName}</p>
              <DeleteProjectButton id={project.projectId} setProjects={props.setProjects}/>
            </div>
            <p className="projectDescrption">{projectDescription}</p>
            <p className="projectSalary">{projectSalary} $/h</p>
            {project.sessions.map( session => (
              <SessionContainer key={session.id} session={session} setProjects={props.setProjects}/>
            ))}
            <AddSessionButton />
          </div> 
  )
}

export default ProjectContainer;