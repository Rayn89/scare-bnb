import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import * as spotStore from "../../store/spot"
import * as postActions from "../../store/spot";
import isURL from "validator/lib/isURL";
import isCurrency from "validator/lib/isCurrency";
import "./PostSpot.css"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import UploadImageForm from './imagesPost.js'

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

  //useState variables for specific field errors
  const [spotnameError, setSpotnameError] = useState("");
  const [addressError, setAddressError] = useState(""); 
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [hauntingError, setHauntingError] = useState("");
  const [amountError, setPriceError] = useState("");
  const [UrlError, setUrlError] = useState("");
  const [ImgError, setImgError] = useState("");

  if(!user) {
    history.push('/spots')
  }

  //On submit check to see if there are any errors
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user.id;

    //setting images 1-3 to urls submitted on a spot
    setUrl({"1":image1, "2":image2, "3":image3})

    //front-end validations
    const validationErrors = []
    if(!name || name.length > 40){
      validationErrors.push("Spot name must be between 1 and 40 characters.")
    }
    if (!address || address.length > 40) {
      validationErrors.push("Address must be between 1 and 40 characters.");
    }
    if(!city || city.length > 20) {
      validationErrors.push("City must be between 1 and 20 characters.");
    }
    if(!state || state.length > 20){
      validationErrors.push("Please enter valid state.");
    }
    if (!country || country.length > 20) {
      validationErrors.push("Country must be between 1 and 20 characters.");
    }
    if(haunting.length < 2){
      validationErrors.push("Please select a valid haunting.")
    }
    if (!price || !isCurrency(price) || price > 1000 || price <= 0) {
      validationErrors.push(
        "Please enter a valid price between $1 and $1,000"
      );
    }
    if(!isURL(image1) || !isURL(image2) || !isURL(image3)){
      validationErrors.push("Please input a valid image URL.")
    }
    if (!/\.(jpe?g|png|gif|bmp)$/gi.test(image1) || !/\.(jpe?g|png|gif|bmp)$/gi.test(image2) || !/\.(jpe?g|png|gif|bmp)$/gi.test(image3)) {
      validationErrors.push("Must be a valid image url format (.jpeg, .png, .gif, .bmp");
    }

    //checking for specific errors to set input errors
    validationErrors.includes("Spot name must be between 1 and 40 characters.") ? setSpotnameError("Spot name must be between 1 and 40 characters.") : setSpotnameError("")
    validationErrors.includes("Address must be between 1 and 40 characters.") ? setAddressError("Address must be between 1 and 40 characters.") : setAddressError("")
    validationErrors.includes("City must be between 1 and 20 characters.") ? setCityError("City must be between 1 and 20 characters.") : setCityError("")
    validationErrors.includes("Please enter valid state.") ? setStateError("Please enter valid state.") : setStateError("")
    validationErrors.includes("Country must be between 1 and 20 characters.") ? setCountryError("Country must be between 1 and 20 characters.") : setCountryError("")
    validationErrors.includes("Please select a valid haunting.") ? setHauntingError("Please select a valid haunting.") : setHauntingError("")
    validationErrors.includes("Please enter a valid price between $1 and $1,000") ? setPriceError("Please enter a valid price between $1 and $1,000") : setPriceError("")
    validationErrors.includes("Please input a valid image URL.") ? setUrlError("Please input a valid image URL.") : setUrlError("")
    validationErrors.includes("Must be a valid image url format (.jpeg, .png, .gif, .bmp") ? setImgError("Must be a valid image url format (.jpeg, .png, .gif, .bmp") : setImgError("")

    setErrors(validationErrors);

    //checking for back-end validations
    if (!validationErrors.length) {
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
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      await dispatch(spotStore.thunk_getAllSpots()).then(
        (res) => res && history.push("/spots")
      );
    }
  };
  
  //useEffect to render whenever image is updated
  useEffect(() => {
      dispatch(spotStore.thunk_getAllSpots());
      setUrl({ 1: image1, 2: image2, 3: image3 });
    }, [dispatch, image1, image2, image3]);


  //Set images for preview
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
    <div className="newspot-container">
      <h2 className="nespot-header">New Spot</h2>
      <div className="newspot-form">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
          autoComplete="off"
        >
        {spotnameError.length === 0 ? <TextField value={name}
          onChange={(e) => setName(e.target.value)} fullWidth id="outlined-basic" label="Spot Name" variant="outlined" /> : 
        
        <TextField
          error
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="outlined-error-helper-text"
          label="Spot Name"
          helperText={spotnameError}
        />
        }
        {addressError.length === 0 ? <TextField value={address}
          onChange={(e) => setAddress(e.target.value)} fullWidth id="outlined-basic" label="Address" variant="outlined" /> : 
        
        <TextField
          error
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="outlined-error-helper-text"
          label="Address"
          helperText={addressError}
        />
        }
        {cityError.length === 0 ? <TextField value={city}
          onChange={(e) => setCity(e.target.value)} fullWidth id="outlined-basic" label="City" variant="outlined" /> : 
        
        <TextField
          error
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          id="outlined-error-helper-text"
          label="City"
          helperText={cityError}
        />
        }
        {stateError.length === 0 ? <TextField value={state}
          onChange={(e) => setState(e.target.value)} fullWidth id="outlined-basic" label="State" variant="outlined" /> : 
        
        <TextField
          error
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          id="outlined-error-helper-text"
          label="State"
          helperText={stateError}
        />
        }
        {countryError.length === 0 ? <TextField value={country}
          onChange={(e) => setCountry(e.target.value)} fullWidth id="outlined-basic" label="Country" variant="outlined" /> : 
        
        <TextField
          error
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          id="outlined-error-helper-text"
          label="Country"
          helperText={countryError}
        />
        }
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Haunting</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={haunting}
          label="Haunting"
          onChange={(e) => setHaunting(e.target.value)}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="Ghoul">Ghoul</MenuItem>
          <MenuItem value="Demon">Demon</MenuItem>
          <MenuItem value="Spirit">Spirit</MenuItem>
          <MenuItem value="Bladefingers">Bladefingers</MenuItem>
        </Select>
        </FormControl>

          {amountError.length === 0 ? 
          <TextField
            id="outlined-adornment-amount"
            type="Number"
            value={price}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(e) => setPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          /> : 
          <TextField
            id="outlined-adornment-amount"
            error
            helperText={amountError}
            type="Number"
            value={price}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(e) => setPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
          }

        {/* Three image boxes */}
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
              }}
              required
            />
          </div>
        </div>
          <div className="login-demo-buttons">
        <Button style={{
          borderRadius: 10,
          backgroundColor: "#FF385C",
          marginBottom: 20,
          }} 
          onClick={() => {
                {console.log(errors)}
              }} 
          className="MUI-login-button" 
          type="submit" variant="contained">Post Spot
        </Button>
        </div>
        </Box>
      </div>
    </div>
  );
};

export default CreateSpotForm;
