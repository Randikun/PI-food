import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import addRecipe  from "../../actions/addRecipe"
import getTypes from "../../actions/getTypes";

function validate(input){
    let errors = {}
    if(!input.title){
        errors.title='Your recipe needs a title'
    }else if(!input.summary){
        errors.summary='Please tell us what your recipe is about'
    }else if(input.score > 100 || input.score < 0){
        errors.score='The score must be a number between 0 and 100'
    }else if(input.healthiness > 100 || input.healthiness < 0){
        errors.healthiness='Healthiness must be a number between 0 and 100'
    }
    return errors
}


export default function AddRecipe(){
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector(state=>state.types)
    
    const [errors, setErrors] = useState({})
    const [input, setInput]=useState({
        title:'',
        summary:'',
        score:'',
        healthiness:'', 
        image:'',
        steps:'',
        diets:[] 
    })

    function handleInputChange(e){
        setInput({
            ...input
            [e.target.name] = e.target.value
        })
        setErrors(validate({
            ...input
            [e.target.name] = e.target.value
        }))
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                diets:[...input.diets, e.target.value]
    
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(addRecipe(input))
        alert('You created a new Recipe!')
        setInput({ title:'',
        summary:'',
        score:'',
        healthiness:'', 
        image:'',
        steps:'',
        diets:[] 
        })
        history.push('/home')
    }

    useEffect(()=>{
        dispatch(getTypes())
    },[])



    return(
        <div>
            <h1>Let´s create your own recipe!</h1>
            <form onSubmit={e=>handleSubmit(e)}>
                <div>
                    <label>Title:</label>
                    <input type='text' name='title' value={input.title} placeholder='Title' onChange={e=>handleInputChange(e)}/>
                    {errors.title && (<p className='error'>{errors.title}</p>)}
                </div>
                <div>
                    <label>Summary:</label>
                    <input type='text' name='summary' value={input.summary} placeholder='Summary' onChange={e=>handleInputChange(e)}/>
                    {errors.summary && (<p className='error'>{errors.summary}</p>)}

                </div>
                <div>
                    <label>Score:</label>
                    <input type='number' name='score' value={input.score} placeholder='Score' onChange={e=>handleInputChange(e)}/>
                    {errors.score && (<p className='error'>{errors.score}</p>)}

                </div>
                <div>
                    <label>Healthiness:</label>
                    <input type='text' name='healthiness' value={input.healthiness} placeholder='Healthiness' onChange={e=>handleInputChange(e)}/>
                    {errors.healthiness && (<p className='error'>{errors.healthiness}</p>)}

                </div>
                <div>
                    <label>Image:</label>
                    <input type='text' name='image' value={input.image} placeholder='image url' onChange={e=>handleInputChange(e)}/>
                </div>
                <div>
                    <label>Steps:</label>
                    <input type='text' name='steps' value={input.steps} placeholder='steps' onChange={e=>handleInputChange(e)}/>
                </div>
                <div>
                    <label>Diets:</label>
                    {diets.map(diet=>{return(
                         <label><input type='checkbox' value={`${diet.name}`} name={`${diet.name}`} onChange={e=>handleCheck(e)}/>{diet.name}</label>
                    )})}
                    
                </div>
                <button type='submit'>CREATE</button>
            </form>

        </div>
    )
}
