import React from 'react'
import OrderItem from './OrderItem'

const Order = (props) =>{
    
    let order = props.order.map((ord, index) => {
        return <OrderItem orderInfo={ord} uniqueID={index} key={index} deleteOrder={props.deleteOrder}/>
    })

    return (
        <div>
            <h1>Order</h1>
            {order}
        </div>
    )
}

export default Order