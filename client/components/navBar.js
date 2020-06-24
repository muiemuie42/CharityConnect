/**
 * ************************************
 *
 * @module  NavBar.jsx
 * @author
 * @date
 * @description manages navbar application
 *
 * ************************************
 */

import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
       <nav className="navbar">
         <span className="navlink"><Link to="/"></Link>Home Page</span>
         <span className="navlink"><Link to="/signup">Sign Up</Link></span>
         <span className="navlink"><Link to="/about">About</Link></span>
       </nav>
    )
}

export default NavBar;
