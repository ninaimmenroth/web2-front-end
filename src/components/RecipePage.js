import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel'
import CardList from './CardList'
//import * as RecipeActions from '../actions/RecipeActions'
import { bindActionCreators } from "@reduxjs/toolkit";


const mapStateToProps = state => {
    return state
}

const response = {
    "recipes":[
        {
          "images": [],
          "_id": "60e45cb1bc1be648dbfb7e55",
          "ingredients": [
            {
              "_id": "60e45cb1bc1be648dbfb7e56",
              "unit": "Esslöffel",
              "amount": 4,
              "ingredientName": "Mehl"
            },
            {
              "_id": "60e45cb1bc1be648dbfb7e57",
              "unit": "Gramm",
              "amount": 500,
              "ingredientName": "Wasser"
            }
          ],
          "instructions": [
            {
              "_id": "60e45cb1bc1be648dbfb7e58",
              "text": "Zutaten mischen"
            },
            {
              "_id": "60e45cb1bc1be648dbfb7e59",
              "text": "Aufkochen"
            },
            {
              "_id": "60e45cb1bc1be648dbfb7e5a",
              "text": "fertig"
            }
          ],
          "created_date": "2021-07-06T13:37:53.800Z",
          "authorID": "user 3",
          "title": "Mehlsuppe 2",
          "preparation_time": 10,
          "number_of_reviews": 0,
          "createdAt": "2021-07-06T13:37:53.809Z",
          "updatedAt": "2021-07-06T13:37:53.809Z",
          "__v": 0
        },
        {
          "images": [],
          "_id": "60e45cf3bc1be648dbfb7e5b",
          "ingredients": [
            {
              "_id": "60e45cf3bc1be648dbfb7e5c",
              "unit": "Esslöffel",
              "amount": 4,
              "ingredientName": "Mehl"
            },
            {
              "_id": "60e45cf3bc1be648dbfb7e5d",
              "unit": "Gramm",
              "amount": 500,
              "ingredientName": "Wasser"
            }
          ],
          "instructions": [
            {
              "_id": "60e45cf3bc1be648dbfb7e5e",
              "text": "Zutaten mischen"
            },
            {
              "_id": "60e45cf3bc1be648dbfb7e5f",
              "text": "Aufkochen"
            },
            {
              "_id": "60e45cf3bc1be648dbfb7e60",
              "text": "fertig"
            }
          ],
          "created_date": "2021-07-06T13:38:59.810Z",
          "authorID": "user 3",
          "title": "Mehlsuppe 2",
          "preparation_time": 10,
          "number_of_reviews": 0,
          "createdAt": "2021-07-06T13:38:59.821Z",
          "updatedAt": "2021-07-06T13:38:59.821Z",
          "__v": 0
        }
      ]
};

class RecipePage extends Component {


    render() {
        return (
            <div>
                <p>Recipe Page</p>
                <CardList recipes={response.recipes}/>
            </div>
        )
    }
}

export default RecipePage