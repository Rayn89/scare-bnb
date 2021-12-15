const ALL_SPOTS = "spot/ALL_SPOTS"

const allSpots = (payload) => ({
    type: ALL_SPOTS,
    payload,
})

export const thunk_getAllSpots = () => async (dispatch) => {
  const res = await fetch(`/api/spots/`);

  if (res.ok) {
    const spots = await res.json();
    console.log("YOU ARE IN SPOTS ---> ", spots);
    dispatch(allSpots(spots));
    return spots;
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