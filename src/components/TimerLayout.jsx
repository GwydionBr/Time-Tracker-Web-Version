import React, {useState} from "react";
import {StartButton, PauseButton, ContinueButton, StopButton } from "./TimerButtons";
import {NewProjectInput, StartSelector, SelectProjectInput} from "./TimerInput";
import displayTime from "../assets/logicFunctions";

function TimerLayout(props){
  const defaultProject = props.projects[0];

  const [timerProject, setTimerProject] = useState("");
  const [timerSalary, setTimerSalary] = useState(0);
  const [projectName, setProjectName] = useState();
  const [projectSalary, setProjectSalary] = useState(0);
  const [isProjectNew, setNewProject] = useState(false);
  const [isProjectOld, setOldProject] = useState(false);


  // Handle Input Changes

  function handleProjectChange(event){
    const newValue = event.target.value;
    console.log(newValue);
    setTimerProject(newValue);
  }
  function handleSalaryChange(event){
    const newValue = event.target.value;
    console.log(newValue);
    setTimerSalary(newValue)
  }

  function newProjectSelected(){
    setNewProject(true);
    setOldProject(false);
    setTimerProject("");
  }
  function oldProjectSelected(){
    setNewProject(false);
    setOldProject(true);
  }
  function selectOldProjectName(event){
    const receivedName = event.target.value;
    const selectedProject = props.projects.find((project) => project.projectName === receivedName)
    setTimerProject(selectedProject.projectName);
    setTimerSalary(selectedProject.projectSalary);
  }


  // Additional Timer handling. Mainly for the Layout

  function startTimer(){
    if(timerProject === ""){
      setProjectName(defaultProject.projectName);
    } else {
      setProjectName(timerProject);
    }
    if (timerSalary === 0){
      setProjectSalary(defaultProject.projectSalary / 3600);
    } else {
      setProjectSalary(timerSalary / 3600);
    }
    setTimerProject("");
    setTimerSalary(0);
    props.start();
  }
  function stopTimer(){
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
            timerProject={timerProject} timerSalary={timerSalary}
            handleProjectChange={handleProjectChange} handleSalaryChange={handleSalaryChange}
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