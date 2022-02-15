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
  // const [moreErrors, setMoreErrors] = useState([])
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
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


    // setMoreErrors(validationErrors)
    setErrors(validationErrors)

    if (!validationErrors.length) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
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
        {errors ? <TextField value={username}
          onChange={updateUsername} fullWidth id="outlined-basic" label="Username" variant="outlined" /> : 
        
        <TextField
          error
          value={username}
          onChange={updateUsername}
          id="outlined-error-helper-text"
          label="Username"
          helperText="Please enter valid username."
        />
        }
        {errors ? <TextField value={email}
          onChange={updateEmail} fullWidth id="outlined-basic" label="Email" variant="outlined" /> : 
        
        <TextField
          error
          value={email}
          onChange={updateEmail}
          id="outlined-error-helper-text"
          label="Email"
          helperText="Valid"
        />
        }
        {errors ? <TextField value={password}
          onChange={updatePassword} fullWidth id="outlined-basic" label="Password" variant="outlined" /> : 
        
        <TextField
          error
          type="password"
          value={password}
          onChange={updatePassword}
          id="outlined-error-helper-text"
          label="Password"
          helperText="Valid"
        />
        }
        {!errors.includes("Password") ? <TextField value={repeatPassword}
          onChange={updateRepeatPassword} fullWidth id="outlined-basic" label="Confirm Password" variant="outlined" /> : 
        
        <TextField
          error
          type="password"
          value={repeatPassword}
          onChange={updateRepeatPassword}
          id="outlined-error-helper-text"
          label="Confirm Password"
          helperText="Please enter valid"
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
        <Button style={{
          borderRadius: 10,
          backgroundColor: "#FF385C",
          marginBottom: 20,
          }}
          className="MUI-login-button" 
          onClick={() => {
                <LoginFormModal />
              }} 
          type="submit" variant="contained">Login as Guest
        </Button>
        </div>
        </Box>
      </div>
    </div>
    // <form className="signup-form" onSubmit={onSignUp}>
    //   <h2 className="signup-header">Please Sign-Up</h2>
    //   <div className="errors-container">
    //     <ul className="error-list">
    //       {errors.map((error, ind) => (
    //         <li key={ind}>{error}</li>
    //       ))}
    //     </ul>
    //   </div>
    //   <div className="signup-username">
    //     <input
    //       className="signup-form-input"
    //       type="text"
    //       name="username"
    //       placeholder="User Name"
    //       onChange={updateUsername}
    //       value={username}
    //     ></input>
    //   </div>
    //   <div className="signup-email">
    //     <input
    //       className="signup-form-input"
    //       type="text"
    //       name="email"
    //       placeholder="Email"
    //       onChange={updateEmail}
    //       value={email}
    //     ></input>
    //   </div>
    //   <div className="signup-password">
    //     <input
    //       className="signup-form-input"
    //       type="password"
    //       name="password"
    //       placeholder="Password"
    //       onChange={updatePassword}
    //       value={password}
    //     ></input>
    //   </div>
    //   <div className="signup-username">
    //     <input
    //       className="signup-form-input"
    //       type="password"
    //       name="repeat_password"
    //       placeholder="Confirm Password"
    //       onChange={updateRepeatPassword}
    //       value={repeatPassword}
    //       required={true}
    //     ></input>
    //   </div>
    //   <button className="signup-form-button" type="submit">
    //     Sign Up
    //   </button>
    // </form>
  );
};

export default SignUpForm;
