import React from 'react'

const Filters = (props) => {

    const filters = props.categories.map((category)=>{
        return <button key={`filter-${category}`} onClick={() =>props.filterMenu(category)}>{category}</button>
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