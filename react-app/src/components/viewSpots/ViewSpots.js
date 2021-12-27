import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar.js";
import "./ViewSpots.css";
import * as spotStore from "../../store/spot";
import MapContainer from "../MapContainer.js";


function ViewSpots() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spotReducer = useSelector((state) => state.spotReducer);
  let spots = spotReducer?.allSpots
  const [spotState, setSpotState] = useState(spots);

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

  // const clickImage = async (spotId) => {
  //   await dispatch(spotStore.thunk_getAllSpots())
  //   await dispatch(spotStore.thunk_getOneSpot(spotId))
  //   .then(history.push(`/spots/${spotId}`))
  // }


  if(!spots){
    dispatch(spotStore.thunk_getAllSpots());
    // setSpotState(spots)
  }


  useEffect(() => {
    dispatch(spotStore.thunk_getAllSpots());
    // dispatch(spotStore.thunk_getOneSpot());
    // setSpotState(spots)
  }, [dispatch]);

  let spotreturn = spots?.map((spot) => checkHaunting(spot));

  return (
    <div className="feed-main-container">
      <div className="feed-buttons">
        <div className="buttons-header">Please choose your haunting:</div>
        <div className="buttons-container">
          <button
            className="button-guy"
            onClick={() => setSpotState(spotReducer?.allSpots)}
          >
            All
          </button>
          <button
            className="button-guy"
            onClick={() => setSpotState(demonArray)}
          >
            <span className="button-haunting-text">Demons</span>
          </button>
          <button
            className="button-guy"
            onClick={() => setSpotState(ghoulArray)}
          >
            Ghouls
          </button>
          <button
            className="button-guy"
            onClick={() => setSpotState(spiritArray)}
          >
            Spirits
          </button>
          <button
            className="button-guy"
            onClick={() => setSpotState(bladefingersArray)}
          >
            Bladefingers
          </button>
        </div>
      </div>
      {/* <MapContainer /> */}
      {spotState &&
        spotState.map((spot, key) => (
          <div className="spot-feed-container" key={key}>
            <img
              className="feed-image"
              onClick={() => history.push(`/spots/${spot.id}`)}
              src={spot.images[0]?.url}
              alt=""
            />
            <div className="spot-details">
              <div>
              <span className="spot-name">{spot.name}</span>
              {/* <ul> */}
                <p><i className="fas fa-star">{spot.reviews.length} review(s)</i></p>
                <p>Haunted by: {spot.haunting}</p>
              {/* </ul> */}
              </div>
              <div className="host-and-price">
                <p>Hosted by: {spot.User}</p>
                <p>{"$" + spot.price}/night</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ViewSpots;
