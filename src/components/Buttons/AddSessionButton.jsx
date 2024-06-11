import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Zoom, TextField, Button } from '@mui/material';
import { addSession } from '../ServerComunication';
import PropTypes from 'prop-types';

const iconSize = 30;

export default function AddSessionButton({ projectId, setProjects }) {
  const [isAdding, setIsAdding] = useState(false);
  const [timeSpent, setTimeSpent] = useState('');
  const [earnedMoney, setEarnedMoney] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleAddSession = () => {
    addSession(projectId, timeSpent, earnedMoney, date, time, setProjects);
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <div className="addSessionForm">
        <TextField label="Time spent" type="number" value={timeSpent} onChange={(e) => setTimeSpent(e.target.value)} />
        <TextField label="Earned Money" type="number" value={earnedMoney} onChange={(e) => setEarnedMoney(e.target.value)} />
        <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} value={date} onChange={(e) => setDate(e.target.value)} />
        <TextField label="Time" type="time" InputLabelProps={{ shrink: true }} value={time} onChange={(e) => setTime(e.target.value)} />
        <Button onClick={handleAddSession}>Add Session</Button>
        <Button onClick={() => setIsAdding(false)}>Cancel</Button>
      </div>
    );
  } else {
    return (
      <Zoom in={true}>
        <Fab className="addFab" size="small" style={{ transform: 'scale(0.7)' }} onClick={() => setIsAdding(true)}>
          <AddIcon sx={{ fontSize: iconSize }} />
        </Fab>
      </Zoom>
    );
  }
}

AddSessionButton.propTypes = {
  projectId: PropTypes.number.isRequired,
  setProjects: PropTypes.func.isRequired,
};