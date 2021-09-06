import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import getRecipes from "../../actions/getRecipes";
import {filterByDiet, filterCreated, orderByTitle, orderByScore, addRecipeFav} from '../../actions'
import Card from '../Card';
import Paginado from '../paginado';
import SearchBar from '../SearchBar';


export default function Home(){
    const dispatch = useDispatch()
    const allRecipes = useSelector((state)=>state.recipesLoaded)

    const [currentPage, setCurrentPage]= useState(1)
    const [recipesPerPage]= useState(9)
    const [order, setOrder]=useState('')

    const lastRecipe = currentPage * recipesPerPage
    const firstRecipe = lastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(firstRecipe, lastRecipe)

    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getRecipes())
    },[dispatch])
   
    function handleClickGet(e){
        e.preventDefault()
        dispatch(getRecipes())
    }

    function handleFilterDiet(e){
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
        <div>
            <h1>ACA VERAS TUS RECETAS</h1>
            <button onClick={e=>{handleClickGet(e)}}>recargar todas las recetas</button>
            <div>
                <select onChange={e=>{handleSortTitle(e)}}>
                    <option value='Asc'>A-Z</option>
                    <option value='Desc'>Z-A</option>
                </select>
                <select onChange={e=>{handleSortScore(e)}} >
                    <option value='Asc'>Score Ascendente</option>
                    <option value='Desc'>Score Descendente</option>
                </select>
                <select onChange={e=>{handleFilterDiet(e)}}>
                    <option value='All'>Todos</option>
                    <option value='Gluten free'>Gluten free</option>
                    <option value='Ketogenic'>Ketogenic</option>
                    <option value='Vegetarian'>Vegetarian</option>
                    <option value='Lacto-Vegetarian'>Lacto-Vegetarian</option>
                    <option value='Ovo-Vegetarian'>Ovo-Vegetarian</option>
                    <option value='Vegan'>Vegan</option>
                    <option value='Pescatarian'>Pescatarian</option>
                    <option value='Paleolithic'>Paleolithic</option>
                    <option value='Primal'>Primal</option>
                    <option value='Whole 30'>Whole 30</option>
                </select>
                <select onChange={e=>{handleFilterCreated(e)}}>
                    <option value='All'>Todos</option>
                    <option value='Created'>Creados</option>
                    <option value='Api'>Api</option>
                </select>
                <SearchBar/>
                 {
                    currentRecipes?.map(recipe=>{
                        return(
                        <li key={recipe.id}>
                         <Link  to={`/recipe/${recipe.id}`}>
                             <Card name={recipe.name} image={recipe.image} diet={recipe.diets}/>
                             <button onClick={()=>dispatch(addRecipeFav(recipe))}>AGREGAR A FAVORITOS</button>
                         </Link>
                        </li>
                        )

                     })
                 }
                 <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}/>
            </div>
        </div>
    )
}