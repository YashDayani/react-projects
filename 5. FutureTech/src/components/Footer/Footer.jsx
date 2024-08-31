import React from 'react'

import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="cols-wrapper">
                    <a href='#' className="cols-title">Home</a>
                    <div className="cols-items">
                        <a href='#' className="cols-item">Features</a>
                        <a href='#' className="cols-item">Blogs</a>
                        <a href='#' className="cols-item">Resources <div className='new-pill'><span>New</span></div></a>
                        <a href='#' className="cols-item">Testimonials</a>
                        <a href='#' className="cols-item">Contact Us</a>
                        <a href='#' className="cols-item">Newsletter</a></div>
                </div>

                <div className="cols-wrapper">
                    <a href='#' className="cols-title">News</a>
                    <div className="cols-items">
                        <a href='#' className="cols-item">Trending Stories</a>
                        <a href='#' className="cols-item">Featured Videos</a>
                        <a href='#' className="cols-item">Technology</a>
                        <a href='#' className="cols-item">Health</a>
                        <a href='#' className="cols-item">Politics</a>
                        <a href='#' className="cols-item">Environment</a>
                    </div>
                </div>

                <div className="cols-wrapper">
                    <a href='#' className="cols-title">Blogs</a>
                    <div className="cols-items">
                        <a href='#' className="cols-item">Quantum Computing</a>
                        <a href='#' className="cols-item">AI Ethics</a>
                        <a href='#' className="cols-item">Space Exploration</a>
                        <a href='#' className="cols-item">Biotechnology <div className='new-pill'><span>New</span></div></a>
                        <a href='#' className="cols-item">Renewable Energy</a>
                        <a href='#' className="cols-item">Biohacking</a>
                    </div>
                </div>

                <div className="cols-wrapper">
                    <a href='#' className="cols-title">Podcasts</a>
                    <div className="cols-items">
                        <a href='#' className="cols-item">AI Revolution <div className='new-pill'><span>New</span></div></a>
                        <a href='#' className="cols-item">TechTalk AI</a>
                        <a href='#' className="cols-item">AI Conversations</a></div>
                </div>

                <div className="cols-wrapper">
                    <a href='#' className="cols-title">Resources</a>
                    <div className="cols-items">
                        <a href='#' className="cols-item">Whitepapers <img className='up_arror_img' src={assets.up_arrow} /></a>
                        <a href='#' className="cols-item">Ebooks <img className='up_arror_img' src={assets.up_arrow} /></a>
                        <a href='#' className="cols-item">Reports <img className='up_arror_img' src={assets.up_arrow} /></a>
                        <a href='#' className="cols-item">Research Papers <img className='up_arror_img' src={assets.up_arrow} /></a>
                    </div>
                </div>
            </div>

            <div className="footer-copyright">
                <div className="footer-copyright-wrapper">
                    <div className='links'>
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                    <div className='socials'><img src={assets.social_img} alt="" /></div>
                    <div className='copy'>© 2024 FutureTech. All rights reserved.</div>
                </div>
            </div>
        </footer>
    )
}


export default Footer
