import React from 'react'
import { assets } from '../../assets/assets'

import './Header.css'

const Header = () => {
  return (
    <header>
        <div className="top-banner">
            <span>Subscribe to our Newsletter For Blogs and Resources</span>
            <img className='up_arror_img' src={assets.up_arrow} />
        </div>
        <nav className='navbar'>
            <div className="logo">
                <img src={assets.logoEx} alt="" />
            </div>
            <div className="nav-btns">
                <ul>
                    <li className='nav-active'><a href="/Home">Home</a></li>
                    <li><a href="/News"> News </a></li>
                    <li><a href="/Podcast"> Podcast </a></li>
                    <li><a href="/Resources"> Resources </a></li>
                </ul>
            </div>
            <div className="nav-cta">
                <a href="/contact">Contact Us</a>
            </div>
        </nav>
    </header>
  )
}

export default Header