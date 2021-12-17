import { useSelector } from "react-redux";
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import "./NavBar.css"

const NavBar = ({isLoaded}) => {
  const user = useSelector((state) => state.session.user)
  let sessionLinks;
  if(!user) {
    sessionLinks = (
      <div className="logged-out-navbar">
        <li>
          <LoginFormModal />
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
      </div>
    );
  }else{
    sessionLinks = (
      <div className="logged-in-navbar">
        <li>
          <NavLink to="/spots/new">Become a Host</NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </div>
    );
  }


  return (
    <nav className="navbar-container">
      <ul className="navbar-ul">
        <div className="navbar-home">
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li>
        </div>
        <div className="navbar-browse">
          <li>
            <NavLink to="/spots" exact={true} activeClassName="active">
              Browse Spots
            </NavLink>
          </li>
        </div>
        <li className="sessionLinks">{sessionLinks}</li>
      </ul>
    </nav>
  );
}

export default NavBar;
