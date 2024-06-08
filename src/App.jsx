import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import TimerLayout from "./components/TimerLayout";
import ProjectOverview from "./components/ProjectOverview";



function App() {

  // Import Data from server 

  const [projects, setProjects] = useState([]);
  useEffect(() => {
     fetch("http://localhost:3000/read")
        .then((response) => response.json())
        .then((data) => {
           setProjects(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);


  // Tracked variables for Timer

  const [isTimerActive, setTimer] = useState(false);
  const [isTimerPaused, setPause] = useState(false);
  const [time, setTime] = useState(0); // Zeit in Sekunden speichern

  // Start Timer Logic and Handling

  useEffect(() => {
    let timer = null;
    if (isTimerActive) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isTimerActive) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTimerActive]);

  function startT(){
    setTimer(true);
  }
  function pauseT(){
    setTimer(false);
    setPause(true);
  }
  function continueT(){
    setTimer(true);
    setPause(false);
  }
  function stopT(){
    setTimer(false);
    setTime(0);
  }
  // End Timer Logic


  return (
    <>
      <Header />
      <TimerLayout 
        start={startT}
        pause={pauseT}
        continue={continueT}
        stop={stopT}
        time={time}
        isTimerActive={isTimerActive}
        isTimerPaused={isTimerPaused}
        projects={projects}
      />
      <ProjectOverview 
        projects={projects}
      />
    </>
  )
}


export default App;