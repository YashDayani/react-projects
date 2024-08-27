import React from 'react'
import { assets } from '../../assets/assets'

import './Header.css'

const Header = () => {
  return (
    <header>
        <div className="top-banner">
            <span>Subscribe to our Newsletter For New & latest Blogs and Resources</span>
            <img src={assets.up_arrow} />
        </div>
        <nav className='navbar'>
            <div className="logo">
                <img src={assets.logo} alt="" />
            </div>
            <div className="nav-btns">
                <ul>
                    <li className='nav-active'>Home</li>
                    <li>News</li>
                    <li>Podcast</li>
                    <li>Resources</li>
                </ul>
            </div>
            <div className="nav-cta">
                <a href="#">Contact Us</a>
            </div>
        </nav>
    </header>
  )
}

export default Header
