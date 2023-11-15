import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav>
            <header>Box<span>Link</span></header> 
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="about">About</a></li>
                <li><a href="rules">How to play</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar