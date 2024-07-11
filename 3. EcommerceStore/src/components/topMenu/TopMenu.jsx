import React, { useState } from 'react';
import './topmenu.css';

const TopMenu = () => {
  const [currency, setCurrency] = useState('inr');
  const [language, setLanguage] = useState('en');

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    // Perform any additional actions needed when the currency changes
    console.log(`Currency changed to: ${e.target.value}`);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Perform any additional actions needed when the language changes
    console.log(`Language changed to: ${e.target.value}`);
  };

  return (
    <div className="topMenu container" id="top">
      <div className="topMenu-selector">
        <select
          className='topMenu-select'
          name="currency"
          id="currency"
          value={currency}
          onChange={handleCurrencyChange}
        >
          <option value="inr">INR</option>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="yen">YEN</option>
        </select>

        <select
          className='topMenu-select'
          name="lang"
          id="lang"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">ENGLISH</option>
          <option value="hi">HINDI</option>
          <option value="fr">FRENCH</option>
          <option value="es">SPANISH</option>
        </select>
      </div>

      <div className='topMenu-links'>
        <ul className='topMenu-list'>
          <li>FAQ</li>
          <li>PRIVACY POLICY</li>
          <li>CONTACT US</li>
        </ul>
      </div>
    </div>
  );
};

export default TopMenu;