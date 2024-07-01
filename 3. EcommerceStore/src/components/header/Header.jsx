import React from 'react'
import './header.css'
import Logo from '../../assets/images/logo.svg'
import searchIcon from '../../assets/images/search.png'

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
                        <svg className="cart-icon icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
                            <g id="Cart" transform="translate(0 0.148)">
                                <circle id="Ellipse_1" data-name="Ellipse 1" cx="21" cy="21" r="21"
                                    transform="translate(0 -0.148)" fill="#cbe3d6" />
                                <path id="Path_2" data-name="Path 2"
                                    d="M19,7H16V6A4,4,0,0,0,8,6V7H5A1,1,0,0,0,4,8V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V8A1,1,0,0,0,19,7ZM10,6a2,2,0,0,1,4,0V7H10Zm8,13a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9H8v1a1,1,0,0,0,2,0V9h4v1a1,1,0,0,0,2,0V9h2Z"
                                    transform="translate(8.939 9)" fill="#017234" />
                            </g>
                        </svg>

                        <svg className="fav-icon icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
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

                    <img src={searchIcon} alt="" />

                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="4.741" viewBox="0 0 8 4.741">
                        <path id="Path_5" data-name="Path 5"
                            d="M14.53,9.1a.759.759,0,0,0-1.07,0l-2.724,2.686L8.049,9.1a.759.759,0,1,0-1.07,1.078L10.2,13.4a.759.759,0,0,0,1.078,0l3.256-3.218a.759.759,0,0,0,0-1.078Z"
                            transform="translate(-6.754 -8.879)" fill="#7d7d7d" />
                    </svg>

                </div>
            </div>
        </div>
        {/* <div className="secBottom">
            <div className="partLeft">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="6" viewBox="0 0 16 6">
                        <g id="Group_15" data-name="Group 15" transform="translate(-2396 -216)">
                          <line id="Line_4" data-name="Line 4" x2="16" transform="translate(2396 217)" fill="none" stroke="#404040" stroke-width="2"/>
                          <line id="Line_5" data-name="Line 5" x2="10" transform="translate(2396 221)" fill="none" stroke="#404040" stroke-width="2"/>
                        </g>
                      </svg>
                      <p>Select Category</p>
                </div>
                <div>
                    <p>New Products</p>
                      <p>Best Sales</p>
                      <p>Promotions</p>
                </div>
                <div>
                    <p>Recipes</p>
                </div>
            </div>
            <div className="partRight">
                <p style="color: #7c9834;">help@foodco.in 
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 17.999">
                    <path id="Path_3" data-name="Path 3" d="M20.21,8.138h0L14,2.7a3.062,3.062,0,0,0-3.9,0L3.89,8.1h0A2.25,2.25,0,0,0,3,9.839v7.722A2.632,2.632,0,0,0,5.78,20H18.22A2.632,2.632,0,0,0,21,17.561V9.839a2.29,2.29,0,0,0-.79-1.7ZM11.44,4a.9.9,0,0,1,1.12,0L18,8.75,12.53,13.5a.9.9,0,0,1-1.12,0L6,8.75ZM19,17.561a.734.734,0,0,1-.78.639H5.78A.734.734,0,0,1,5,17.561V10.415l4.05,3.51-1.66,1.44c-.388.351-3.888,3.152-3.5,3.5a7.4,7.4,0,0,0,2,.132A27.4,27.4,0,0,0,8.8,16.661l1.77-1.53a3.068,3.068,0,0,0,2.92,0l1.77,1.53A24.333,24.333,0,0,0,18,18.868c.272,0,2.022.51,2.21.332.388-.351-3.152-3.484-3.54-3.835L15,13.925l4-3.51Z" transform="translate(-3 -2.001)" fill="#7c9834"/>
                  </svg>
                  </p>
                <p style="color: #027335;">+91 93549-18475
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 17.999">
                        <path id="Path_4" data-name="Path 4" d="M17.751,11.968a2.835,2.835,0,0,1-.605-.109,8.508,8.508,0,0,1-1.183-.353,1.8,1.8,0,0,0-2.24.906l-.2.408a11,11,0,0,1-2.4-1.812A11.03,11.03,0,0,1,9.314,8.6l.379-.254A1.814,1.814,0,0,0,10.6,6.1a9.377,9.377,0,0,1-.352-1.187c-.045-.2-.081-.408-.108-.616A2.712,2.712,0,0,0,7.427,2.04H4.717a2.715,2.715,0,0,0-2.71,3.089,17.186,17.186,0,0,0,14.922,14.91h.343a2.707,2.707,0,0,0,2.71-2.727V14.595A2.715,2.715,0,0,0,17.751,11.968ZM18.2,17.4a.907.907,0,0,1-.307.679.947.947,0,0,1-.741.226A15.377,15.377,0,0,1,3.868,4.921a.989.989,0,0,1,.226-.743.9.9,0,0,1,.677-.308h2.71a.9.9,0,0,1,.9.716q.054.371.135.734a10.1,10.1,0,0,0,.415,1.4l-1.265.589a.907.907,0,0,0-.443,1.2,13.107,13.107,0,0,0,6.323,6.341.956.956,0,0,0,1.2-.471l.56-1.268a12.339,12.339,0,0,0,1.427.417q.361.082.732.136a.905.905,0,0,1,.714.906Z" transform="translate(-1.982 -2.04)" fill="#027335"/>
                      </svg>
                      
                </p>
            </div>
        </div> */}
    </header>
  )
}

export default Header
