import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import "./EditSpotForm.css";

import * as spotActions from "../../store/spot";

const EditSpotForm = () => {
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  let currentSpots = useSelector((state) => state?.spotReducer.allSpots)
  let currentSpot;
  if (currentSpots) {
    currentSpot = currentSpots.filter((spot) => spot["id"] == id)[0];
  }
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
    await dispatch(spotActions.thunk_getAllSpots())
    .then(history.push('/spots'))
  };


  return (
    <>
      <section>
        <div>
          <form className="edit-form" onSubmit={handleSubmit}>
            <h3 className="edit-header">Edit Spot</h3>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                className="edit-spot-input"
                name="name"
                type="input"
                placeholder="Spot Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <div>
                <input
                  className="edit-spot-input"
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
                    <option value=""> </option>
                    <option value="Ghoul">Ghoul</option>
                    <option value="Demon">Demon</option>
                    <option value="Spirit">Spirit</option>
                    <option value="Bladefingers">BladeFingers</option>
                  </select>
                </label>
              </div>
            </div>
            <button className="edit-form-button" type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditSpotForm;
