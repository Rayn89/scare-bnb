import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import NavBar from "../NavBar.js";
import "./SplashPage.css";
// import * as spotStore from "../../store/spot";

function SplashPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spotReducer.allSpots);

  //   let allSpotsArr;
  console.log(spots);
  //   if (!user) {
  //     history.push("/login");
  //   }
  //   if(spots){
  //       allSpotsArr = Object.values(spots)
  //       console.log("All spots arr ---->", allSpotsArr)
  //   }

//   useEffect(() => {
//     dispatch(spotStore.thunk_getAllSpots());
//   }, [dispatch]);

  return (
    <div className="splash-page-container">
      <h1 className="splash-page">HEY</h1>
    </div>
  );
}

export default SplashPage;
