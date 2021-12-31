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
  const [editedReview, setEditedReview] = useState('')
  const [editReviewId, setEditReviewId] = useState('')
  const [editSelected, setEditSelected] = useState([false, null])
  const userId = user?.id;

  // const reviews = spot?.reviews
  // console.log(reviews)
  if(!spots){
    history.push('/spots')
  }

  let spot;
  let spotReviews;
  if(spots){
    spot = spots.filter((spot) => spot["id"] == id)[0];
    spotReviews = spot?.reviews

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
            <i className="far fa-trash-alt"></i>Delete
          </button>
        </div>
      </div>
    );
  }
  
  
  let reviewEdit = 
    <div className="edit-review-container">
      <textarea
        id="review-edit-input"
        type="text"
        value={editedReview}
        onChange={(e) => setEditedReview(e.target.value)}
        placeholder=""
      ></textarea>
      <span>
        <button
          id="edit-review-submit"
          onClick={() => editReview(editReviewId, editedReview)}
        >
          Update
        </button>
      </span>
    </div>
  

  const postReview = async (spotId) => {
    if (review.length < 300) {
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

  const editReview = async (id) => {
    let reviewId = editReviewId
    let review = editedReview
    if(editedReview){
    await dispatch(spotStore.thunk_editReview({reviewId, review}))
    await dispatch(spotStore.thunk_getAllSpots());
    }
    setEditSelected([false,null])
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
        <span className="review-color">{spot?.reviews.length} review(s)</span>
      </div>
      <div className="spot-edit-delete">
        <div>
          {spot?.address} {spot?.city}, {spot?.state}
        </div>
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
        <div className="host-spot-small">
          Entire house hosted by: {spot?.User}
        </div>
        <div className="spot-price">Price: ${spot?.price}/night</div>
      </div>
      <div>
        <div>This home is haunted by a: {spot?.haunting}</div>
      </div>
      {user && (
        <div className="post-reviews">
          {user.id !== spot.userId && 
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
          }
        </div>
      )}
      <div className="main-review-container">
        {spotReviews &&
          spotReviews?.map((spot, key) => (
            <div className="review-container" key={key}>
              <div className="posted-review-container">
                <p className="posted-by">{spot?.user.username}</p>
                <div className="review-contents">{editSelected[0] && editSelected[1] == spot.id ? reviewEdit : spot?.review}</div>
              </div>
              {user?.id == spot?.userId && (
                <div className="edit-delete-button-review">
                  <button
                    className="single-spot-button"
                    onClick={() => {
                      setEditedReview(spot.review)
                      setEditReviewId(spot.id)
                      setEditSelected([!editSelected[0], spot.id])
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="single-spot-button"
                    onClick={() => deleteReview(spot.id)}
                  >
                    <i className="far fa-trash-alt"></i>Delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default SingleSpot;
