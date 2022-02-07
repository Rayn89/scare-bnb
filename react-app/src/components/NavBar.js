import { useSelector } from "react-redux";
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import SignUpFormModal from "./SignUpFormModal";
import "./NavBar.css"

const NavBar = ({isLoaded}) => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user)
  const spotReducer = useSelector((state) => state.spotReducer);
  
  const [searchTerm, setSearchTerm] = useState('')
  const [changeNavBar, setChangeNavBar] = useState(false)

  let spots = spotReducer?.allSpots;
  let windowLocation = window.location.href.split("/")[3];

  let sessionLinks;

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
          <i
            onClick={() => history.push(`/spots/search`)}
             className={
              changeNavBar || windowLocation === "spots" ? "fas fa-search change" : "fas fa-search before"
            }
          ></i>
        </li>
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
        <li>
          <i
            onClick={() => history.push(`/spots/search`)}
            className={
              changeNavBar || windowLocation === "spots"
                ? "fas fa-search change"
                : "fas fa-search before"
            }
          ></i>
        </li>
        <li className="navbar-host">
          <NavLink
            className={
              changeNavBar || windowLocation === "spots"
                ? "navlinks-change"
                : "navlinks"
            }
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
      className={
        changeNavBar || windowLocation === "spots"
          ? "navbar-container-change"
          : "navbar-container"
      }
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
                className={
                  changeNavBar || windowLocation === "spots"
                    ? "fas fa-ghost ghost-after"
                    : "fas fa-ghost"
                }
              ></i>
              <span
                className={
                  changeNavBar || windowLocation === "spots"
                    ? "home-title"
                    : "home-title-change"
                }
              >
                scarebnb
              </span>
            </NavLink>
          </li>
        </div>
        <div className="navbar-browse">
          <li>
            <NavLink
              className={
                changeNavBar || windowLocation === "spots"
                  ? "navlinks-change no-blood"
                  : "navlinks blood"
              }
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
