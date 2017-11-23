import React from 'react'
import FoodItem from './FoodItem'

const Menu = (props) => {

    let foods = props.foods.map((food, index) => {
        return <FoodItem foodInfo={food} uniqueID={index} key={index} addOrder={props.addOrder} />
    });

    return ( 
        <div>
            <h1>Foods</h1>
            {foods}
        </div>
    )
}

export default Menu