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
  const [comment, setComment] = useState("");
  const [editSelected, setEditSelected] = useState([false, null]);
  const [editedComment, setEditedComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState("");
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spotReducer?.oneSpot)
  const userId = user?.id;
  if(!spot){
    history.push('/spots')
  }
  console.log(id)
  

  let content;
  // const allPosts = useSelector((state) => state.postStore.allPosts);
  if(userId === spot?.userId){
    content = (
      <div>
        <div>
          <EditSpotModal />
        </div>
        <div>
          <button onClick={() => deleteSpot(id)}>Delete</button>
        </div>
      </div>
    );
  }

  const deleteSpot = async (id) => {
    await dispatch(spotStore.thunk_deleteSpot({ id }));
    history.push('/spots')
  };


  useEffect(() => {
    dispatch(spotStore.thunk_getOneSpot(id));
  }, [dispatch, id]);

  return (
    <div className="single-post-container">
      <h2>Single Post</h2>
      <div>
        {content}
      </div>
      <div className="spot-name">{spot?.name}</div>
      <ul>
        <li>{spot?.address}</li>
        <li>{spot?.city}</li>
        <li>{spot?.state}</li>
        <li>{spot?.country}</li>
      </ul>
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
        <div>Entire house hosted by: {spot?.user[0].username}</div>
        <div>Price: ${spot?.price}/night</div>
      </div>
      <div>
        <div>This home is haunted by a: {spot?.haunting}</div>
      </div>
    </div>
  );
}

export default SingleSpot;
