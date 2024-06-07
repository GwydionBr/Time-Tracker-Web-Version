import projects from "../assets/data";

function ProjectOverview(){
  const sessions = projects[0].sessions;
  return(
    <div className="container">
      <div class="projectOverview">
          <h3>Project: {projects[0].name}</h3>
          <h4>Salary: {projects[0].salary}</h4>
          <div className="session">
            <p>{sessions[0].time}</p>
            <p>{sessions[0].earnedMoney} $</p>
          </div>
          <div className="session">
            <p>{sessions[1].time}</p>
            <p>{sessions[1].earnedMoney} $</p>
          </div>
      </div>
    </div>
  )
}

export default ProjectOverview;