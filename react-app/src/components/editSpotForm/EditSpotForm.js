import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import "./EditSpotForm.css";
// import * as spotStore from "../../store/spot";

import * as spotActions from "../../store/spot";

const EditSpotForm = () => {
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  let currentSpot = useSelector((state) => state?.spotReducer.oneSpot)

  const [price, setPrice] = useState(currentSpot?.price);
  const [name, setName] = useState(currentSpot?.name);
  const [haunting, setHaunting] = useState(currentSpot?.haunting)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = user.id;
    await dispatch(spotActions.thunk_updateSpot({ id, userId, price, name, haunting }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
      // .then((res) => res && history.push(`/spots`));
    await dispatch(spotActions.thunk_getAllSpots())
    .then(history.push('/spots'))
  };


  return (
    <>
      <section>
        <div>
          <form onSubmit={handleSubmit}>
            <h3>Edit Spot</h3>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                className=""
                name="name"
                type="input"
                placeholder="Spot Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <div>
                <input
                  className=""
                  name="price"
                  type="number"
                  placeholder="Price"
                  min="1"
                  max="10000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              <div>
                <label>
                  Select type of Haunting:
                  <select
                    value={haunting}
                    onChange={(e) => setHaunting(e.target.value)}
                  >
                    <option value="Ghoul">Ghoul</option>
                    <option value="Demon">Demon</option>
                    <option value="Spirit">Spirit</option>
                    <option value="Bladefingers">BladeFingers</option>
                  </select>
                </label>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditSpotForm;
