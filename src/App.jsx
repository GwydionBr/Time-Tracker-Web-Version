import Header from "./components/Header";
import TimerLayout from "./components/TimerLayout";
import {useState, useEffect} from "react";


function App() {
  const [isTimerActive, setTimer] = useState(false);
  const [isTimerPaused, setPause] = useState(false);
  const [time, setTime] = useState(0); // Zeit in Sekunden speichern

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

  function startTimer(){
    setTimer(true);
  }

  function pauseTimer(){
    setTimer(false);
    setPause(true);
  }

  function continueTimer(){
    setTimer(true);
    setPause(false);
  }

  function stopTimer(){
    setTimer(false);
    setTime(0);
  }

  return (
    <>
      <Header />
      <TimerLayout 
        start={startTimer}
        pause={pauseTimer}
        continue={continueTimer}
        stop={stopTimer}
        time={time}
        isTimerActive={isTimerActive}
        isTimerPaused={isTimerPaused}
      />
    </>
  )
}

export default App;
