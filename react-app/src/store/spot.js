const ALL_SPOTS = "spot/ALL_SPOTS"
const ADD_SPOT = "spot/ADD_SPOT"
const ONE_SPOT = "spot/ONE_SPOT"

const allSpots = (payload) => ({
    type: ALL_SPOTS,
    payload,
})

const addSpot = (payload) => ({
    type: ADD_SPOT,
    payload
})

const singleSpot = (payload) => ({
  type: ONE_SPOT,
  payload,
});



//GET ALL SPOTS
export const thunk_getAllSpots = () => async (dispatch) => {
  const res = await fetch(`/api/spots/`);

  if (res.ok) {
    const spots = await res.json();
    console.log("YOU ARE IN SPOTS ---> ", spots);
    dispatch(allSpots(spots));
    return spots;
  }
};

export const thunk_getOneSpot = (id) => async (dispatch) => {
  const res = await fetch(`/api/spots/${id}`);

  if (res.ok) {
    const spot = await res.json();
    console.log("SPOT ==========>", spot)
    dispatch(singleSpot(spot));
    return spot;
  }
};

//ADD A SPOT
export const thunk_addSpot =
  ({ userId, city, country, haunting, price, state, images, address, name, url }) =>
  async (dispatch) => {
    const res = await fetch("/api/spots/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        city,
        country,
        haunting,
        price,
        state,
        images,
        address,
        name,
        url,
      }),
    });

    if (res.ok) {
      const spot = await res.json();
      dispatch(addSpot(spot));
      return spot;
    }
  };

  //UPDATE SPOT
  // export const thunk_updatePost =
  //   ({ userId, caption, spotId }) =>
  //   async (dispatch) => {
  //     const res = await fetch(`/api/spots/${spotId}/edit`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId,
  //         caption,
  //       }),
  //     });

  //     if (res.ok) {
  //       const spot = await res.json();
  //       dispatch(addSpot(spot));
  //       return spot;
  //     }
  //   };


//SPOT REDUCER
const spotReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_SPOTS: {
      const newState = { ...state };
      newState["allSpots"] = action.payload;
      return newState;
    }
    case ONE_SPOT: {
      const newState = { ...state };
      newState["oneSpot"] = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;