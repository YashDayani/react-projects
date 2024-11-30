import React from 'react'
import './Contacts.css'
import { assets } from '../../assets/assets'

const Contacts = () => {
  return (
    <div className='contact-holder'>
      <div className='item'>
        <div className="title">General Inquiries</div>
        <div className="items">
            <a href="mailto:contact@ai-podcasts.com" className='nav-btn'> contact@ai-podcasts.com <img className='up_arror_img' src={assets.up_arrow} alt="" /></a>
            <a href="tel:+11234567890" className='nav-btn'> +1 (123) 456-7890 <img className='up_arror_img' src={assets.up_arrow} alt="" /></a>
        </div>
      </div>
      <div className='item'>
        <div className="title">Technical Support</div>
        <div className="items">
            <a href="mailto:contact@ai-podcasts.com" className='nav-btn'> contact@ai-podcasts.com <img className='up_arror_img' src={assets.up_arrow} alt="" /></a>
            <a href="tel:+11234567890" className='nav-btn'> +1 (123) 456-7890 <img className='up_arror_img' src={assets.up_arrow} alt="" /></a>
        </div>
      </div>
      <div className='item'>
        <div className="title">Our Office</div>
        <div className="items">
            <p className="address">Address: 123 AI Tech Avenue, Techville, 54321</p>
            <a href="#" className='nav-btn'> Get Directions <img className='up_arror_img' src={assets.up_arrow} alt="" /></a>
        </div>
      </div>
      <div className='item'>
        <div className="title">Connect with Us</div>
        <div className="items">
            <img src={assets.social_img} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Contacts
