import React from 'react'
import Category from './category';
import Advisory from './advisory';
import State from './state';
import Cause from './cause';


// address - city, state, zip
// category - category
// cause 
// ratingNumber
// advisory



export default function FilterPanel({fetchData}) {
    return (
        <div>
          <div className="filterContainer">
            <Category />
            <State />
            <Cause />
            <input type="submit" value="Submit" onClick={() => fetchData()} />
          </div>
        </div>
    )
}

//onClick={this.props.handleClick}

