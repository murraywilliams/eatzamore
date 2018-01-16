import React from 'react'

const Filters = (props) => {

    const filters = props.categories.map((val)=>{
        return <button key={`filter-${val}`} onClick={() =>props.filterMenu(val)}>{val}</button>
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