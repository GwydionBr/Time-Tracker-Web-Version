import ProjectContainer from "./ProjectContainer";
import AddProjectButton  from "./Buttons/AddProjectButton";

function ProjectOverview(props){

  return(
    
    <div className="projectOverview">
      {props.projects.map( project => (
        <ProjectContainer 
          key={project.projectId} project={project} setProjects={props.setProjects}
        />
      ))}
    <AddProjectButton setProjects={props.setProjects}/>
    </div>
  )
}

export default ProjectOverview;