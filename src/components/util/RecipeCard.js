import React from "react";
import style from "../../styles/recipecard.module.css";
import foodPic from '../../pics/default.jpeg';
import config from "../../config/config";
import {Link} from 'react-router-dom';

function RecipeCard({rID, title, preparation_time, isAdmin}) {

//    {(isAdmin == true) ? "<Link to=\"#\" onClick=\"\">Löschen</Link>" : ""}
    
    return (
        <Link to={config.frontendEndpoints.recipe + "/" + rID} className={style.recipe}>
            <div>
                <h1>{title}</h1>
                <p>{preparation_time}</p>
                <img className={style.image} src={foodPic} alt="" />
            </div>
        </Link>
    )
    
}

export default RecipeCard