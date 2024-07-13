import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { dataFruitsnVeges, dataHerb, dataDairy, dataOils, dataFrozen, dataSeeds, productNav } from './Data';
import ProductCard from './ProductCard';
import { DataContext } from '../DataContext';

const Products = () => {
  const { productChoise, currency, exchangeRates } = useContext(DataContext);

  // Define all available products
  const allProducts = useMemo(() => ({
    dataFruitsnVeges,
    dataHerb,
    dataDairy,
    dataOils,
    dataFrozen,
    dataSeeds,
  }), []);

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

  // Function to convert prices based on the selected currency
  const convertPrice = useCallback((price) => {
    const numericPrice = parseFloat(price) || 0;
    return (numericPrice * (exchangeRates[currency] || 1)).toFixed(2);
  }, [currency, exchangeRates]);

  // Combined effect to handle both productChoise changes and filtering
  useEffect(() => {
    let baseProjects = productChoise ? allProducts[productChoise] : Object.values(allProducts).flat();
    
    // Convert prices for all products
    baseProjects = baseProjects.map(project => ({
      ...project,
      convertedPrice: convertPrice(project.price)
    }));

    setAllProjectsState(baseProjects);

    let newProjects;
    if (product.name === "Discount") {
      newProjects = baseProjects.filter(project => project.discount > 0);
    } else if (product.name === "High to Low") {
      newProjects = [...baseProjects].sort((a, b) => parseFloat(b.convertedPrice) - parseFloat(a.convertedPrice));
    } else if (product.name === "Low to High") {
      newProjects = [...baseProjects].sort((a, b) => parseFloat(a.convertedPrice) - parseFloat(b.convertedPrice));
    } else if (product.name !== "All") {
      newProjects = baseProjects.filter(project => project.filter.toLowerCase() === product.name.toLowerCase());
    } else {
      newProjects = baseProjects;
    }
    setFilteredProjects(newProjects);
  }, [productChoise, product, convertPrice, allProducts]);

  // Handle click on product filters
  const handleClick = (filterName, index) => {
    setProduct({ name: filterName });
    setActive(index);
  };

  const getDisplayName = useCallback(() => {
    switch (productChoise) {
      case 'dataFruitsnVeges': return 'Fruits & Veges';
      case 'dataHerb': return 'Herbs';
      case 'dataDairy': return 'Dairy Items';
      case 'dataOils': return 'Oils & Ghee';
      case 'dataFrozen': return 'Frozen Items';
      case 'dataSeeds': return 'Seeds & Nuts';
      default: return 'All Products';
    }
  }, [productChoise]);

  const getCurrencySymbol = useCallback((currency) => {
    switch(currency) {
      case 'usd': return '$';
      case 'eur': return '€';
      case 'yen': return '¥';
      default: return '₹'; // INR
    }
  }, []);

  return (
    <div className="works-wrapper">
      <div className="product-header">
        <div className="product-page-title">
          <span className="product-header-text">{getDisplayName()}</span>
        </div>
        <div className="product-page-filter">
          {productNav.map((navItem, index) => (
            <button
              onClick={() => handleClick(navItem.filter, index)}
              className={`${active === index ? "product-active" : ""} product-header-text`}
              key={index}
            >
              {navItem.filter}
            </button>
          ))}
        </div>
      </div>
      <div className="product-area">
        {filteredProjects.map((product, index) => (
          <ProductCard 
            product={{
              ...product,
              price: product.convertedPrice
            }}
            currencySymbol={getCurrencySymbol(currency)}
            key={product.id || index} 
          />
        ))}
      </div>
    </div>
  );
};

export default Products;