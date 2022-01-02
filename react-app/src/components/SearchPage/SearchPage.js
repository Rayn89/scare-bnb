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
  const [hovered, setHovered] = useState(false)

  let spotsArr;

  if (allSpots) {
    spotsArr = Object.values(allSpots)
  }


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
                  <div
                    onMouseEnter={() => setHovered(val.id)}
                    onMouseLeave={() => setHovered("")}
                    key={key}
                    className="search-results-container"
                  >
                    <img
                      onClick={() => history.push(`/spots/${val.id}`)}
                      // onMouseEnter={() => setHovered(val.id)}
                      // onMouseLeave={() => setHovered("")}
                      className="search-image"
                      src={val.images[0].url}
                      alt=""
                    />
                    <ul
                      className={
                        hovered == val.id ? "search-info-after" : "search-info"
                      }
                    >
                      <li>{val.name}</li>
                      <li>${val.price}/night</li>
                    </ul>
                    {hovered == val.id && (
                      <div className="hovered-div">
                        <ul className="hovered-ul">
                          <li>Hosted by: {val.User}</li>
                          <li className="little-images">
                            <img
                              alt=""
                              className="smaller-image"
                              src={val.images[1].url}
                            />
                            <img
                              alt=""
                              className="smaller-image"
                              src={val.images[2].url}
                            />
                          </li>
                          <li>This spot is haunted by: {val.haunting}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                );
            })}
        </div>
    </div>
  );
  }

  export default SearchPage;