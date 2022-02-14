import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginForm.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
          setPasswordError(null)
        }else{
          setPasswordError(data[0])
          setEmailError(null)
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
    <form className="login-form" onSubmit={onLogin}>
      <h2 className="login-header">Please Log-in</h2>
      {/* <div className="errors-container">
        
          {errors.map((error, ind) => (
            <ul className="errors-list">
              <li className="errors" key={ind}>
                {error}
              </li>
            </ul>
          ))}
      </div> */}

      <div className="login-email">
        {/* <label htmlFor="email">Email</label> */}
        {/* <input
          className="login-form-input"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        /> */}
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >{!emailError ? <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" /> : 
        
        <TextField
          error={errors}
          value={email}
          onChange={updateEmail}
          id="outlined-error-helper-text"
          label="Email"
          helperText={emailError}
        />
        }
        </Box>
      </div>
      <div className="login-password">
        {/* <label htmlFor="password">Password</label> */}
        {/* <input
          className="login-form-input"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        /> */}
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >{!passwordError ? <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" /> : 
        
        <TextField
          error={errors}
          type="password"
          value={password}
          onChange={updatePassword}
          id="outlined-error-helper-text"
          label="Password"
          helperText={passwordError}
        />
        }
        </Box>
      </div>
      <div>
        <button className="login-form-button" type="submit">
          Login
        </button>
      </div>
      <div>
        <button
          className="login-form-button demo-user"
          onClick={() => {
            setEmail("demo@aa.io");
            setPassword("password");
          }}
          type="submit"
        >
          Login as Guest
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
