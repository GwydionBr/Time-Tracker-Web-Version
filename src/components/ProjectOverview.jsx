import React, {useState, useEffect} from "react";
import displayTime from "../assets/logicFunctions";

function ProjectOverview(props){

  


  return(
    
    <div className="projectOverview">
      {props.projects.map( project => (
        <div>
          <div className="project">
            <h3>{project.projectName}</h3>
            <h4>{project.projectDescription}</h4>
            <h4>{project.projectSalary} $/h</h4>
            {project.sessions.map( session => (
              <div className="session">
               <ul className="sessionList">
                <li>Time Spent: <strong>{session.time_spent}</strong></li>
                <li>Money Earned: <strong>{session.money_earned}</strong></li>
                <li>Date: <strong>{session.date}</strong></li>
                <li>Time: <strong>{session.time}</strong></li>
               </ul>
              </div>
            ))}
          </div> 
        </div>
      ))}
    </div>
  )
}

export default ProjectOverview;