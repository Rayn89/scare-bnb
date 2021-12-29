import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import isEmail from "validator/lib/isEmail";
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
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
      validationErrors.push("Please enter User Name between 5 and 20 characters.")
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

    setErrors(validationErrors)

    if (!validationErrors.length) {
      await dispatch(signUp(username, email, password));
      // if (data) {
      //   setErrors(data)
      // }
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
    <form className="signup-form" onSubmit={onSignUp}>
      <h2 className="signup-header">Please Sign-Up</h2>
      <div className="errors-container">
        <ul className="error-list">
        {errors.map((error, ind) => (
          <li key={ind}>{error}</li>
        ))}
        </ul>
      </div>
      <div className="signup-username">
        {/* <label>User Name</label> */}
        <input
          className="new-spot-input"
          type="text"
          name="username"
          placeholder="User Name"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="signup-email">
        {/* <label>Email</label> */}
        <input
          className="new-spot-input"
          type="text"
          name="email"
          placeholder="Email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="signup-password">
        {/* <label>Password</label> */}
        <input
          className="new-spot-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="signup-username">
        {/* <label>Repeat Password</label> */}
        <input
          className="new-spot-input"
          type="password"
          name="repeat_password"
          placeholder="Confirm Password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className="signup-form-button" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
