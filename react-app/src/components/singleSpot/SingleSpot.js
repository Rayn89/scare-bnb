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
  const [review, setReview] = useState('');
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

  const postReview = async (spotId) => {
    if (review) {
      await dispatch(spotStore.thunk_postReview({ review, userId, spotId }));
      await dispatch(spotStore.thunk_getAllSpots());
    }
    setReview("");
  };

  const deleteSpot = async (id) => {
    await dispatch(spotStore.thunk_deleteSpot({ id }));
    await dispatch(spotStore.thunk_getAllSpots());
    history.push('/spots')
  };

  const editReview = async (reviewId) => {
    await dispatch(spotStore.thunk_editReview({id}))
    await dispatch(spotStore.thunk_getAllSpots());
  }

  const deleteReview = async (reviewId) => {
    await dispatch(spotStore.thunk_deleteReview({reviewId}))
    await dispatch(spotStore.thunk_getAllSpots());
  }


  useEffect(() => {
    dispatch(spotStore.thunk_getAllSpots());
  }, [dispatch, id]);

  return (
    <div className="single-post-container">
      <div className="single-spot-name">{spot?.name}</div>
      <div className="review-count">
        <i class="fas fa-star">{spot?.reviews.length} reviews</i>
      </div>
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
        <div className="host-spot-small">Entire house hosted by: {spot?.User}</div>
        <div className="spot-price">Price: ${spot?.price}/night</div>
      </div>
      <div>
        <div>This home is haunted by a: {spot?.haunting}</div>
      </div>
      {user && (
        <div className="post-reviews">
          <ul className="review-input">
            <li>
              <input
                type="text"
                className="review-box"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Leave a review"
              ></input>
            </li>
            <li>
              <button
                className="submit-review-button"
                onClick={() => postReview(spot.id)}
              >
                Submit
              </button>
            </li>
          </ul>
        </div>
      )}
      <div className="main-review-container">
        {spotReviews &&
          spotReviews?.map((spot, key) => (
            <div className="review-container" key={key}>
              <p className="posted-by">{spot?.user.username}</p>
              <p className="review-contents">{spot?.review}</p>
              <button onClick={() => editReview(spot.id)}>Edit</button>
              <button onClick={() => deleteReview(spot.id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SingleSpot;
