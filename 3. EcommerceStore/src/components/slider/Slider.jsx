import React from 'react'
import './slider.css'
import arrowLeftIcon from '../../assets/images/arrow-left.svg'
import arrowRightIcon from '../../assets/images/arrow-right.svg'
import cat1Icon from '../../assets/images/cat1.png'
import cat2Icon from '../../assets/images/cat2.png'
import cat3Icon from '../../assets/images/cat3.png'
import cat4Icon from '../../assets/images/cat4.png'
import cat5Icon from '../../assets/images/cat5.png'
import cat6Icon from '../../assets/images/cat6.png'

const Slider = () => {
  return (
    <section className="slider container" id="slider">
        <a className='btn-round' href="#">
            <img src={arrowLeftIcon} className='slider-button'/>
        </a>
        <div className="slider-items">
            <div className="slider-item">
              <img className='slider-item-img' src={cat1Icon} />
              <span className='slider-item-name'>Fruits <br /> & Veges</span>
            </div>
            <div className="slider-item">
              <img className='slider-item-img' src={cat2Icon} />
              <span className='slider-item-name'>Herbs</span>
            </div>
            <div className="slider-item">
              <img className='slider-item-img' src={cat3Icon} />
              <span className='slider-item-name'>Dairy <br />Item</span>
            </div>
            <div className="slider-item">
              <img className='slider-item-img' src={cat4Icon} />
              <span className='slider-item-name'>Oils <br /> & Ghee</span>
            </div>
            <div className="slider-item">
              <img className='slider-item-img' src={cat5Icon} />
              <span className='slider-item-name'>Frozen <br /> Item</span>
            </div>
            <div className="slider-item">
              <img className='slider-item-img' src={cat6Icon} />
              <span className='slider-item-name'>Seeds <br /> & Nuts</span>
            </div>
        </div>
        <a className='btn-round' href="#">
            <img src={arrowRightIcon} className='slider-button' />
        </a>

    </section>
  )
}

export default Slider
