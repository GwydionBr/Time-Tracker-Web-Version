import React, {useState, useEffect} from "react";
import displayTime from "../assets/logicFunctions";

function ProjectOverview(){

  const [sessions, setSessions] = useState([]);
   useEffect(() => {
      fetch("http://localhost:3000/read")
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setSessions(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);


  return(
    <div className="container">
      <div className="projectOverview">
          <h3>Project: Project 1</h3>
          <h4>Salary: 26 $</h4>

          {sessions.map(session => (
            <div className="session">
              <p>Time Spent:{displayTime(session.timespent)}</p>
              <p>Money earned: {session.moneyearned} $</p>
              <p>Date: {session.date}</p>
              <p>Time: {session.time}</p>
            </div>
          ))}        
      </div>
    </div>
  )
}

export default ProjectOverview;