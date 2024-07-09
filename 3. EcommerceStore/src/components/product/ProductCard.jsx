import React from 'react';

const ProductCard = ({ product }) => {
  const { img, name, category, weight, price, discount} = product;

  // Calculate the discounted price if discount is available
  const discountedPrice = discount ? price - (price * discount / 100) : null;

  return (
    <div className="product-card-wrapper">
      <div className="product-card">
        <img src={img} className="product-img" alt={name} />
        <div className="hero-product-info">
          <div className="hero-product-category item-category">{category}</div>
          <div className="hero-product-name item-name">{name}</div>
          {weight && <div className="hero-product-weight item-weight">{weight}</div>}
          <span className="hero-product-price item-price">
            {discountedPrice ? (
              <>
                <span className="discounted-price">₹{Math.floor(discountedPrice.toFixed(2))}.00</span>
                <span className="og-item-price">₹{price.toFixed(2)}</span>
              </>
            ) : (
              <span className="price">₹{price.toFixed(2)}</span>
            )}
          </span>
        </div>
        {discount && <div className="product-discount"><span>{discount}% OFF</span></div>}
        <div className="product-interaction">
          <a href="#" className="hero-details-btn round-btn">ADD TO CART</a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
