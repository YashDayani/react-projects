import React from 'react'
import './Contacts2.css'
import { assets } from '../../assets/assets'

const Contacts2 = () => {
  return (
    <div className="contact-container">
      <div className="contact-section">
        <div className="contact-left">
          <img src={assets.icon2_img} alt="AI Podcasts" />
          <div className="contact-title">Get in Touch with AI Podcasts</div>
        </div>
        <div className="contact-right">
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Enter your Email" />
              <div className="phone-input">
                <select className="country-select">
                  <option value="IN" data-icon="🇮🇳">India</option>
                  {/* Add more countries as needed */}
                </select>
                <input type="text" placeholder="Enter Phone Number" />
              </div>
            </div>
            <div className="form-group">
              <textarea placeholder="Enter your Message"></textarea>
            </div>
            <div className="form-footer">
              <label>
                <input type="checkbox" />
                <p>I agree with Terms of Use and Privacy Policy</p>
              </label>
              <button className='send-btn' type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>

      <div className="faq-section">
        <div className="faq-left">
          <img src={assets.icon2_img} alt="FAQ" />
          <div className="faq-title">Asked question</div>
          <div className="faq-subtitle">
            If the question is not available on our FAQ section, feel free to contact us personally, we will resolve your respective doubts.
          </div>
        </div>
        <div className="faq-right">
          {/* Add FAQ items here */}
        </div>
      </div>
    </div>
  )
}

export default Contacts2
