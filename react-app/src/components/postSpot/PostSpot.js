import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
// import "./CreatePostForm.css";
import * as spotStore from "../../store/spot"
import * as postActions from "../../store/spot";

const CreateSpotForm = () => {
  const [errors, setErrors] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [haunting, setHaunting] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  // const [spotId, setSpotId] = useState("");
  const [url, setUrl] = useState(
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  );
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  // const spotIdSelect = useSelector((state) => state.spotReducer.allSpots[0].id)
  // console.log(spotIdSelect + 1)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = user.id;
    // setSpotId(5)
    console.log(url)
    
    // value={this.state.value} onChange={this.handleChange}

    return dispatch(
      postActions.thunk_addSpot({
        userId,
        city,
        country,
        haunting,
        price,
        state,
        // images,
        address,
        name,
        url,
        // spotId
      })
    )
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
      .then((res) => res && history.push("/spots"));
  };
    
  useEffect(() => {
      dispatch(spotStore.thunk_getAllSpots());
    }, [dispatch]);

  return (
    <>
      <section>
        <div>
          <form onSubmit={handleSubmit}>
            <h3>Add a Spot!</h3>
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
            </div>
            <div>
              <input
                className=""
                name="city"
                type="input"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                className=""
                name="state"
                type="input"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                className=""
                name="address"
                type="input"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                className=""
                name="country"
                type="input"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </div>
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
                  <option value="ghoul">Ghoul</option>
                  <option value="demon">Demon</option>
                  <option value="spirit">Spirit</option>
                  <option value="bladefingers">BladeFingers</option>
                </select>
              </label>
            </div>
            {/* <div>
              <input
                id="file-upload"
                type="file"
                data-buttonText="Upload Photo"
                onChange={(e) => {
                  setUrl(e.target.files[0].name);
                  setSpotId(e.target.value)
                }}
                required
              />
            </div> */}
            <button className="login-form-button" type="submit">
              Submit Post
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateSpotForm;
