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
    if (!price || !isCurrency(price) || price > 1000) {
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


    setErrors(validationErrors);

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
    <div className="login-form">
      <h2 className="login-header">Please Signup</h2>
      <div className="login-email">
        <Box
          component="form"
          // onSubmit={onSignUp}
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
          // noValidate
          // className="login-email"
          autoComplete="off"
        >
        {errors ? <TextField value={name}
          onChange={(e) => setName(e.target.value)} fullWidth id="outlined-basic" label="Spot Name" variant="outlined" /> : 
        
        <TextField
          error
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="outlined-error-helper-text"
          label="Spot Name"
          // helperText={usernameError}
        />
        }
        {errors ? <TextField value={address}
          onChange={(e) => setAddress(e.target.value)} fullWidth id="outlined-basic" label="Address" variant="outlined" /> : 
        
        <TextField
          error
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="outlined-error-helper-text"
          label="Address"
          // helperText={emailError}
        />
        }
        {errors ? <TextField type="password" value={city}
          onChange={(e) => setCity(e.target.value)} fullWidth id="outlined-basic" label="City" variant="outlined" /> : 
        
        <TextField
          error
          name="password"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          id="outlined-error-helper-text"
          label="City"
          // helperText={passwordError}
        />
        }
        {errors ? <TextField type="password" value={state}
          onChange={(e) => setState(e.target.value)} fullWidth id="outlined-basic" label="State" variant="outlined" /> : 
        
        <TextField
          error
          name="password"
          value={state}
          onChange={(e) => setState(e.target.value)}
          id="outlined-error-helper-text"
          label="State"
          // helperText={repeatError}
        />
        }
        {errors ? <TextField value={country}
          onChange={(e) => setCountry(e.target.value)} fullWidth id="outlined-basic" label="Country" variant="outlined" /> : 
        
        <TextField
          error
          name="password"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          id="outlined-error-helper-text"
          label="Country"
          // helperText={repeatError}
        />
        }
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Age"
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            // value={values.amount}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            // onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>

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
          type="submit" variant="contained">Signup
        </Button>
        
        </div>
        </Box>
      </div>
    </div>
    // <section className="section-container">
    //   <div className="form-container">
    //     <form className="main-form-container" onSubmit={handleSubmit}>
    //       <h3 className="new-spot-header">Add a Spot</h3>
    //       <div className="error-list-container">
    //         <ul className="error-list">
    //         {errors.map((error, ind) => (
    //           <li className="errors" key={ind}>{error}</li>
    //         ))}
    //         </ul>
    //       </div>
    //       <div className="input-field-new">
    //         <input
    //           className="new-spot-input"
    //           name="name"
    //           type="input"
    //           placeholder="Spot Name"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //         ></input>
            
    //       </div>
    //       <div className="input-field-new">
    //         <input
    //           className="new-spot-input"
    //           name="address"
    //           type="input"
    //           placeholder="Address"
    //           value={address}
    //           onChange={(e) => setAddress(e.target.value)}
    //         ></input>
    //       </div>
    //       <div className="input-field-new">
    //         <input
    //           className="new-spot-input"
    //           name="city"
    //           type="input"
    //           placeholder="City"
    //           value={city}
    //           onChange={(e) => setCity(e.target.value)}
    //         ></input>
    //       </div>
    //       <div className="input-field-new">
    //         <input
    //           className="new-spot-input"
    //           name="state"
    //           type="input"
    //           placeholder="State"
    //           value={state}
    //           onChange={(e) => setState(e.target.value)}
    //         ></input>
    //       </div>

    //       <div className="input-field-new">
    //         <input
    //           className="new-spot-input"
    //           name="country"
    //           type="input"
    //           placeholder="Country"
    //           value={country}
    //           onChange={(e) => setCountry(e.target.value)}
    //         ></input>
    //       </div>
    //       <div>
    //         <label>
    //           Please select price per night:
    //           <input
    //             className="price-per-night"
    //             name="price"
    //             type="number"
    //             placeholder="Price"
    //             min="0"
    //             max="1000"
    //             step="50"
    //             value={price}
    //             onChange={(e) => setPrice(e.target.value)}
    //           ></input>
    //         </label>
    //       </div>
    //       <div>
    //         <label>
    //           Select type of Haunting:
    //           <select
    //             className="price-per-night"
    //             value={haunting}
    //             onChange={(e) => setHaunting(e.target.value)}
    //           >
    //             <option value=""> </option>
    //             <option value="Ghoul">Ghoul</option>
    //             <option value="Demon">Demon</option>
    //             <option value="Spirit">Spirit</option>
    //             <option value="Bladefingers">BladeFingers</option>
    //           </select>
    //         </label>
    //       </div>
    //       <h2 className="new-post-photo-header">Please add three images:</h2>
    //       <div className="new-post-photo-container">
    //         <div className="content1-container">
    //           {content}
    //           <input
    //             type="url"
    //             placeholder="Main image URL"
    //             className="new-spot-input"
    //             onChange={(e) => {
    //               setImage1(e.target.value);
    //             }}
    //             required
    //           />
    //         </div>
    //         <div className="content1-container">
    //           {content2}
    //           <input
    //             type="url"
    //             className="new-spot-input"
    //             placeholder="Additional Image"
    //             onChange={(e) => {
    //               setImage2(e.target.value);
    //             }}
    //             required
    //           />
    //         </div>
    //         <div className="content1-container">
    //           {content3}
    //           <input
    //             type="url"
    //             className="new-spot-input"
    //             placeholder="Additional Image"
    //             onChange={(e) => {
    //               setImage3(e.target.value);
    //             }}
    //             required
    //           />
    //         </div>
    //       </div>
    //       <button className="post-spot-form-button" type="submit">
    //         Submit Spot
    //       </button>
    //     </form>
    //   </div>
    // </section>
  );
};

export default CreateSpotForm;
