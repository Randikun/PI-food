import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import getRecipes from "../../actions/getRecipes";
import getTypes from '../../actions/getTypes'
import {filterByDiet, filterCreated, orderByTitle, orderByScore} from '../../actions'
import Card from '../Card';
import Paginate from '../paginate';
import SearchBar from '../SearchBar';
import s from './home.module.css'



export default function Home(){
    const dispatch = useDispatch()
    const allRecipes = useSelector((state)=>state.recipesLoaded)
    const dietas = useSelector((state)=>state.types)

    const [currentPage, setCurrentPage]= useState(1)
    const [recipesPerPage]= useState(9)
    const [order, setOrder]=useState('')

    const lastRecipe = currentPage * recipesPerPage
    const firstRecipe = lastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(firstRecipe, lastRecipe)
    function paginate(pageNumber){
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getRecipes(""))
        dispatch(getTypes())
    
    },[dispatch])
   
    function handleClickGet(e){
        e.preventDefault()
        dispatch(getRecipes(""))
    }

    function handleFilterDiet(e){
        console.log('despachando', e.target.value)
        e.preventDefault()
        dispatch(filterByDiet(e.target.value))
    }

    function handleFilterCreated(e){
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
    }
    function handleSortTitle(e){
        e.preventDefault()
        dispatch(orderByTitle(e.target.value))
        setCurrentPage(1)
        setOrder(`ordered ${e.target.value}`)
    }
    function handleSortScore(e){
        e.preventDefault()
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1)
        setOrder(`ordered ${e.target.value}`)
    }
    
    return(
        <div  className={`${s.container}`}>
            
            <div className={`${s.filters}`}>
                <button className={`${s.clear}`} onClick={e=>{handleClickGet(e)}}>CLEAR FILTERS</button>
                <select className={`${s.select}`} onChange={e=>{handleSortTitle(e)}}>
                <option>By name</option>
                    
                    <option value='Asc'>A-Z</option>
                    <option value='Desc'>Z-A</option>
                    
                </select>

                <select  className={`${s.select}`} onChange={e=>{handleSortScore(e)}} >
                <option>By score</option>
               
                    <option value='Asc'>Score Ascendente</option>
                    <option value='Desc'>Score Descendente</option>
                
                </select>
                <select className={`${s.select}`} onChange={e=>{handleFilterDiet(e)}}>
                <option>By diet</option>
               { dietas?.map(diet=> {return(
               <option value={`${diet.name}`} key={`${diet.id}`} >{diet.name}</option>)})}             
                </select>
                <select className={`${s.select}`} onChange={e=>{handleFilterCreated(e)}}>
                <option>By owner</option>

                    <option value='All'>Todos</option>
                    <option value='Created'>Creados</option>
                    <option value='Api'>Api</option>
               
                </select>
         </div>
         <div className={`${s.searchBar}`}>
                <SearchBar/>

         </div>
                <div className={`${s.cards}`}>
                 {currentRecipes ? ( 
                      currentRecipes.map(recipe=>{
                        return(
                        <div key={recipe.id}>
                         
                             <Card  recipe={recipe} id={recipe.id} title={recipe.title} image={recipe.image} diets={recipe.Diets}/>
                        
                        </div>
                        )

                     })) :<h2>Loading...</h2>
                    
                  
                    }

                </div>
                 <Paginate recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginate={paginate}/>
    </div>
    )
}