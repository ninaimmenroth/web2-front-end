import React from "react";
import style from "../styles/recipecard.module.css";
import foodPic from '../pics/default.jpeg'

function RecipeCard({title, preparation_time}) {

    
    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <p>{preparation_time}</p>
            
            <img className={style.image} src={foodPic} alt="" />
        </div>
    )
    
}

export default RecipeCard