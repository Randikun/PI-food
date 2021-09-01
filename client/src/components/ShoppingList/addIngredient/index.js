import React from 'react';
import { connect } from 'react-redux';
import { addIngredient } from '../../../actions';


export function AddIngredient({ addIngredient }) {

  const [formData, setFormData] = React.useState({
    title: "",
  });


  function handleChange(e){
    setFormData({
      ...formData,      
        [e.target.name]: e.target.value,
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addIngredient(formData);
    setFormData({ title: "" });
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} placeholder='ingredient' onChange={(e)=>handleChange(e)}/>
        <button type="submit" value="Submit">AGREGAR</button>
      </form>
    </div>
    
  );
}



export default connect(null, {addIngredient})(AddIngredient);


