import React from 'react'

export default function Category() {
    return (
        <div>
            <label htmlFor="category">Category</label>
            <select id="category">
              <option value="">All Categories</option>
              <option value="Animals">Animals</option>
              <option value="Arts, Culture, Humanities">Arts, Culture, Humanities</option>
              <option value="Education">Education</option>
              <option value="Environment">Environment</option>
              <option value="Health">Health</option>
              <option value="Human Services">Human Services</option>
              <option value="International">International</option>
              <option value="Human and Civil Rights">Human and Civil Rights</option>
              <option value="Religion">Religion</option>
              <option value="Community Development">Community Development</option>
              <option value="Research and Public Policy">Research and Public Policy</option>
            </select>
        </div>
    )
}
