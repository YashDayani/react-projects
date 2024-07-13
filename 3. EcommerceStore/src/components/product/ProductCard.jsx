import React from 'react';

const ProductCard = ({ product, currencySymbol = '$' }) => {
  const { img, name, category, weight, price, discount } = product;

  // Calculate the discounted price if discount is available
  const discountedPrice = discount ? price - (price * discount / 100) : null;

  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  }

  if (!product || !name) {
    return null; // or return a placeholder component
  }

  return (
    <div className="product-card-wrapper">
      <div className="product-card">
        <img 
          src={img} 
          className="product-img" 
          alt={name} 
          onError={(e) => {e.target.onerror = null; e.target.src = 'path/to/placeholder-image.jpg'}}
        />
        <div className="hero-product-info">
          <div className="hero-product-category item-category">{category}</div>
          <div className="hero-product-name item-name">{name}</div>
          {weight && <div className="hero-product-weight item-weight">{weight}</div>}
          <span className="hero-product-price item-price">
            {discountedPrice ? (
              <>
                <span className="discounted-price">{currencySymbol}{formatPrice(discountedPrice)}</span>
                <span className="og-item-price">{currencySymbol}{formatPrice(price)}</span>
              </>
            ) : (
              <span className="price">{currencySymbol}{formatPrice(price)}</span>
            )}
          </span>
        </div>
        {discount && <div className="product-discount"><span>{discount}% OFF</span></div>}
        <div className="product-interaction">
          <button className="hero-details-btn round-btn">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;