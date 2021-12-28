import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
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
      <div>
        {errors.map((error, ind) => (
          <div className="errors" key={ind}>{error}</div>
        ))}
      </div>

      <div className="login-email">
        {/* <label htmlFor="email">Email</label> */}
        <input
          className="new-spot-input"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="login-password">
        {/* <label htmlFor="password">Password</label> */}
        <input
          className="new-spot-input"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div>
        <button
          className="login-form-button"
          onClick={() => {
            setEmail("demo@aa.io");
            setPassword("password");
          }}
          type="submit"
        >
          Login as Guest
        </button>
      </div>
      <div>
        <button className="login-form-button" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
