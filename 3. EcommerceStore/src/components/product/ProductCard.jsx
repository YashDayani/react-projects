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
          <span className="hero-product-category item-category">{category}</span><br />
          <span className="hero-product-name item-name">{name}</span><br />
          {weight && <span className="hero-product-weight item-weight">{weight}</span>}<br />
          <span className="hero-product-price item-price">
            {discountedPrice ? (
              <>
                <span className="discounted-price">₹{discountedPrice.toFixed(2)}</span>
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
