import React from 'react'
import styled from 'styled-components';

const FoodItem = (props) => {
    return (
        <Food>
            <Thumbnail>
                <img width="120px" src={props.foodInfo.image} alt={props.foodInfo.name}/>
            </Thumbnail>
            <Text>
                <h3>{props.foodInfo.name}</h3>
                <p>{props.foodInfo.desc}</p>
            </Text>
            <Order>
                <p><i>R{props.foodInfo.price}.00</i></p>
                <p><button className="btn-success" onClick={() => props.addOrder(props.foodInfo.name)}>Add to Order</button></p>
            </Order>
            
        </Food>
    )
}

const Food = styled.div`
    display:flex;
    background:white;
    padding:5px;
    margin-bottom:20px;
`;

const Thumbnail = styled.div`
    width:20%;
    text-align:left;
`;

const Text = styled.div`
    width:60%;
`;

const Order = styled.div`
    width:20%;
`;

export default FoodItem