import React from "react";
import { TextField, Box } from "@mui/material";

export default function NewProjectInput(props) {
  return (
    <Box component="form" className="projectInputForm" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
      <TextField
        id="project"
        label="Project Name"
        variant="filled"
        value={props.timerProject}
        onChange={props.handleProjectChange}
        fullWidth
      />
      <TextField
        id="description"
        label="Project Description"
        variant="filled"
        value={props.timerDescription}
        onChange={props.handleDescriptionChange}
        fullWidth
      />
      <TextField
        id="salary"
        label="Payment in $/hour"
        type="number"
        variant="filled"
        value={props.timerSalary}
        onChange={props.handleSalaryChange}
        step="0.1"
        fullWidth
      />
    </Box>
  );
}
