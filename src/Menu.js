import React from 'react'
import FoodItem from './FoodItem'
import Filters from './Filters'

const Menu = (props) => {
    
    let foods = props.foods.map((food, index) => {
        return <FoodItem foodInfo={food} key={index} addOrder={props.addOrder} />
    });

    return ( 
        <div>
            <Filters categories={props.categories} filterMenu={props.filterMenu}/>
            {foods}
        </div>
    )
}

export default Menu