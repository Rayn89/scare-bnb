import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
// import "./CreatePostForm.css";
import * as spotStore from "../../store/spot"
import * as postActions from "../../store/spot";
import "./PostSpot.css"

const CreateSpotForm = () => {
  const [errors, setErrors] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [haunting, setHaunting] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState();
  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  
  if(!user) {
    history.push('/spots')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user.id;
    setUrl({"1":image1, "2":image2, "3":image3})
    console.log("URL =======>", url)



    await dispatch(
      postActions.thunk_addSpot({
        userId,
        city,
        country,
        haunting,
        price,
        state,
        address,
        name,
        url,
      })
    )
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
      await dispatch(spotStore.thunk_getAllSpots())
      .then((res) => res && history.push("/spots"));
  };
    
  useEffect(() => {
      dispatch(spotStore.thunk_getAllSpots());
      setUrl({ 1: image1, 2: image2, 3: image3 });
    }, [dispatch, image1, image2, image3]);

  let content;
  let content2;
  let content3;

  if (image1) {
    content = <img alt="" className="post-image-preview" src={image1} />;
  }

  if (image2) {
    content2 = <img alt="" className="post-image-preview" src={image2} />;
  }

  if (image3) {
    content3 = <img alt="" className="post-image-preview" src={image3} />;
  }

  return (
    <section className="section-container">
      <div className="form-container">
        <form className="main-form-container" onSubmit={handleSubmit}>
          <h3 className="new-spot-header">Add a Spot</h3>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="input-field-new">
            <input
              className="new-spot-input"
              name="name"
              type="input"
              placeholder="Spot Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="input-field-new">
            <input
              className="new-spot-input"
              name="city"
              type="input"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
          <div className="input-field-new">
            <input
              className="new-spot-input"
              name="state"
              type="input"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            ></input>
          </div>
          <div className="input-field-new">
            <input
              className="new-spot-input"
              name="address"
              type="input"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </div>
          <div className="input-field-new">
            <input
              className="new-spot-input"
              name="country"
              type="input"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </div>
          <div>
            <label>
              Please select price per night:
              <input
                className="price-per-night"
                name="price"
                type="number"
                placeholder="Price"
                min="1"
                max="10000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </label>
          </div>
          <div>
            <label>
              Select type of Haunting:
              <select
                className="price-per-night"
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
          <h2 className="new-post-photo-header">Please add three images:</h2>
          <div className="new-post-photo-container">
            <div className="content1-container">
              {content}
              <input
                type="url"
                placeholder="Main image URL"
                className="new-spot-input"
                onChange={(e) => {
                  setImage1(e.target.value);
                }}
                required
              />
            </div>
            <div className="content1-container">
              {content2}
              <input
                type="url"
                className="new-spot-input"
                placeholder="Additional Image"
                onChange={(e) => {
                  setImage2(e.target.value);
                  console.log(url);
                }}
                required
              />
            </div>
            <div className="content1-container">
              {content3}
              <input
                type="url"
                className="new-spot-input"
                placeholder="Additional Image"
                onChange={(e) => {
                  setImage3(e.target.value);
                  console.log(url);
                }}
                required
              />
            </div>
          </div>
          <button className="post-spot-form-button" type="submit">
            Submit Spot
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateSpotForm;
