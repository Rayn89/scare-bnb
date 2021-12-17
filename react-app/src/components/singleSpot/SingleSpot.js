import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useParams } from "react-router";
// import NavBar from "../navBar/NavBar.js";
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
  const userId = user.id;
  
  // const allPosts = useSelector((state) => state.postStore.allPosts);

  // let content = (
  //   <div className="edit-comment-container">
  //     <textarea
  //       id="comment-edit-input"
  //       type="text"
  //       value={editedComment}
  //       onChange={(e) => setEditedComment(e.target.value)}
  //       placeholder=""
  //     ></textarea>
  //     <span>
  //       <button
  //         id="edit-comment-submit"
  //         onClick={() => editComment(editedCommentId, editedComment)}
  //       >
  //         Update
  //       </button>
  //     </span>
  //   </div>
  // );

  // let post;
  // let postComments;

  // if (allPosts) {
  //   post = allPosts.filter((post) => post["id"] == id)[0];
  //   if (!post) {
  //     history.push("/");
  //   }
  //   postComments = post?.comments;
  // }

  //   Post comment function
  // const postComment = async (postId) => {
    // window.location.reload(false)
  //   if (comment) {
  //     await dispatch(postStore.thunk_postComment({ comment, userId, postId }));
  //     await dispatch(postStore.thunk_getPosts());
  //   }
  //   setComment("");
  // };

  //   Edit comment function
  // const editComment = async (commentId, comment) => {
    // window.location.reload(false)
  //   if (editedComment) {
  //     await dispatch(postStore.thunk_editComment({ commentId, comment }));
  //     await dispatch(postStore.thunk_getPosts());
  //   }
  //   setEditSelected([false, null]);
  // };

  //   Delete post function
  // const deleteComment = async (commentId) => {
    // window.location.reload(false)
    // console.log(commentId)
  //   await dispatch(postStore.thunk_deleteComment({ commentId }));
  //   await dispatch(postStore.thunk_getPosts());
  // };

  //   Delete post function
  // const deletePost = async (postId) => {
    // window.location.reload(false)
  //   await dispatch(postStore.thunk_deleteSpot({ postId }));
  //   await dispatch(postStore.thunk_getPosts());
  // };

  useEffect(() => {
    dispatch(spotStore.thunk_getOneSpot(id));
  }, [dispatch, id]);

  return (
    <div className="single-post-container">
      <h2>Single Post</h2>
      <div className="spot-name">{spot?.name}</div>
      <ul>
        <li>{spot?.address}</li>
        <li>{spot?.city}</li>
        <li>{spot?.state}</li>
        <li>{spot?.country}</li>
      </ul>
      <div className="images-container">
        <div className="main-image-container">
          <img className="main-image" src={spot?.images[0].url} />
        </div>
        <div className="small-images-container">
          <img className="small-image" src={spot?.images[1].url} />
          <img className="small-image" src={spot?.images[2].url} />
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
