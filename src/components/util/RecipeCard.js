import React from "react";
import style from "../../styles/recipecard.module.css";
import foodPic from '../../pics/default2.jpeg';
import config from "../../config/config";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RecipeCard({ rID, title, preparation_time }) {

    const eyestyle = {
        color: 'rgb(16, 12, 5)',
        fontSize: '2rem'
    }

    return (

        <Card style={{overflow: 'hidden'}} border="light" className={style.recipe}>
            <Card.Img variant="top" src={foodPic} />
            <Card.Body className={style.body}>
                <div>
                    <Card.Title>{title}</Card.Title>
                <Card.Text>
                    Dauer: {preparation_time} min
                </Card.Text>
                </div>
                
                <Link style={eyestyle} to={config.frontendEndpoints.recipe + "/" + rID} className="btn btn-pink"
                    role="button" ><FontAwesomeIcon icon={faEye} /></Link>
            </Card.Body>
        </Card>

    )

}

export default RecipeCard