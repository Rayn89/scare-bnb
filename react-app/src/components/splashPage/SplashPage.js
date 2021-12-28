import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
// import NavBar from "../NavBar.js";
import "./SplashPage.css";
import * as spotStore from "../../store/spot";

function SplashPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spotReducer.allSpots);

  let randomNum = Math.floor(Math.random() * (4 - 1) + 1);
  
  //   let allSpotsArr;
  console.log(spots);

  useEffect(() => {
    dispatch(spotStore.thunk_getAllSpots());
  }, [dispatch]);

  let spotMap = spots?.map((spot) => spot.id)
  let randomNumber;
  if(spotMap){
    randomNumber = spotMap[Math.floor(Math.random()*spotMap.length)]
  }
  // <button onClick={() => history.push(`/spots/${randomNumber}`)}>
  //   Random
  // </button>;

  return (
    <div className="splash-page-container">
      <div className="splash-page-image-container">
        <div className="splash-page-image">
          <h1 className="splash-page-span">Not sure where to go? Perfect</h1>
          <button
            className="flexible-button"
            onClick={() => history.push(`/spots/${randomNumber}`)}
          >
            <span className="button-text">I'm Flexible</span>
          </button>
        </div>
      </div>
      <div className="splash-page-haunting-container">
        <h1 className="haunting-header">Choose your perfect haunting!</h1>
        <div>
          <ul className="splash-page-haunts">
            <li className="haunter ghoul">
              Ghouls
              <Link
                to={{ pathname: "https://en.wikipedia.org/wiki/Ghoul" }}
                target="_blank"
              >
                <button className="learnmore">Learn More</button>
              </Link>
            </li>
            <li className="haunter spirit">
              Spirits
              <Link
                to={{ pathname: "https://en.wikipedia.org/wiki/Spirit" }}
                target="_blank"
              >
                <button className="learnmore">Learn More</button>
              </Link>
            </li>
            <li className="haunter demon">
              Demons
              <Link
                to={{ pathname: "https://en.wikipedia.org/wiki/Demon" }}
                target="_blank"
              >
                <button className="learnmore">Learn More</button>
              </Link>
            </li>
            <li className="haunter bladefingers">
              Bladefingers
              <Link
                to={{
                  pathname: "https://en.wikipedia.org/wiki/Freddy_Krueger",
                }}
                target="_blank"
              >
                <button className="learnmore">Learn More</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer">
        <p className="footer-name">Raymond Nehring</p>
        <ul className="footer-list">
          <li>
            <Link
              className="links"
              to={{
                pathname:
                  "https://www.linkedin.com/in/raymond-nehring-553ba2206/",
              }}
              target="_blank"
            >
              <i class="fab fa-linkedin"></i>
            </Link>
          </li>
          <li>
            <Link
              className="links"
              to={{
                pathname: "https://github.com/Rayn89",
              }}
              target="_blank"
            >
              <i class="fab fa-github-square"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SplashPage;
