import React from 'react'
import './slider.css'
import arrowLeftIcon from '../../assets/images/arrow-left.svg'
import arrowRightIcon from '../../assets/images/arrow-right.svg'

const Slider = () => {
  return (
    <section className="slider container" id="slider">
        <a className='btn-round' href="#">
            <img src={arrowLeftIcon} className='slider-button'/>
        </a>
        <div className="slider-items">
            <div className="slider-item"></div>
            <div className="slider-item"></div>
            <div className="slider-item"></div>
            <div className="slider-item"></div>
            <div className="slider-item"></div>
            <div className="slider-item"></div>
        </div>
        <a className='btn-round' href="#">
            <img src={arrowRightIcon} className='slider-button' />
        </a>

    </section>
  )
}

export default Slider
