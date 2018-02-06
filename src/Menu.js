import React from 'react'
import FoodItem from './FoodItem'
import Filters from './Filters'
import styled from 'styled-components';

const Menu = (props) => {
    
    let foods = props.foods.map((food, index) => {
        return <FoodItem foodInfo={food} key={index} addOrder={props.addOrder} />
    });

    return ( 
        <MenuWrapper>
            <Filters categories={props.categories} filterMenu={props.filterMenu}/>
            {foods}
        </MenuWrapper>
    )
}

const MenuWrapper = styled.div`
    width:100%;
`;

export default Menu