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
    <div className="feed-main-container">
      {spots?.map((spot, key) => (
        <div className="spot-feed-container" key={key}>
          <img
            
            className="feed-image"
            onClick={() => history.push(`/spots/${spot.id}`)}
            src={spot.images[0]?.url}
            alt=""
          />
          <p>{spot.name}</p>
          <ul>
            <li>{"$" + spot.price}</li>
            <li>Haunted by: {spot.haunting}</li>
            <li>Hosted by: {spot.User}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ViewSpots;
