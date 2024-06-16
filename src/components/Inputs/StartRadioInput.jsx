import * as React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function StartRadioInput({isProjectNew, setIsProjectNew}){
  const handleChange = (event) => {
    setIsProjectNew(event.target.value === 'new');
  };
  
  return(
    <FormControl>
      <FormLabel id="start-radio_button-group">Do you want to create a new Project or use an old one?</FormLabel>
      <RadioGroup
        aria-labelledby="start-radio-button-group"
        name="start-radio-button-group"
        value={isProjectNew ? 'new' : 'old'}
        row
        onChange={handleChange}
      >
      <FormControlLabel  value="new" control={<Radio />} label="New Project"  />
      <FormControlLabel  value="old" control={<Radio />} label="Saved Project"  />
      </RadioGroup>
    </FormControl>
  )
}

StartRadioInput.propTypes = {
  isProjectNew: PropTypes.bool.isRequired,
  setIsProjectNew: PropTypes.func.isRequired,
}