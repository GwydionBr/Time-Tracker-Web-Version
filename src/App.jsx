import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TimerLayout from "./components/TimerLayout";
import ProjectOverview from "./components/ProjectOverview";

function App() {
  // Tracked variables for Timer
  const [isTimerActive, setTimer] = useState(false);
  const [isTimerPaused, setPause] = useState(false);
  const [time, setTime] = useState(0); // Safe time in Seconds

  // Import Data from server
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/read");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Add Session and Update projects
  const addSession = async (name, salary) => {
    const earnedMoney = (time * salary).toFixed(2);
    const projectSalary = salary * 3600;
    const now = new Date();
    const date = `${now.getDate().toString().padStart(2, '0')}:${(now.getMonth() + 1).toString().padStart(2, '0')}:${now.getFullYear()}`;
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    console.log(name, earnedMoney, date, currentTime);

    try {
      const response = await fetch("http://localhost:3000/add", {
        method: "POST",
        body: JSON.stringify({
          projectName: name,
          projectSalary: projectSalary,
          timeSpent: time,
          moneyEarned: earnedMoney,
          date: date,
          time: currentTime,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Start Timer Logic and Handling
  useEffect(() => {
    let timer = null;
    if (isTimerActive) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTimerActive]);

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
      />
      <ProjectOverview projects={projects} />
    </>
  );
}

export default App;
