import React from 'react'

const Order = (props) => {
    return (
        <div>
            <p>{props.orderInfo.name}</p>
            <p>R{props.orderInfo.price}.00</p>
            <p><button onClick={() => props.deleteOrder(props.uniqueID)}>X</button></p>
        </div>
    )
}

export default Order