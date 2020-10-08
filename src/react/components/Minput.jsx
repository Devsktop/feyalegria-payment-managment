/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const StyledInput = withStyles({
  root: {
    display: 'block',
    width: '100%',
    margin: '20px 0',
    '& .MuiInputBase-root': {
      width: '100%'
    },
    '& label': {
      color: '#e32526'
    },
    '&:hover label': {
      color: '#c02f33'
    },
    '& label.Mui-focused': {
      top: '-5px',
      color: '#940206',
      fontSize: '1.2rem'
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#e32526'
    },
    '&:hover .MuiInput-underline:before': {
      borderBottomColor: '#c02f33'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#940206'
    }
  }
})(TextField);

export default function Minput(props) {
  return <StyledInput {...props} />;
}
