/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const StyledInput = withStyles({
  root: {
    margin: '20px 0',
    '& label': {
      color: '#e32526'
    },
    '&:hover label': {
      color: '#c02f33'
    },
    '& label.Mui-focused': {
      color: '#940206'
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
