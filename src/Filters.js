import React from 'react';
import styled from 'styled-components';
import * as Images from './Images';

const Filters = (props) => {

    const filters = props.categories.map((category)=>{

        if(category === "All"){
            return <FilterButton key={`filter-${category}`} onClick={() =>props.filterMenu(category)}>
            <p>All</p>
            </FilterButton>
        }
        else {
            return <FilterButton key={`filter-${category}`} onClick={() =>props.filterMenu(category)}>
            <img src={Images[category]} alt={category} title={category}/>
            </FilterButton>
        }
    });

    return (
        <div>
            <FilterWrapper>{filters}</FilterWrapper>
        </div>
    )
}

export default Filters

const FilterWrapper = styled.div`
    display:flex;
    justify-content:space-between;
    margin-bottom:40px;
`;

const FilterButton = styled.button`
    background: none;
    padding:0;
    border:0;
    width:56px;
    height:56px;

    & p {
        background:white;
        border-radius:50%;
        width:100%;
        height:100%;
    }
`
