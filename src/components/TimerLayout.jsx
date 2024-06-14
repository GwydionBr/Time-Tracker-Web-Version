import React, { useState } from "react";
import PropTypes from "prop-types";
// Importing the Buttons
import StartTimerButton from "./Buttons/StartTimerButton";
import PauseTimerButton from "./Buttons/PauseTimerButton";
import StopTimerButton from "./Buttons/StopTimerButton";
// Importing the Inputs
import StartRadioInput from "./Inputs/StartRadioInput";
import NewProjectInput from "./Inputs/NewProjectInput";
import SelectProjectInput from "./Inputs/SelectProjectInput";
// Importing the Logic Functions
import { displayTime } from "../assets/logicFunctions";

export default function TimerLayout({ projects, isTimerActive, isTimerPaused, time, start, stop, pause, continue: continueTimer, addSession, oldProjectsExisting }) {

  // State to manage new project details
  const [newProjectDetails, setNewProjectDetails] = useState({ name: "", salary: 0, description: "" });
  // State to manage selected project details
  const [selectedProjectDetails, setSelectedProjectDetails] = useState({ name: "", salary: 0, description: "" });
  // State to toggle between new and old project input forms
  const [isProjectNew, setIsProjectNew] = useState(!oldProjectsExisting);

  // Generalized handler for input changes
  const handleInputChange = (event, field) => {
    setNewProjectDetails(prevDetails => ({
      ...prevDetails,
      [field]: event.target.value
    }));
  };

  // Handlers for specific input fields
  const handleProjectChange = event => handleInputChange(event, 'name');
  const handleSalaryChange = event => handleInputChange(event, 'salary');
  const handleDescriptionChange = event => handleInputChange(event, 'description');


  // Function to handle selection of the Project Input Type
  const handleProjectTypeChange = () => {
    if (isProjectNew) {
      setNewProjectDetails({ name: "", salary: 0, description: "" });
    } else {
      const {
        projectName: defaultProjectName,
        projectSalary: defaultProjectSalary,
        projectDescription: defaultProjectDescription
      } = projects[0];
      setSelectedProjectDetails({ name: defaultProjectName, salary: defaultProjectSalary, description: defaultProjectDescription });
    }
  }

  // Function to handle selection of an existing project
  const selectOldProjectName = id => {
    const selectedProject = projects.find(project => project.projectId === id);
    if (selectedProject) {
      setSelectedProjectDetails({
        name: selectedProject.projectName,
        salary: selectedProject.projectSalary,
        description: selectedProject.projectDescription
      });
    }
  };

  // Function to start the timer
const startTimer = () => {
  let projectDetails;
  if (isProjectNew) {
    projectDetails = {
      name: newProjectDetails.name || defaultProjectName,
      salary: newProjectDetails.salary || defaultProjectSalary,
      description: newProjectDetails.description || defaultProjectDescription
    };
  } else  {
    projectDetails = selectedProjectDetails;
  }

  // Set the selected project details with per second salary rate
  setSelectedProjectDetails({
    ...projectDetails,
    salary: projectDetails.salary / 3600 // Convert to per second rate
  });
  // Reset new project details
  setNewProjectDetails({ name: "", salary: 0, description: "" });
  start();
};

  // Function to stop the timer
  const stopTimer = () => {
    addSession(selectedProjectDetails.name, selectedProjectDetails.salary, selectedProjectDetails.description);
    setSelectedProjectDetails({ name: "", salary: 0, description: "" });
    stop();
  };


  // JSX for Timer Layout
  return (
    <div className="container">
      <div className="timerLayout">
        {/* Display active timer information if timer is active or paused */}
        {isTimerActive || isTimerPaused ? (
          <div>
            <h2>{selectedProjectDetails.name} / ${(selectedProjectDetails.salary * 3600).toFixed(2)} $/h</h2>
            <p>{selectedProjectDetails.description}</p>
            <p className="timeDisplay">{displayTime(time)}</p>
            <p>{(selectedProjectDetails.salary * time).toFixed(2)} $</p>
          </div>
        ) : null}

        {/* Display project selection inputs if timer is not active or paused */}
        {!isTimerActive && !isTimerPaused && (
          <>
            {oldProjectsExisting && <StartRadioInput isProjectNew={isProjectNew} setIsProjectNew={setIsProjectNew} handleProjectTypeChange={handleProjectTypeChange}/>}
            {isProjectNew || !oldProjectsExisting ? (
              <NewProjectInput
                timerProject={newProjectDetails.name}
                timerSalary={newProjectDetails.salary}
                timerDescription={newProjectDetails.description}
                handleProjectChange={handleProjectChange}
                handleSalaryChange={handleSalaryChange}
                handleDescriptionChange={handleDescriptionChange}
              />
            )
            :
            <SelectProjectInput projects={projects} selectProjectName={selectOldProjectName} />}
          </>
        )}

        {/* Display appropriate buttons based on timer state */}
        <div className="container">
          {!isTimerActive && !isTimerPaused && <StartTimerButton timerFunction={startTimer} />}
          {isTimerActive && !isTimerPaused && <PauseTimerButton timerFunction={pause} />}
          {!isTimerActive && isTimerPaused && <StartTimerButton timerFunction={continueTimer} />}
          {isTimerActive && <StopTimerButton timerFunction={stopTimer} />}
        </div>
      </div>
    </div>
  );
}



// Prop Types for Timer Layout
TimerLayout.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      projectId: PropTypes.number.isRequired,
      projectName: PropTypes.string.isRequired,
      projectSalary: PropTypes.string.isRequired,
      projectDescription: PropTypes.string
    })
  ).isRequired,
  isTimerActive: PropTypes.bool.isRequired,
  isTimerPaused: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  continue: PropTypes.func.isRequired,
  addSession: PropTypes.func.isRequired
};

