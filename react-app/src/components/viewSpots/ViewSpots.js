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

  let ghoulArray = [];
  let demonArray = [];
  let bladefingersArray = [];
  let spiritArray = [];

  let checkHaunting = (haunting) => {
    Object.keys(haunting).filter(function (key) {
      if(haunting[key] === "Ghoul"){
        ghoulArray.push(haunting)
      }
      if(haunting[key] === "Demon"){
        demonArray.push(haunting)
      };
      if(haunting[key] === "Spirit"){
        spiritArray.push(haunting)
      };
      if(haunting[key] === "Bladefingers"){
        bladefingersArray.push(haunting)
      };
    });
  }

  useEffect(() => {
    dispatch(spotStore.thunk_getAllSpots());
  }, [dispatch]);

  console.log(spots)
  let spotreturn = spots?.map((spot) => checkHaunting(spot))
  console.log(spots)
  console.log("GHOUL", ghoulArray)
  console.log("DEMON", demonArray);

  
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
