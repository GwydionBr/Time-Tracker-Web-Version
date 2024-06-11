import React from "react";
import SessionContainer from "./SessionContainer";
import DeleteProjectButton from "./Buttons/DeleteProjectButton";
import AddSessionButton  from "./Buttons/AddSessionButton";

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
            <AddSessionButton setProjects={props.setProjects} projectId={project.projectId}/>
          </div> 
  )
}

export default ProjectContainer;