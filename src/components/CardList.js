import React from "react";
import style from "../styles/cardlist.module.css";
import RecipeCard from "./RecipeCard";

function CardList(props) {
    const recipes = props.recipes;
    console.log(recipes);
    
    return (
    <div className={style.recipes}>
    {recipes.map(recipes =>(
      <RecipeCard 
      key ={recipes._id} 
      title={recipes.title} 
      preparation_time={recipes.preparation_time}  />
    ))}
    </div>);

}

export default CardList;
