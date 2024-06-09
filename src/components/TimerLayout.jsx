import React, {useState} from "react";
import {StartButton, PauseButton, ContinueButton, StopButton } from "./TimerButtons";
import {NewProjectInput, StartSelector, SelectProjectInput} from "./TimerInput";
import {displayTime} from "../assets/logicFunctions";

function TimerLayout(props){
  const defaultProject = props.projects[0];

  const [timerProject, setTimerProject] = useState("");
  const [timerSalary, setTimerSalary] = useState(0);
  const [timerDescription, setTimerDescription] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectName, setProjectName] = useState();
  const [projectSalary, setProjectSalary] = useState(0);
  const [isProjectNew, setNewProject] = useState(false);
  const [isProjectOld, setOldProject] = useState(false);


  // Handle Input Changes

  function handleProjectChange(event){
    const newValue = event.target.value;
    setTimerProject(newValue);
  }
  function handleSalaryChange(event){
    const newValue = event.target.value;
    setTimerSalary(newValue)
  }
  function handleDescriptionChange(event){
    const newValue = event.target.value;
    setTimerDescription(newValue);
  }

  function newProjectSelected(){
    setNewProject(true);
    setOldProject(false);
    setTimerProject("");
    setTimerDescription("");
  }
  function oldProjectSelected(){
    setNewProject(false);
    setOldProject(true);
    setTimerDescription("");
    setTimerProject("");
  }
  function selectOldProjectName(id){
    const selectedProject = props.projects.find((project) => project.projectId === id)
    setTimerProject(selectedProject.projectName);
    setTimerDescription(selectedProject.projectDescription);
    setTimerSalary(selectedProject.projectSalary);
    setTimerDescription(selectedProject.projectDescription);
  }


  // Additional Timer handling. Mainly for the Layout

  function startTimer(){
    if (timerProject === "" && timerDescription === "") {
      // If both project and description are empty, use default project values
      setProjectName(defaultProject.projectName);
      setProjectSalary(defaultProject.projectSalary / 3600);
      setProjectDescription(defaultProject.projectDescription);
    } else if (timerProject === "") {
      // If only project is empty, use default project name and salary, but leave description empty
      setProjectName(defaultProject.projectName);
      setProjectSalary(defaultProject.projectSalary / 3600);
      setProjectDescription("");
    } else {
      // If project is not empty, use the provided values
      setProjectName(timerProject);
      setProjectSalary(timerSalary / 3600);
      setProjectDescription(timerDescription);
    }
  
    // Reset timer values
    setTimerDescription("");
    setTimerProject("");
    setTimerSalary(0);
    props.start();
  }
  function stopTimer(){
    props.addSession(projectName, projectSalary, projectDescription);
    setProjectName("");
    props.stop();
  }



  return (
    <div className="container">
      <div className="timerLayout">

        {/* Active Timer Interface */}
        { props.isTimerActive || props.isTimerPaused ?
        <div>
          <h2>{projectName} / {projectSalary * 3600} $/h</h2>
          <p>{projectDescription}</p>
          <p className="timeDisplay">{displayTime(props.time)}</p>
          <p>{(projectSalary * props.time).toFixed(2)} $</p>
        </div>
        :
        null}


        {/* Input Interface */}

        { !props.isTimerActive && !props.isTimerPaused && 
          <StartSelector new={newProjectSelected} old={oldProjectSelected}/>
        }
        { !props.isTimerActive && !props.isTimerPaused && isProjectNew &&
          <NewProjectInput 
            timerProject={timerProject} timerSalary={timerSalary} timerDescription={timerDescription}
            handleProjectChange={handleProjectChange} handleSalaryChange={handleSalaryChange} handleDescriptionChange={handleDescriptionChange}
          />}
        { !props.isTimerActive && !props.isTimerPaused && isProjectOld &&
          <SelectProjectInput projects={props.projects} selectProjectName={selectOldProjectName}
          />}


        {/* Timer Buttons */}
        <div className="container">
          {!props.isTimerActive && !props.isTimerPaused && <StartButton startTimer={startTimer}/>}
          {props.isTimerActive &&  !props.isTimerPaused && <PauseButton pause={props.pause}/>}
          {!props.isTimerActive && props.isTimerPaused && <ContinueButton continue={props.continue}/>}
          {props.isTimerActive && <StopButton stopTimer={stopTimer}/>}
        </div> 

      </div>
    </div>
  )
}


export default TimerLayout;