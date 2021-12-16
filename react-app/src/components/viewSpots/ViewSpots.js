import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar.js";
import "./ViewSpots.css";
import * as spotStore from "../../store/spot";


function ViewSpots() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spotReducer.allSpots);

//   let allSpotsArr;
  console.log(spots)
//   if (!user) {
//     history.push("/login");
//   }
//   if(spots){
//       allSpotsArr = Object.values(spots)
//       console.log("All spots arr ---->", allSpotsArr)
//   }



  useEffect(() => {
    dispatch(spotStore.thunk_getAllSpots());
  }, [dispatch]);

  return (
    <div>
      <h1>HEY</h1>
      {spots?.map((spot) => (
        <div>
          <p>{spot.name}</p>
          <img src={spot.images[0]?.url} alt="" />
          <ul>
            <li>{"$" + spot.price}</li>
            <li>Hosted by: {spot.User}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ViewSpots;
