import React from 'react'

import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <>
        <div className="footer-banner">
            <div className="top">
                    <img className='div1' src={assets.logo} alt="" />
                    <div className="subtitle div2">Learn, Connect, and Innovate</div>
                    <div className="title div3">Be Part of the Future Tech Revolution</div>
                    <div className="info div4">Immerse yourself in the world of future technology. Explore our comprehensive resources, connect with fellow tech enthusiasts, and drive innovation in the industry. Join a dynamic community of forward-thinkers.</div>
            </div>
            <div className="bottom">
                <div className="cards">
                    <div className="title">
                        <span> Resource Access</span>
                        <img src={assets.up_arrow_fill} alt="" /></div>
                    <div className="info">Visitors can access a wide range of resources, including ebooks, whitepapers, reports.</div>
                </div>
                <div className="cards">
                    <div className="title">
                        <span> Community Forum </span>
                        <img src={assets.up_arrow_fill} alt="" /></div>
                    <div className="info">Join our active community forum to discuss industry trends, share insights, and collaborate with peers.</div>
                </div>
                <div className="cards">
                    <div className="title">
                        <span> Tech Events </span>
                        <img src={assets.up_arrow_fill} alt="" /></div>
                    <div className="info">Stay updated on upcoming tech events, webinars, and conferences to enhance your knowledge.</div>
                </div>
            </div>
        </div>
        <footer className="footer">
            <div className="footer-top">
                <div className="cols-wrapper">
                    <a href='#' className="cols-title">Home</a>
                    <div className="cols-items">
                        <a href='/#features' className="cols-item">Features</a>
                        <a href='/#blogp' className="cols-item">Blogs</a>
                        <a href='/#resources' className="cols-item">Resources <div className='new-pill'><span>New</span></div></a>
                        <a href='/#testimonials' className="cols-item">Testimonials</a>
                        <a href='/contact' className="cols-item">Contact Us</a>
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
                        <a href='#' className="cols-item nav-btn">Whitepapers <img className='up_arror_img' src={assets.up_arrow} /></a>
                        <a href='#' className="cols-item nav-btn">Ebooks <img className='up_arror_img' src={assets.up_arrow} /></a>
                        <a href='#' className="cols-item nav-btn">Reports <img className='up_arror_img' src={assets.up_arrow} /></a>
                        <a href='#' className="cols-item nav-btn">Research Papers <img className='up_arror_img' src={assets.up_arrow} /></a>
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
        </>
    )
}


export default Footer
