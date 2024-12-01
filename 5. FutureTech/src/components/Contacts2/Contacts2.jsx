import React,{ useState } from 'react'
import './Contacts2.css'
import { assets } from '../../assets/assets'
import { faqData } from './Data'

const Contacts2 = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

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
              <div className='dfc'>
                <label htmlFor="">First Name</label>
                <input type="text" placeholder="First Name" />
              </div>
              <div className='dfc'>
                <label htmlFor="">Last Name</label>
                <input type="text" placeholder="Last Name" />
              </div>

            </div>
            <div className="form-group">
              <div className='dfc'>
                <label htmlFor="">Email</label>
              <input type="email" placeholder="Enter your Email" />
              </div>
              <div className='dfc'>
              <label htmlFor="">Phone</label>
              <div className="phone-input">
                <select className="country-select">
                  <option value="IN" >India</option>
                  <option value="US" >USA</option>
                </select>
                <input type="text" placeholder="Enter Phone Number" />
              </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="messageIn">Message</label>
              <textarea id='messageIn' placeholder="Enter your Message"></textarea>
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
          {faqData.map((faq, index) => (
            <div key={faq.id} className="accordion-item">
              <div 
                className={`accordion-header ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <span className="accordion-icon">{activeIndex === index ? '-' : '+'}</span>
              </div>
              <div className={`accordion-content ${activeIndex === index ? 'active' : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contacts2
