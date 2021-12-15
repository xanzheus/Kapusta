import React from 'react';
import TextField from '@mui/material/TextField';
import { withStyles } from '@mui/styles';

const StyledTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: `30px`,
        width: 300,
        height: 52,
        background: '#F6F7FB',
        marginBottom: 20,
      },
      '& input': {
        padding: 20,
      },
    },
    '& .MuiOutlinedInput-input': {},
  },
})(TextField);

const Input = ({ label, value, onChange, onBlur, error, helperText, id, name }) => {
  return (
    <div>
      <StyledTextField
        id={id}
        label={label}
        variant="outlined"
        fullWidth
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        error={error}
        helperText={helperText}
      />
    </div>
  );
};

export default Input;
