import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginForm.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      console.log(data)
      if(data.length === 1){
        if(data[0].includes("email")){
          setEmailError(data[0])
          setPasswordError("")
        }else{
          setPasswordError(data[0])
          setEmailError("")
        }
      }else{
        if(data[0].includes("email") && data[1].includes("password")){
          setEmailError(data[0])
          setPasswordError(data[1])
        }
      }
      
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-form">
      <h2 className="login-header">Please Log-in</h2>
      <div className="login-email">
        <Box
          component="form"
          onSubmit={onLogin}
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
          // noValidate
          className="login-email"
          autoComplete="off"
        >
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
          type="password"
          value={password}
          onChange={updatePassword}
          id="outlined-error-helper-text"
          label="Password"
          helperText={passwordError}
        />
        }
        <div className="login-demo-buttons">
        <Button style={{
          borderRadius: 10,
          backgroundColor: "#FF385C",
          marginBottom: 20,
          }} 
          className="MUI-login-button" 
          type="submit" variant="contained">Login
        </Button>
        <Button style={{
          borderRadius: 10,
          backgroundColor: "#FF385C",
          marginBottom: 20,
          }}
          className="MUI-login-button" 
          onClick={() => {
                setEmail("demo@aa.io");
                setPassword("password");
              }} 
          type="submit" variant="contained">Login as Guest
        </Button>
        </div>
        </Box>
      </div>
    </div>
  );
};

export default LoginForm;


