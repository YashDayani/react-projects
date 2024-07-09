import React from 'react'
import './footer.css'

import Logo from '../../assets/images/logo.svg'
import Icon1 from '../../assets/images/icon-1.svg'
import Icon2 from '../../assets/images/icon-2.svg'
import Icon3 from '../../assets/images/icon-3.svg'
import Icon4 from '../../assets/images/icon-4.svg'
import Icon5 from '../../assets/images/icon-5.svg'
import playstoreImg from '../../assets/images/google-play.jpg'
import appstoreImg from '../../assets/images/app-store.jpg'
const Footer = () => {
    return (
        <footer className="footer" id="footer">
            <div className="footer-top-wrapper">
                <div className="footer-top">
                    <div className="footer-features-items">
                        <div className="footer-features-title">
                            <img src={Icon1} alt="" />
                            <h4>Easy <br /> Payment</h4>
                        </div>
                        <div className="footer-features-discription">
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolorem non libero?</span>
                        </div>
                    </div>
                    <div className="footer-features-items">
                        <div className="footer-features-title">
                            <img src={Icon2} alt="" />
                            <h4>Easy <br /> Payment</h4>
                        </div>
                        <div className="footer-features-discription">
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolorem non libero?</span>
                        </div>
                    </div>
                    <div className="footer-features-items">
                        <div className="footer-features-title">
                            <img src={Icon3} alt="" />
                            <h4>Easy <br /> Payment</h4>
                        </div>
                        <div className="footer-features-discription">
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolorem non libero?</span>
                        </div>
                    </div>
                    <div className="footer-features-items">
                        <div className="footer-features-title">
                            <img src={Icon4} alt="" />
                            <h4>Easy <br /> Payment</h4>
                        </div>
                        <div className="footer-features-discription">
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolorem non libero?</span>
                        </div>
                    </div>
                    <div className="footer-features-items">
                        <div className="footer-features-title">
                            <img src={Icon5} alt="" />
                            <h4>Easy <br /> Payment</h4>
                        </div>
                        <div className="footer-features-discription">
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolorem non libero?</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-middle">
                <div className="footer-middle-left">
                    <div>
                        <p>Newsletter</p>
                        <span>Don't miss any promotion</span>
                        <div><input className='footer-email-input' type="text" placeholder='Email address' /><a href="#" className='round-btn footer-newsletter-btn'>SIGN UP</a></div>
                    </div>
                    <div>
                        <img src={Icon1} alt="" />
                    </div>
                </div>
                <div className="footer-middle-right">
                    <div>
                        <p>Mobile App</p>
                        <span>Check promotions, which are available in the application.</span>
                        <div className='app-imgs'>
                            <img src={appstoreImg} />
                            <img src={playstoreImg} />
                        </div>
                    </div>
                    <div>
                        <img src={Icon1} alt="" />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-bottom-wrapper">
                <div className="footer-bottom-main">
                    <div>
                        <img src={Logo} className='footer-logo'/>
                    </div>
                    <div className='footer-links'>
                        <a href="">Home</a>
                        <a href="">About</a>
                        <a href="">Services</a>
                        <a href="">Blog</a>
                        <a href="">Contact</a>
                    </div>
                    <div className="footer-social"></div>
                    <div className="copyright-text">
                <p>Copyright © 2024 by Nest MART. All Rights Reserved</p>
            </div>
                </div>
            </div>
            </div>
        </footer>
    )
}

export default Footer
