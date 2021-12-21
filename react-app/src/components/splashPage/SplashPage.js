import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
          <button className="flexible-button" onClick={() => history.push(`/spots/${randomNumber}`)}>
            <span className="button-text">I'm Flexible</span>
          </button>
        </div>
      </div>
      <div className="splash-page-haunting-container">
        <h1 className="haunting-header">Choose your perfect haunting!</h1>
      </div>
    </div>
  );
}

export default SplashPage;
