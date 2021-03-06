import React from "react";
import style from "../../styles/cardlist.module.css";
import RecipeCard from "./RecipeCard";

function CardList(props) {
  let recipes = props.recipes;

  if (recipes === undefined) {
    recipes = false;
  }

  return (
    <div className={style.recipes}>
      {(!recipes) ? "NO ENTRY !" : recipes.map((recipes, index) => (
        <RecipeCard
          key={index}
          rID={recipes._id}
          title={recipes.title}
          preparation_time={recipes.preparation_time}
        />
      ))}
    </div>
  );
}

export default CardList;
