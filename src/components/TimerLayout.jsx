import React, { useState } from "react";
import PropTypes from "prop-types";
// Importing the Buttons
import ContinueTimerButton from "./Buttons/ContinueTimerButton";
import StartTimerButton from "./Buttons/StartTimerButton";
import PauseTimerButton from "./Buttons/PauseTimerButton";
import StopTimerButton from "./Buttons/StopTimerButton";
// Importing the Inputs
import SelectProjectInput from "./Inputs/SelectProjectInput";
import NewProjectInput from "./Inputs/NewProjectInput";
import StartSelectorInput from "./Inputs/StartSelectorInput";
// Importing the Logic Functions
import { displayTime } from "../assets/logicFunctions";

export default function TimerLayout({ projects, isTimerActive, isTimerPaused, time, start, stop, pause, continue: continueTimer, addSession }) {
  const defaultProject = projects[0];

  // State to manage new project details
  const [newProjectDetails, setNewProjectDetails] = useState({ name: "", salary: 0, description: "" });
  // State to manage selected project details
  const [selectedProjectDetails, setSelectedProjectDetails] = useState({ name: "", salary: 0, description: "" });
  // State to toggle between new and old project input forms
  const [isNewProject, setIsNewProject] = useState(false);
  const [isOldProject, setIsOldProject] = useState(false);

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

  // Function to select new project form
  const newProjectSelected = () => {
    setIsNewProject(true);
    setIsOldProject(false);
    setNewProjectDetails({ name: "", salary: 0, description: "" });
  };

  // Function to select old project form
  const oldProjectSelected = () => {
    setIsNewProject(false);
    setIsOldProject(true);
    setNewProjectDetails({ name: "", salary: 0, description: "" });
  };

  // Function to handle selection of an existing project
  const selectOldProjectName = id => {
    const selectedProject = projects.find(project => project.projectId === id);
    console.log(selectedProject);
    console.log(id)
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
  if (isNewProject) {
    projectDetails = {
      name: newProjectDetails.name || defaultProject.projectName,
      salary: newProjectDetails.salary || defaultProject.projectSalary,
      description: newProjectDetails.description || defaultProject.projectDescription
    };
  } else if (isOldProject) {
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
            <StartSelectorInput new={newProjectSelected} old={oldProjectSelected} />
            {isNewProject && (
              <NewProjectInput
                timerProject={newProjectDetails.name}
                timerSalary={newProjectDetails.salary}
                timerDescription={newProjectDetails.description}
                handleProjectChange={handleProjectChange}
                handleSalaryChange={handleSalaryChange}
                handleDescriptionChange={handleDescriptionChange}
              />
            )}
            {isOldProject && <SelectProjectInput projects={projects} selectProjectName={selectOldProjectName} />}
          </>
        )}

        {/* Display appropriate buttons based on timer state */}
        <div className="container">
          {!isTimerActive && !isTimerPaused && <StartTimerButton startTimer={startTimer} />}
          {isTimerActive && !isTimerPaused && <PauseTimerButton pause={pause} />}
          {!isTimerActive && isTimerPaused && <ContinueTimerButton continue={continueTimer} />}
          {isTimerActive && <StopTimerButton stopTimer={stopTimer} />}
        </div>
      </div>
    </div>
  );
}

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

