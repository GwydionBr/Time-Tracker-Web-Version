import React, {useState, useEffect} from "react";
import {displayTime} from "../assets/logicFunctions";
import ProjectContainer from "./ProjectContainer";
import { AddProjectButton } from "./OverviewButtons";
import { Add } from "@mui/icons-material";

function ProjectOverview(props){

  return(
    
    <div className="projectOverview">
      {props.projects.map( project => (
        <ProjectContainer 
          key={project.projectId} project={project} setProjects={props.setProjects}
        />
      ))}
    <AddProjectButton />
    </div>
  )
}

export default ProjectOverview;