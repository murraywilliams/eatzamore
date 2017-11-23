import React from 'react'

const Order = (props) => {
    return (
        <div>
            <p>{props.orderInfo.name}</p>
            <p>{props.orderInfo.price}</p>
            <p><button onClick={() => props.deleteOrder(props.uniqueID)}>Remove Order</button></p>
        </div>
    )
}

export default Order