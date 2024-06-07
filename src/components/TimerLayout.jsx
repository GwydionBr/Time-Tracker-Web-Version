import {useState} from "react";
import {StartButton, PauseButton, ContinueButton, StopButton } from "./TimerButtons";
import TimerInput from "./TimerInput";

function TimerLayout(props){
  const [timerProject, setProject] = useState("");
  const [timerSalary, setSalary] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [projectSalary, setProjectSalary] = useState(0);

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

  // transform Seconds in display Time
  function displayTime(sec){
    let h, m, s = 0;
    s = sec % 60;
    m = ((sec - s)/ 60) % 60;
    h = ((((sec - s)/ 60) - m) / 60) % 100;
    if (h < 10){
      h = "0" + h;
    }
    if (m < 10){
      m = "0" + m;
    }
    if (s < 10){
      s = "0" +s;
    }
    return (h + ":" + m + ":" + s);
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