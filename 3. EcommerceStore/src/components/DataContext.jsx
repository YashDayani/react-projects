import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productChoise, setProductChoise] = useState('');
  const [product, setProduct] = useState({ name: 'All' });

  return (
    <ProductContext.Provider value={{ productChoise, setProductChoise, product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
