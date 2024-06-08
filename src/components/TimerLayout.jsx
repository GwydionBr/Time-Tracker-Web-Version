import React, {useState} from "react";
import {StartButton, PauseButton, ContinueButton, StopButton } from "./TimerButtons";
import TimerInput from "./TimerInput";
import displayTime from "../assets/logicFunctions";

function TimerLayout(props){

  const [timerProject, setProject] = useState("");
  const [timerSalary, setSalary] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [projectSalary, setProjectSalary] = useState(0);


  // Handle Input Changes

  function handleProjectChange(event){
    const newValue = event.target.value;
    console.log(newValue);
    setProject(newValue);
  }
  function handleSalaryChange(event){
    const newValue = event.target.value;
    console.log(newValue);
    setSalary(newValue)
  }


  // Additional Timer handling. Mainly for the Layout

  function startTimer(){
    setProjectName(timerProject);
    setProject("");
    setSalary("");
    setProjectSalary(timerSalary / 3600)
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
          <h2>{projectName}</h2>
          <p className="timeDisplay">{displayTime(props.time)}</p>
          <p>{(projectSalary * props.time).toFixed(2)} $</p>
        </div>
        :
        null}

        {/* Input Interface */}
        { !props.isTimerActive && !props.isTimerPaused &&
          <TimerInput 
          timerProject={timerProject} timerSalary={timerSalary}
          handleProjectChange={handleProjectChange} handleSalaryChange={handleSalaryChange}
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