import React, { useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Header.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsMobileMenuOpen(prevState => !prevState);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    return (
        <header>
            <div className="top-banner">
                <span>Subscribe to our Newsletter For Blogs and Resources</span>
                <img className='up_arror_img' src={assets.up_arrow} alt="up arrow" />
            </div>
            
            <nav className='navbar' role="navigation">
                <div className="logo">
                    <img src={assets.logoEx} alt="Logo" />
                </div>

                {/* Wrap nav-links in a div with mobile-specific class */}
                <div className={`mobile-nav-container ${isMobileMenuOpen ? 'active' : ''}`}>
                    <ul className="nav-links">
                        <li>
                            <NavLink 
                                to="/" 
                                end 
                                className={({ isActive }) => isActive ? 'nav-active' : ''}
                                onClick={closeMenu}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/news" 
                                className={({ isActive }) => isActive ? 'nav-active' : ''}
                                onClick={closeMenu}
                            >
                                News
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/podcasts" 
                                className={({ isActive }) => isActive ? 'nav-active' : ''}
                                onClick={closeMenu}
                            >
                                Podcasts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/resources" 
                                className={({ isActive }) => isActive ? 'nav-active' : ''}
                                onClick={closeMenu}
                            >
                                Resources
                            </NavLink>
                        </li>
                        {/* Add mobile-specific contact link */}
                        <li className="mobile-contact-link">
                            <Link to="/contact" onClick={closeMenu}>
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="nav-cta">
                    <Link to="/contact">Contact Us</Link>
                </div>

                <div 
                    className="hamburger" 
                    onClick={toggleMenu}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? (
                        <img className='menu_icons' src={assets.menu_close} alt="close menu" />
                    ) : (
                        <img className='menu_icons' src={assets.menu_open} alt="open menu" />
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;