import React, {useState} from "react";
import SessionContainer from "./SessionContainer";
import DeleteProjectButton from "./Buttons/DeleteProjectButton";
import AddSessionButton  from "./Buttons/AddSessionButton";

// The ProjectContainer component represents a single project container.
function ProjectContainer(props){
  // isHovered is used to track whether the user is hovering over the project container.
  const [isHovered, setIsHovered] = useState(false);
  const project = props.project;
  const {projectName, projectDescription, projectSalary} = project;

  return(
    // onMouseEnter and onMouseLeave are used to update isHovered when the user hovers over the project container or stops hovering.
    <div className="projectContainer"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}>
      <div className="container">
        <p className="projectName">{projectName}</p>
        {/* The DeleteProjectButton is only displayed when the user is hovering over the project container. */}
        { isHovered && <DeleteProjectButton 
          className="delete_button" 
          project_id={project.projectId} 
          setProjects={props.setProjects}/>}
      </div>
      <p className="projectDescrption">{projectDescription}</p>
      <p className="projectSalary">{projectSalary} $/h</p>
      {/* For each session in the project, a SessionContainer component is rendered. */}
      {project.sessions.map( session => (
        <SessionContainer key={session.id} session={session} setProjects={props.setProjects}/>
      ))}
      {/* The AddSessionButton is only displayed when the user is hovering over the project container. */}
      { isHovered && <AddSessionButton 
        setProjects={props.setProjects} 
        projectId={project.projectId}/>}
    </div> 
  )
}

export default ProjectContainer;