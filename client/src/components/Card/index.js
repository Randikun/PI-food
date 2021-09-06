import React from 'react'

export default function Card({image, name, diets}){
    return(
        <div>
            <img src={image} alt='not found' width='200px' height='250px'/>
            <h3>{name}</h3>
            {diets?.map(diet=><h5>{diet}</h5>)}
        </div>
    )
}