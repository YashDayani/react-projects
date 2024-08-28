import React from 'react'

import './Hero.css'
import { assets } from '../../assets/assets'

const Hero = () => {
  return (
    <section className="hero-section">
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
          <a href="#">Explore Resources <img src={assets.up_arrow} /></a>
          <img className='hero-img' src={assets.hero_img} alt="" />
        </div>
      </div>
    </section>
  )
}

export default Hero