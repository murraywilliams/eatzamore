import React from 'react'

const FoodItem = (props) => {
    return ( 
        <div>
            <h3>{props.foodInfo.name}</h3>
            <p><i>R{props.foodInfo.price}.00</i></p>
            <p>{props.foodInfo.desc}</p>
            <img width="120px" src={props.foodInfo.image} alt={props.foodInfo.name}/>
            <p><button onClick={() => props.addOrder(props.foodInfo.name)}>Add to Order</button></p>
            <hr />
        </div>
    )
}

export default FoodItem