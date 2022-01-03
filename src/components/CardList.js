import React from "react";
import style from "../styles/cardlist.module.css";
import RecipeCard from "./RecipeCard";

function CardList(props) {
    const recipes = props;
    console.log(recipes.recipes.recipes);
    return (
        <div className={style.recipes}>
            {recipes.recipes.recipes.map(recipes => (
              <RecipeCard 
                key ={recipes._id} 
                title={recipes.title} 
                preparation_time={recipes.preparation_time}
              />
            ))}
        </div>
    );

/*
    {recipes.recipes.recipes.map(recipes =>(
      <RecipeCard 
      key ={recipes._id} 
      title={recipes.title} 
      preparation_time={recipes.preparation_time}  />
    ))}
*/
}

export default CardList;
