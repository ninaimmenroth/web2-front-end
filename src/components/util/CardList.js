import React from "react";
import style from "../../styles/cardlist.module.css";
import RecipeCard from "./RecipeCard";

function CardList(props) {
    const recipes = props.recipes;
    const isAdmin = props.isAdmin;

    console.log("CARDLIST: ");
    console.log(recipes);

  if (recipes === undefined) {
    recipes = false;
  }

    return (
        <div className={style.recipes}>
            {(!recipes) ? "NO ENTRY !" : recipes.map(recipes => (
              <RecipeCard 
                key={recipes._id}
                rID={recipes._id} 
                title={recipes.title} 
                preparation_time={recipes.preparation_time}
                isAdmin={isAdmin}
              />
            ))}
        </div>
    );
}

export default CardList;
