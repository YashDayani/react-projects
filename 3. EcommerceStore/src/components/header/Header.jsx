import React from 'react'
import './header.css'
import Logo from '../../assets/images/logo.svg'
import searchIcon from '../../assets/images/search.png'
import profileIcon from '../../assets/images/profile.png'
import menuIcon from '../../assets/images/menu.svg'
import phoneIcon from '../../assets/images/phone.svg'
import mailIcon from '../../assets/images/mail.svg'

const Header = () => {
  return (
    <header className="header container" id="header">
        <div className="header-top">
            <div className="header-top-left">
                <div>
                <img src={Logo} className="header-logo"/>
                </div>
                <div className="header-search">
                    <input className='header-search-input' type="text" />
                    <img src={searchIcon} className="header-search-icon" />
                </div>
            </div>

            <div className="header-top-left">
                <div className='header-shop'>
                    <span>$349.50</span>
                    <div>
                        <svg className="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
                            <g id="Cart" transform="translate(0 0.148)">
                                <circle id="Ellipse_1" data-name="Ellipse 1" cx="21" cy="21" r="21"
                                    transform="translate(0 -0.148)" fill="#cbe3d6" />
                                <path id="Path_2" data-name="Path 2"
                                    d="M19,7H16V6A4,4,0,0,0,8,6V7H5A1,1,0,0,0,4,8V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V8A1,1,0,0,0,19,7ZM10,6a2,2,0,0,1,4,0V7H10Zm8,13a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9H8v1a1,1,0,0,0,2,0V9h4v1a1,1,0,0,0,2,0V9h2Z"
                                    transform="translate(8.939 9)" fill="#017234" />
                            </g>
                        </svg>

                        <svg className="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
                            <g id="Fav" transform="translate(0 0.148)">
                                <circle id="Ellipse_1" data-name="Ellipse 1" cx="21" cy="21" r="21"
                                    transform="translate(0 -0.148)" fill="#fdeddd" />
                                <path id="Path_1" data-name="Path 1"
                                    d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22a6.27,6.27,0,0,0,0-8.84Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.243,4.243,0,1,1,6-6,1,1,0,0,0,1.42,0,4.271,4.271,0,0,1,6.08,6Z"
                                    transform="translate(8.951 8.879)" fill="#f6a551" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="header-profile">
                    <p>Hello, <span>Mateusz</span></p>

                    <img src={profileIcon} className="header-profile-icon"/>

                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="4.741" viewBox="0 0 8 4.741">
                        <path id="Path_5" data-name="Path 5"
                            d="M14.53,9.1a.759.759,0,0,0-1.07,0l-2.724,2.686L8.049,9.1a.759.759,0,1,0-1.07,1.078L10.2,13.4a.759.759,0,0,0,1.078,0l3.256-3.218a.759.759,0,0,0,0-1.078Z"
                            transform="translate(-6.754 -8.879)" fill="#7d7d7d" />
                    </svg>

                </div>
            </div>
        </div>
        <div className="header-bottom">
              <div className="header-bottom-left">
                  <nav className='header-nav'>
                      <div className='header-nav-component'>
                            <img src={menuIcon} className="menu-icon" />
                          <p>Select Category</p>
                      </div>

                      <div className='header-nav-component'>
                          <p>New Products</p>
                          <p>Best Sales</p>
                          <p>Promotions</p>
                      </div>

                      <div className='header-nav-component'>
                          <p>Recipes</p>
                      </div>
                  </nav>
              </div>
            <div className="header-bottom-right">
                <p className='header-contact'>help@foodco.in 
                    <img src={mailIcon} />
                </p>
                <p className='header-contact'>+91 93549-18475
                    <img src={phoneIcon} />
                </p>
            </div>
        </div>
    </header>
  )
}

export default Header
