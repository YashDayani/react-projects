import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../product/ProductContext';
import './slider.css';
import arrowLeftIcon from '../../assets/images/arrow-left.svg';
import arrowRightIcon from '../../assets/images/arrow-right.svg';
import cat1Icon from '../../assets/images/cat1.png';
import cat2Icon from '../../assets/images/cat2.png';
import cat3Icon from '../../assets/images/cat3.png';
import cat4Icon from '../../assets/images/cat4.png';
import cat5Icon from '../../assets/images/cat5.png';
import cat6Icon from '../../assets/images/cat6.png';


const Slider = () => {
  const { productChoise, setProductChoise } = useContext(ProductContext);

  useEffect(() => {
    setProductChoise('dataFruitsnVeges');
  }, []);

  const handleItemClick = (category) => {
    setProductChoise(category);
  };

  return (
    <section className="slider container" id="slider">
      <a className='btn-round' href="#">
        <img src={arrowLeftIcon} className='slider-button' alt="Left Arrow" />
      </a>
      <div className="slider-items">
        <div className="slider-item" onClick={() => handleItemClick('dataFruitsnVeges')}>
          <img className='slider-item-img' src={cat1Icon} alt="Fruits and Vegetables" />
          <span className='slider-item-name'>Fruits <br /> & Veges</span>
        </div>
        <div className="slider-item" onClick={() => handleItemClick('dataHerb')}>
          <img className='slider-item-img' src={cat2Icon} alt="Herbs" />
          <span className='slider-item-name'>Herbs</span>
        </div>
        <div className="slider-item" onClick={() => handleItemClick('dataDairy')}>
          <img className='slider-item-img' src={cat3Icon} alt="Dairy Items" />
          <span className='slider-item-name'>Dairy <br /> Item</span>
        </div>
        <div className="slider-item" onClick={() => handleItemClick('dataOils')}>
          <img className='slider-item-img' src={cat4Icon} alt="Oils and Ghee" />
          <span className='slider-item-name'>Oils <br /> & Ghee</span>
        </div>
        <div className="slider-item" onClick={() => handleItemClick('dataFrozen')}>
          <img className='slider-item-img' src={cat5Icon} alt="Frozen Items" />
          <span className='slider-item-name'>Frozen <br /> Item</span>
        </div>
        <div className="slider-item" onClick={() => handleItemClick('dataSeeds')}>
          <img className='slider-item-img' src={cat6Icon} alt="Seeds and Nuts" />
          <span className='slider-item-name'>Seeds <br /> & Nuts</span>
        </div>
      </div>
      <a className='btn-round' href="#">
        <img src={arrowRightIcon} className='slider-button' alt="Right Arrow" />
      </a>
    </section>
  );
};

export default Slider;
