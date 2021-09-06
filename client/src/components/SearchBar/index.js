import React from "react";
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import getRecipes from "../../actions/getRecipes";


export default function SearchBar(){
  const dispatch = useDispatch()
  const [title, setTitle]= useState('')
  
  function handleInputChange(e){     
    e.preventDefault()                                     
    setTitle(e.target.value)
  };

  function handleSubmit(e){
    e.preventDefault();
    dispatch(getRecipes(title))
    setTitle('')
  };
     
    return (
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Search for your recipe </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <button type="submit">SEARCH</button>
        </form>
    
      </div>
    )
}
