import React, { useEffect, useState } from 'react';
import { productData, productNav } from './Data';
import ProductCard from './ProductCard';

const Works = () => {
  // Find the index of the "FEATURED" tab in productNav
  const defaultIndex = productNav.findIndex(item => item.filter === "FEATURED");

  // Set initial state
  const [product, setProduct] = useState({ name: "FEATURED" });
  const [projects, setProjects] = useState(productData.filter(project => project.filter === "FEATURED"));
  const [active, setActive] = useState(defaultIndex);

  useEffect(() => {
    // Filter projects based on selected product name
    const newProjects = productData.filter(project => {
      if (product.name === "DISCOUNTED PRODUCTS") {
        return project.discount > 0; // Only include products with discount
      } else {
        return project.filter.toLowerCase() === product.name.toLowerCase();
      }
    });
    setProjects(newProjects);
  }, [product]);

  const handleClick = (e, index) => {
    setProduct({ name: e.target.textContent });
    setActive(index);
  };

  return (
    <div className="works-wrapper">
      <div className="product-header">
        <div className="product-page-title">
          <span className="product-header-text">TRENDING</span>
        </div>
        <div className="product-page-filter">
          {productNav.map((navItem, index) => (
            <span
              onClick={(e) => handleClick(e, index)}
              className={`${active === index ? "product-active" : ""} product-header-text`}
              key={index}
            >
              {navItem.filter}
            </span>
          ))}
        </div>
      </div>
      <div className="product-area">
        {projects.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Works;
