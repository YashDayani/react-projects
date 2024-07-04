import React from 'react'
import './product.css'
import laysImg from '../../assets/images/lays.jpg'

const Product = () => {
    return (
        <section class="products container">
            <div class="product-header">
                <div class="product-page-title">
                    <span className='product-header-text'>TRENDING</span>
                </div>
                <div class="product-page-filter">
                    <span className='product-header-text'>NEW PRODUCTS</span>
                    <span className='product-header-text'>FEATURED</span>
                    <span className='product-header-text'>BEST SELLER</span>
                    <span className='product-header-text'>DISCOUNTED PRODUCTS</span>
                </div>
            </div>
            <div className="product-area">
            <div class="product-card-wrapper">
                <div className='product-card'>
                    <img src={laysImg} className='product-img' />
                    <div className='hero-product-info'>
                        <span className='hero-product-category item-category'>Snacks</span><br />
                        <span className='hero-product-name item-name'>Lays Cream & Onion</span><br />
                        <span className='hero-product-name item-name'>30g</span><br />
                        <span className='hero-product-price item-price'>$8.99 <span className='og-item-price'>$9.99</span></span>
                    </div>
                    <div className="product-discount">
                        <span>-10%</span>
                    </div>
                    <div className="product-arival">
                        <span>NEW</span>
                    </div>
                    <div className="product-interaction">
                        <a href="#" className='hero-details-btn round-btn'>DETAILS</a>
                    </div>
                </div>
            </div>

            </div>
        </section>
    )
}

export default Product
