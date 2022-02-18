import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import isEmail from "validator/lib/isEmail";
import "./SignUpForm.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginFormModal from '../LoginFormModal';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatError, setRepeatError] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    let validationErrors = []

    if(!username || username.length < 5 || username.length > 20){
      validationErrors.push("Please enter Username between 5 and 20 characters.")
    }
    if (!isEmail(email)) {
      validationErrors.push(
        "Please enter a valid Email address."
      );
    }
    if (!password || password.length < 8 || password.length > 25) {
      validationErrors.push(
        "Please enter Password between 8 and 25 characters."
      );
    }
    if (password !== repeatPassword) {
      validationErrors.push("Password and Confirm Password must match.")
    }

    validationErrors.includes("Please enter Username between 5 and 20 characters.") ? setUsernameError("Please enter Username between 5 and 20 characters.") : setUsernameError("")
    validationErrors.includes("Please enter a valid Email address.") ? setEmailError("Please enter a valid Email address.") : setEmailError("")
    validationErrors.includes("Please enter Password between 8 and 25 characters.") ? setPasswordError("Please enter Password between 8 and 25 characters.") : setPasswordError("")
    validationErrors.includes("Password and Confirm Password must match.") ? setRepeatError("Password and Confirm Password must match.") : setRepeatError("")
    
    setErrors(validationErrors)

    if (!validationErrors.length) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
        if(data.length === 1){
          if(data[0].includes("username")){
            setUsernameError(data[0])
          }else{
            setEmailError(data[0])
          }
        }else{
          setUsernameError(data[0])
          setEmailError(data[1])
        }
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-form">
      <h2 className="login-header">Please Signup</h2>
      <div className="login-email">
        <Box
          component="form"
          onSubmit={onSignUp}
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
          // noValidate
          className="login-email"
          autoComplete="off"
        >
        {!usernameError ? <TextField value={username}
          onChange={updateUsername} fullWidth id="outlined-basic" label="Username" variant="outlined" /> : 
        
        <TextField
          error
          value={username}
          onChange={updateUsername}
          id="outlined-error-helper-text"
          label="Username"
          helperText={usernameError}
        />
        }
        {!emailError ? <TextField value={email}
          onChange={updateEmail} fullWidth id="outlined-basic" label="Email" variant="outlined" /> : 
        
        <TextField
          error
          value={email}
          onChange={updateEmail}
          id="outlined-error-helper-text"
          label="Email"
          helperText={emailError}
        />
        }
        {!passwordError ? <TextField value={password}
          onChange={updatePassword} type="password" fullWidth id="outlined-basic" label="Password" variant="outlined" /> : 
        
        <TextField
          error
          name="password"
          type="password"
          value={password}
          onChange={updatePassword}
          id="outlined-error-helper-text"
          label="Password"
          helperText={passwordError}
        />
        }
        {!repeatError ? <TextField value={repeatPassword}
          onChange={updateRepeatPassword} type="password" fullWidth id="outlined-basic" label="Confirm Password" variant="outlined" /> : 
        
        <TextField
          error
          name="password"
          type="password"
          value={repeatPassword}
          onChange={updateRepeatPassword}
          id="outlined-error-helper-text"
          label="Confirm Password"
          helperText={repeatError}
        />
        }
        <div className="login-demo-buttons">
        <Button style={{
          borderRadius: 10,
          backgroundColor: "#FF385C",
          marginBottom: 20,
          }} 
          onClick={() => {
                {console.log(errors)}
              }} 
          className="MUI-login-button" 
          type="submit" variant="contained">Signup
        </Button>
        </div>
        </Box>
      </div>
    </div>
  );
};

export default SignUpForm;
