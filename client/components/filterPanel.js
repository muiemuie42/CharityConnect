import React from 'react'

export default function FilterPanel() {
    return (
        <div>
          <div className="filterContainer">
            <label htmlFor="categoryName">CategoryName</label>
            <select id="categoryName">
              <option value="" disabled>
                Animals
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <label htmlFor="state">State</label>
            <select id="state">
              <option value="" disabled>
                NY
              </option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <input type="submit" value="Submit" onClick={() => fetchData()} />
          </div>
        </div>
    )
}
