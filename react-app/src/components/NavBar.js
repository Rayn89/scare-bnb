import { useSelector } from "react-redux";
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import SignUpFormModal from "./SignUpFormModal";
import "./NavBar.css"

const NavBar = ({isLoaded}) => {
  const user = useSelector((state) => state.session.user)
  let sessionLinks;
  const [changeNavBar, setChangeNavBar] = useState(false)
  const navBarChange = () => {
    if(window.scrollY >= 0.5) {
      setChangeNavBar(true)
    }else{
      setChangeNavBar(false)
    }
  }


  if(!user) {
    sessionLinks = (
      <div className="logged-out-navbar">
          <li>
            <LoginFormModal />
          </li>
          <li>
            <SignUpFormModal />
          </li>
      </div>
    );
  }else{
    sessionLinks = (
      <div className="logged-in-navbar">
        <li className="navbar-host">
          <NavLink
            className={changeNavBar ? "navlinks-change" : "navlinks"}
            to="/spots/new"
          >
            Become a Host
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </div>
    );
  }



  window.addEventListener("scroll", navBarChange);
  return (
    <nav
      className={changeNavBar ? "navbar-container-change" : "navbar-container"}
    >
      <ul className="navbar-ul">
        <div className="navbar-home">
          <li className="home-li">
            <NavLink
              className="navlinks"
              to="/"
              exact={true}
              activeClassName="active"
            >
              <i
                className={changeNavBar ? "fas fa-ghost ghost-after" : "fas fa-ghost"}
              ></i>
              <span
                className={changeNavBar ? "home-title" : "home-title-change"}
              >
                scarebnb
              </span>
            </NavLink>
          </li>
        </div>
        <div className="navbar-browse">
          <li>
            <NavLink
              className={changeNavBar ? "navlinks-change no-blood" : "navlinks blood"}
              to="/spots"
              exact={true}
              activeClassName="active"
            >
              Browse Spots
            </NavLink>
          </li>
        </div>
        <div className="sessionLinks">{sessionLinks}</div>
      </ul>
    </nav>
  );
}

export default NavBar;
