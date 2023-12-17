import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav>
            <header>Box<span>Link</span></header> 
            <ul>
                <li> <Link to='/'>Home</Link></li>
                <li> <Link to='/about'>About</Link></li>
                <li> <Link to='/rules'>How to play</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar