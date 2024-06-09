import React, {useState} from "react";
import {StartButton, PauseButton, ContinueButton, StopButton } from "./TimerButtons";
import {NewProjectInput, StartSelector, SelectProjectInput} from "./TimerInput";
import displayTime from "../assets/logicFunctions";

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
  }
  function oldProjectSelected(){
    setNewProject(false);
    setOldProject(true);
  }
  function selectOldProjectName(id){
    const selectedProject = props.projects.find((project) => project.projectId === id)
    setTimerProject(selectedProject.projectName);
    setTimerSalary(selectedProject.projectSalary);
    setTimerDescription(selectedProject.projectDescription);
  }


  // Additional Timer handling. Mainly for the Layout

  function startTimer(){
    timerProject === "" ? setProjectName(defaultProject.projectName) : setProjectName(timerProject);
    timerSalary === 0 ? setProjectSalary(defaultProject.projectSalary / 3600) : setProjectSalary(timerSalary / 3600);
    setProjectDescription(timerDescription);
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