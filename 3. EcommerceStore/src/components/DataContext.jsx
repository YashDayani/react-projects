import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [productChoise, setProductChoise] = useState('');
  const [product, setProduct] = useState({ name: 'All' });
  const [currency, setCurrency] = useState('inr'); // Add state for currency
  const exchangeRates = {
    inr: 1,
    usd: 0.012, // Example rate: 1 INR = 0.013 USD
    eur: 0.011, // Example rate: 1 INR = 0.011 EUR
    yen: 1.93, // Example rate: 1 INR = 1.45 YEN
  };

  return (
    <DataContext.Provider value={{ productChoise, setProductChoise, product, setProduct, currency, setCurrency, exchangeRates }}>
      {children}
    </DataContext.Provider>
  );
};
