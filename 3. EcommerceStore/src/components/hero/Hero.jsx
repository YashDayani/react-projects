import React from 'react'
import './hero.css'
import laysImg from '../../assets/images/lays.jpg'

const Hero = () => {
    return (
        <section className="hero container">
            <div className="hero-main">
                <div className="div1 hero-box hero-box-main">
                    <div className='hero-box-product'>
                        <span className='hero-product-status'>NEW PRODUCT</span>
                        <h1 className='hero-product-title'>Top quality seafood <br /> from Royal Blue</h1>
                        <div className='hero-product-info'>
                            <span className='hero-product-category item-category'>Seafood & Fish</span><br />
                            <span className='hero-product-name item-name'>Royal Blue Medium Shrimp</span><br />
                            <span className='hero-product-price item-price'>$8.99</span>
                        </div>
                        <img className='hero-product-img' src={laysImg} alt="" />
                        <a href="#" className='hero-details-btn round-btn'>DETAILS</a>
                    </div>
                    <div className='hero-box-img'></div>
                </div>
                <div className="div2 hero-box"></div>
                <div className="div3 hero-box"></div>
            </div>

        </section>
    )
}

export default Hero
