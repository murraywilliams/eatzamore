import React from 'react';
import styled from 'styled-components';

const FilterButton = styled.button`
    background-color: #D65C40;
    color: white;
    padding: 5px;
`

const Filters = (props) => {

    const filters = props.categories.map((category)=>{
        return <FilterButton key={`filter-${category}`} onClick={() =>props.filterMenu(category)}>{category}</FilterButton>
    });

    return (
        <div>
            <h3>Filter Categories</h3>
            {filters}
            <hr />
        </div>
    )
}

export default Filters