import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar.js";
import "./ViewSpots.css";
import * as spotStore from "../../store/spot";
import MapContainer from "../MapContainer.js";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";


function ViewSpots() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spotReducer = useSelector((state) => state.spotReducer);
  let spots = spotReducer?.allSpots
  const [spotState, setSpotState] = useState(spots);
  const [isShown, setIsShown] = useState('');
  const [ latt, setLatt] = useState(41)
  const [ long, setLong ] = useState(-89)
  const [ markers, setMarkers ] = useState(["default"])


  Geocode.setApiKey("AIzaSyD_5YtdRpkDxZO39dKy6QVEAaxec3a61Po");
  let checker;

  const position ={
    lat: latt,
    lng: long
  }

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

  const mapStyles = {        
    height: "70vh",
    width: "47vw",
    borderRadius: "10px"
  };

  if(!spots){
    dispatch(spotStore.thunk_getAllSpots());
  }

  useEffect(() => {
    dispatch(spotStore.thunk_getAllSpots());
  }, [dispatch]);

  let spotreturn = spots?.map((spot) => checkHaunting(spot));

  return (
    <section className="background-container">
      <div className="feed-main-container">
        <div className="feed-buttons">
          <div className="buttons-header">Please choose your haunting:</div>
          <div className="buttons-container">
            <button
              className="button-guy"
              onClick={() => setSpotState(spotReducer?.allSpots)}
            >
              All Spots
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
        <div className="map-and-feed">
          <div className="feed-div">
            {spotState &&
              spotState.map((spot, key) => (
                <div
                  className="spot-feed-container"
                  key={key}
                  onMouseEnter={() => setIsShown(spot.id)}
                  onMouseLeave={() => setIsShown("")}
                  onMouseOver={() => {
                       Geocode.fromAddress(
                        `${spot?.address},${spot?.city},${spot?.state}`
                      ).then(
                        (response) => {
                          const { lat, lng } =
                            response.results[0].geometry.location;
                          setLatt(+lat);
                          setLong(+lng);
                        },
                        (error) => {
                          console.error(error);
                        }
                      );
                  }}
                >
                  
                  <img
                    className="feed-image"
                    onClick={() => history.push(`/spots/${spot.id}`)}
                    src={spot.images[0]?.url}
                    alt=""
                  />
                  <div className="spot-details">
                    <div>
                      <span className="spot-name">{spot.name}</span>
                      <p>
                        <span className="review-color">
                          {spot.reviews.length} review(s)
                        </span>
                      </p>
                      <p>Haunted by: {spot.haunting}</p>
                    </div>
                    <div
                      className={
                        isShown == spot.id
                          ? "show-images-true"
                          : "show-images-false"
                      }
                    >
                      <img
                        className="smaller-image1"
                        src={spot?.images[1]?.url}
                        alt=""
                      />
                      <img
                        className="smaller-image2"
                        src={spot?.images[2]?.url}
                        alt=""
                      />
                    </div>
                    <div className="host-and-price">
                      <p>Hosted by: {spot.User}</p>
                      <p>{"$" + spot.price}/night</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="map-div">
            <LoadScript googleMapsApiKey="AIzaSyApQbHfmqkVv0ApEPVVAfWUnRxj45FViF0">
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={{ lat: latt, lng: long }}
              >
                <Marker position={position} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewSpots;
