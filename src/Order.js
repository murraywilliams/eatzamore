import React from 'react'
import OrderItem from './OrderItem'
import styled from 'styled-components';

const Order = (props) =>{
    
    let order = props.order.map((ord, index) => {
        return <OrderItem orderInfo={ord} uniqueID={index} key={index} deleteOrder={props.deleteOrder}/>
    })

    return (
        <OrderWrapper>
            <h1>ORDER</h1>
            {order}
        </OrderWrapper>
    )
}

const OrderWrapper = styled.div`
    width:100%;

    & h1 {
        color:#d85a41;
    }

    & p {
        color:white;
        display:inline-block;
        margin:0 5px;
    }

    & p button {
        background:none;
    }
`;

export default Order