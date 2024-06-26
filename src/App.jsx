import React, { useState, useEffect } from "react";
import Header from "./components/Header_and_Footer/Header";
import TimerLayout from "./components/TimerLayout";
import ProjectOverview from "./components/ProjectOverview";
import { fetchProjects, addSessionAndProject } from "./assets/ServerComunication";
import { roundToMinutes, displayTime } from "./assets/logicFunctions";

export default function App() {

  // Tracked variables for Server Communication and Projects
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Projects from Server
  useEffect(() => {
    fetchProjects(setProjects, setLoading, setError);
  }, []);

  //Check if other Projects are existing
  const [oldProjectsExisting, setOldProjectsExisting] = useState(false);

  // Check if Projects are existing
  useEffect(() => {
    setOldProjectsExisting(projects.length !== 0);
  }, [projects]);


  // Add Session and Update projects
  const addSession = async (name, salary, description) => {
    // Calculate earned money, project salary, and current date and time
    const earnedMoney = (roundToMinutes(time) * (salary*60)).toFixed(2);
    const projectSalary = salary * 3600;
    const now = new Date();
    const date = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`;
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    // Add the session to the database
    addSessionAndProject(name, description, projectSalary, time, earnedMoney, date, currentTime, setProjects);

  };


  // Tracked variables for Timer
  const [isTimerActive, setTimer] = useState(false);
  const [isTimerPaused, setPause] = useState(false);
  const [time, setTime] = useState(0); // Safe time in Seconds

  // Start Timer Logic and Handling
  useEffect(() => {
    let timer = null;
    if (isTimerActive) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          document.title = displayTime(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(timer);
      document.title = "Time Tracker";
    }

    return () => clearInterval(timer);
  }, [isTimerActive, time]);

  // Timer Functions
  const startTimer = () => setTimer(true);
  const pauseTimer = () => {
    setTimer(false);
    setPause(true);
  };
  const continueTimer = () => {
    setTimer(true);
    setPause(false);
  };
  const stopTimer = () => {
    setTimer(false);
    setTime(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
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
        projects={projects}
        addSession={addSession}
        oldProjectsExisting={oldProjectsExisting}
      />
      <ProjectOverview projects={projects} setProjects={setProjects}/>
    </>
  );
}

