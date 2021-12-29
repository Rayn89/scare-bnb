import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
// import SearchResults from "../searchResults/SearchResults.js";
import "./SearchPage.css";
import * as spotStore from '../../store/spot';


function SearchPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const allSpots = useSelector(state => state.spotReducer.allSpots)
  const [searchTerm, setSearchTerm] = useState('')

  let spotsArr;

  if (allSpots) {
    spotsArr = Object.values(allSpots)
  }
//   console.log("PLACES ====>", spotsArr[0]["state"])

  useEffect(() => {
    dispatch(spotStore.thunk_getAllSpots());
  }, [dispatch])

  return (
    <div className="search-page-container">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search by State..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></input>
        </div>
        <div className="results">
            {spotsArr && spotsArr.filter((val) => {
                if(val.state.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
            }).map((val, key) => {
                return (
                  <div key={key} className="search-results-container">
                    <img
                      onClick={() => history.push(`/spots/${val.id}`)}
                      className="search-image"
                      src={val.images[0].url}
                      alt=""
                    />
                    <ul className="search-info">
                      <li>{val.name}</li>
                      <li>${val.price}/night</li>
                    </ul>
                  </div>
                );
            })}
        </div>
    </div>
  );
  }

  export default SearchPage;