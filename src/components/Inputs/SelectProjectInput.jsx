import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SelectProjectInput({ projects, selectProjectName }) {
  // Initialize selectedProject with the projectId of the first project, if projects array is not empty
  const [selectedProject, setSelectedProject] = useState(projects.length > 0 ? projects[0].projectId : "");

  const handleChange = (event) => {
    const projectId = event.target.value;
    setSelectedProject(projectId);
    selectProjectName(projectId);
  };

  return (
    <Box sx={{ minWidth: 120 }} className="selectBox">
      <FormControl fullWidth variant="filled">
        <InputLabel id="demo-simple-select-label">Project</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedProject}
          label="Project"
          onChange={handleChange}
        >
          {projects.map((project) => (
            <MenuItem key={project.projectId} value={project.projectId}>
              {project.projectName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

SelectProjectInput.propTypes = {
  projects: PropTypes.array.isRequired,
  selectProjectName: PropTypes.func.isRequired
};
