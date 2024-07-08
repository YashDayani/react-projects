import React, { useContext, useEffect, useState } from 'react';
import { dataFruitsnVeges, dataHerb, dataDairy, dataOils, dataFrozen, dataSeeds, productNav } from './Data';
import ProductCard from './ProductCard';
import { ProductContext } from './ProductContext';

const Products = () => {
  const { productChoise } = useContext(ProductContext);

  // Define all available products
  const allProducts = {
    dataFruitsnVeges,
    dataHerb,
    dataDairy,
    dataOils,
    dataFrozen,
    dataSeeds,
  };

  // Find the index of "All" in productNav for default selection
  const defaultIndex = productNav.findIndex(item => item.filter === "All");

  // State to manage selected product filter
  const [product, setProduct] = useState({ name: "All" });

  // State to manage all products
  const [allProjectsState, setAllProjectsState] = useState(Object.values(allProducts).flat());

  // State to manage filtered projects based on selected product filter
  const [filteredProjects, setFilteredProjects] = useState(allProjectsState);

  // State to manage active filter index
  const [active, setActive] = useState(defaultIndex);

  // Combined effect to handle both productChoise changes and filtering
  useEffect(() => {
    let baseProjects = productChoise ? allProducts[productChoise] : Object.values(allProducts).flat();
    setAllProjectsState(baseProjects);

    let newProjects;
    if (product.name === "Discount") {
      newProjects = baseProjects.filter(project => project.discount > 0);
    } else if (product.name === "High to Low") {
      newProjects = [...baseProjects].sort((a, b) => b.price - a.price);
    } else if (product.name === "Low to High") {
      newProjects = [...baseProjects].sort((a, b) => a.price - b.price);
    } else if (product.name !== "All") {
      newProjects = baseProjects.filter(project => project.filter.toLowerCase() === product.name.toLowerCase());
    } else {
      newProjects = baseProjects;
    }
    setFilteredProjects(newProjects);
  }, [productChoise, product, allProducts]);

  // Handle click on product filters
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
        {filteredProjects.map((product, index) => (
          <ProductCard product={product} key={product.id || index} />
        ))}
      </div>
    </div>
  );
};

export default Products;