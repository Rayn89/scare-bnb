const ALL_SPOTS = "spot/ALL_SPOTS"
const ADD_SPOT = "spot/ADD_SPOT"

const allSpots = (payload) => ({
    type: ALL_SPOTS,
    payload,
})

const addSpot = (payload) => ({
    type: ADD_SPOT,
    payload
})


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

//ADD A SPOT
export const thunk_addSpot =
  ({ userId, city, country, haunting, price, state, images, address, name }) =>
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
      }),
    });

    if (res.ok) {
      const spot = await res.json();
      dispatch(addSpot(spot));
      return spot;
    }
  };


//SPOT REDUCER
const spotReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_SPOTS: {
      const newState = { ...state }
      newState["allSpots"] = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;