import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useParams } from "react-router";
// import NavBar from "../navBar/NavBar.js";
import EditSpotModal from "../EditSpotModal"
import * as spotStore from "../../store/spot";
import "./SingleSpot.css";

function SingleSpot() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spotReducer.allSpots)
  const userId = user?.id;

  // const reviews = spot?.reviews
  // console.log(reviews)
  // if(!spot){
  //   history.push('/spots')
  // }

  let spot;
  let spotReviews;
  if(spots){
    spot = spots.filter((spot) => spot["id"] == id)[0];
    spotReviews = spot?.reviews
    console.log(spotReviews)
  }
  
  // if(spot){
  //   const reviews = spot?.reviews;
  //   console.log(reviews);
  // }

  let content;
  if(userId === spot?.userId){
    content = (
      <div className="edit-delete">
        <div>
          <EditSpotModal />
        </div>
        <div>
          <button className="single-spot-button" onClick={() => deleteSpot(id)}>
            <i class="far fa-trash-alt"></i>Delete
          </button>
        </div>
      </div>
    );
  }

  // let reviewPost;
  // if(user) {
  //   reviewPost = ();
  // }

  const deleteSpot = async (id) => {
    await dispatch(spotStore.thunk_deleteSpot({ id }));
    await dispatch(spotStore.thunk_getAllSpots());
    history.push('/spots')
  };


  useEffect(() => {
    dispatch(spotStore.thunk_getAllSpots());
  }, [dispatch, id]);

  return (
    <div className="single-post-container">
      <div className="single-spot-name">{spot?.name}</div>
      <div className="spot-edit-delete">
        <ul className="spot-location">
          <li>{spot?.address} </li>
          <li>{spot?.city},</li>
          <li>{spot?.state}</li>
          <li>{spot?.country}</li>
        </ul>
        <div>{content}</div>
      </div>
      <div className="images-container">
        <div className="main-image-container">
          <img className="main-image" src={spot?.images[0].url} alt="" />
        </div>
        <div className="small-images-container">
          <img
            className="small-image"
            id="little-image-top"
            src={spot?.images[1].url}
            alt=""
          />
          <img
            className="small-image"
            id="little-image-bottom"
            src={spot?.images[2].url}
            alt=""
          />
        </div>
      </div>
      <div className="host-and-price-container">
        <div>Entire house hosted by: {spot?.User}</div>
        <div>Price: ${spot?.price}/night</div>
      </div>
      <div>
        <div>This home is haunted by a: {spot?.haunting}</div>
      </div>
      {spotReviews &&
        spotReviews?.map((spot, key) => (
          <div className="review-container" key={key}>
            <p>{spot?.review}</p>
          </div>
        ))}
    </div>
  );
}

export default SingleSpot;
