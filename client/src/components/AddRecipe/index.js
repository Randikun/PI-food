import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import addRecipe from "../../actions/addRecipe";
import getTypes from "../../actions/getTypes";
import s from "./add.module.css";

export function validate(state) {
  let errors = {};
  if (!state.title) {
    errors.title = "Your recipe needs a title";
  } else if (!state.summary) {
    errors.summary = "Please tell us what is your recipe about";
  } else if (!state.score || state.score > 100 || state.score < 0) {
    errors.score = "The score must be a number between 0 and 100";
  } else if (
    !state.healthiness ||
    state.healthiness > 100 ||
    state.healthiness < 0
  ) {
    errors.healthiness = "Healthiness must be a number between 0 and 100";
  } else if (!state.image) {
    errors.image = "It would be nice if you show us how it looks";
  } else if (!state.steps) {
    errors.steps = "Don´t you wanna tell us how to do it ourselves?";
  }
  return errors;
}

export default function AddRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();
  const dietas = useSelector((state) => state.types);

  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    title:'',
    summary:'',
    score:'',
    healthiness:'',
    image:'',
    steps:'',
    diets:[],
  });

  function handleInputChange(e) {
    console.log('E.TARGET.VALUE', e.target.value)
    console.log('NAME', e.target.name)
  //   setState(prev=>{
  //     const newState = {
  //         ...prev,
  //         [e.target.name] : e.target.value
  //     }
  //     setErrors(validate(newState))
  //     return newState
  // })
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
      setErrors(validate(state))
  }
  console.log("dietas", dietas);
  function handleCheck(e) {
    if (e.target.checked) {
      setState({
        ...state,
        diets: [...state.diets, e.target.value],
      });
      console.log("diets", state.diets);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addRecipe(state));
    alert("You created a new Recipe!");
    setState({ 
    title:'',
    summary:'',
    score:'',
    healthiness:'',
    image:'',
    steps:'',
    diets:[], });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${s.back}`}>
      <div className={`${s.container}`}>
        <h1>Let´s create your own recipe!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={`${s.caja}`}>
            <label>Title:</label>
            <input
              type='text'
              name='title'
              value={state.title}
              placeholder='Title'
              
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          {errors.title && <h5 className="error">{errors.title}</h5>}
          <div className={`${s.caja}`}>
            <label>Summary:</label>
            <input
              type='text'
              name='summary'
              value={state.summary}
              placeholder='Summary'
              
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          {errors.summary && <h5 className="error">{errors.summary}</h5>}
          <div className={`${s.caja}`}>
            <label>Score:</label>
            <input
              type='number'
              name='score'
              value={state.score}
              placeholder='Score'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          {errors.score && <h5 className="error">{errors.score}</h5>}
          <div className={`${s.caja}`}>
            <label>Healthiness:</label>
            <input
              type='text'
              name='healthiness'
              value={state.healthiness}
              placeholder='Healthiness'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          {errors.healthiness && (
            <h5 className='error'>{errors.healthiness}</h5>
          )}
          <div className={`${s.caja}`}>
            <label>Image:</label>
            <input
              type='url'
              name='image'
              value={state.image}
              placeholder='image url'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          {errors.image && <h5 className="error">{errors.image}</h5>}
          <div className={`${s.caja}`}>
            <label>Step by step:</label>
            <input
              type='text'
              name='steps'
              value={state.steps}
              placeholder='steps'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          {errors.steps && <h5 className="error">{errors.steps}</h5>}
          <div className={`${s.caja}`}>
            {dietas.map((diet) => {
              return (
                <span>
                  <input
                    key={`${diet.id}`}
                    type='checkbox'
                    value={`${diet.name}`}
                    name={`${diet.name}`}
                    onChange={(e) => handleCheck(e)}
                  />
                  {diet.name}
                </span>
              );
            })}
          </div>
          <div className={`${s.btnCont}`}>
            {state.title && state.summary ? (
              <button type="submit">CREATE</button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
