import {React} from 'react';
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import getRecipeDetail from '../../actions/getRecipeDetail';


export default function RecipeDetail(props) {

    const dispatch = useDispatch()

    const recipeDetail = useSelector((state)=>state.recipeDetail)
     
    useEffect(()=>{
        dispatch(getRecipeDetail(props.match.params.id))
    },[dispatch])
      
        return (
            <div >
                {
                    recipeDetail.length > 0 ? 
                    <div>

                        <img src={recipeDetail.image} alt="not found"/>

                         <div>
                             <span>Title</span>
                             <span>{recipeDetail.title}</span>
                             <span>Summary</span>
                             <span>{recipeDetail.summary}</span>
                             <span>score</span>
                             <span>{recipeDetail.score}</span>
                             <span>healthiness</span>
                             <span>{recipeDetail.healthiness}</span>
                             <span>steps</span>
                             <span>{recipeDetail.steps}</span>
                             <span>diets</span>
                             <span>{recipeDetail.diets.map(diet=>diet.name)}</span>
                         </div>
                    
                    </div>
                :<h3>Loading</h3>
                
                 } 
            </div>
        )
}
                
        
    
    
    




