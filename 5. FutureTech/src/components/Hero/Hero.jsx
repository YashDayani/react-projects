import React from 'react'

import './Hero.css'
import { assets } from '../../assets/assets'

const Hero = () => {
  return (
    <section className='hero'>
    <div className="hero-section">
      <div className="hero-section-left">
        <div className="hero-section-left-top">
          <div className="hero-section-left-top-wrapper">
            <span>Your Journey to Tomorrow Begins Here</span>
            <h1>Explore the Frontiers of Artificial Intelligence</h1>
            <p>Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines think, learn, and reshape the future. Join us on this visionary expedition into the heart of AI.</p>
          </div>
        </div>
        <div className="hero-section-left-bottom">
          <div className="hero-cards">
            <span>300<span>+</span></span>
            <p>Resources available</p>
          </div>
          <div className="hero-cards">
            <span>12k<span>+</span></span>
            <p>Total Downloads</p>
          </div>
          <div className="hero-cards">
            <span>10k<span>+</span></span>
            <p>Active Users</p>
          </div>
        </div>
      </div>
      <div className="hero-section-right">
        <div className='hero-section-right-wrapper'>
          <img src={assets.user_img} alt="" />
          <div className="text-container">
          <p>Explore 1000+ resources</p>
          <p>Over 1,000 articles on emerging tech trends and breakthroughs.</p>
          </div>
          <a href="#" className='nav-btn'>Explore Resources <img className='up_arror_img' src={assets.up_arrow} /></a>
          <img className='hero-img' src={assets.hero_img} alt="" />
        </div>
      </div>
      </div>
      <div className="hero-card-container">
        <div className="hero-cards">
          <div className="card-wrapper">
            <div className="card-icon"><img src={assets.icon1_img} alt="" /></div>
            <div className="text-container">
              <div className="text-wrapper">
                <span className='title'>Latest News Updates</span>
                <span className='subtitle'>Stay Current</span>
              </div>
              <a href="#"><img src={assets.up_arrow_fill} alt="" /></a>
            </div>
            <p>Over 1,000 articles published monthly</p>
          </div>
        </div>
        <div className="hero-cards">
          <div className="card-wrapper">
            <div className="card-icon"><img src={assets.icon2_img} alt="" /></div>
            <div className="text-container">
              <div className="text-wrapper">
                <span className='title'>Expert Contributors</span>
                <span className='subtitle'>Trusted Insights</span>
              </div>
              <a href="#"><img src={assets.up_arrow_fill} alt="" /></a>
            </div>
            <p>50+ renowned AI experts on our team</p>
          </div>
        </div>
        <div className="hero-cards">
          <div className="card-wrapper">
            <div className="card-icon"><img src={assets.icon3_img} alt="" /></div>
            <div className="text-container">
              <div className="text-wrapper">
                <span className='title'>Global Readership</span>
                <span className='subtitle'>Worldwide Impact</span>
              </div>
              <a href="#"><img src={assets.up_arrow_fill} alt="" /></a>
            </div>
            <p>2 million monthly readers</p>
          </div>
        </div>
      </div>
    
    </section>
  )
}

export default Hero
