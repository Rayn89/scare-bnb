import { useSelector } from "react-redux";
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginFormModal';

const NavBar = ({isLoaded}) => {
  const user = useSelector((state) => state.session.user)
  let sessionLinks;
  if(!user) {
    sessionLinks = (
      <>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
      </>
    );
  }else{
    sessionLinks = (
      <>
        <li>
          <LogoutButton />
        </li>
        <li>
          <NavLink to="/spots/new">
            Become a Host
          </NavLink>
        </li>
      </>
    );
  }


  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/spots" exact={true} activeClassName="active">
            Browse Spots
          </NavLink>
        </li>
        <li>
          {sessionLinks}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
