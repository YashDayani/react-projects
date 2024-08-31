import React from 'react'

import Dividers from '../../components/Dividers/Dividers'

import './Features.css'
import { assets } from '../../assets/assets'

const Features = () => {
  return (
    <div className='features'>
      <Dividers title='FutureTech Features' subtitle='Unlock the Power of'/>

      <div className="feature-container">
        <div className="left">
            <img src={assets.icon1_img} alt="" />
            <span className='title'>Future Technology Blog</span>
            <span className='subtitle'>Stay informed with our blog section dedicated to future technology.</span>
        </div>
        <div className="right">
            <div className="cards">
                <div className="title">Quantity</div>
                <div className="info">Over 1,000 articles on emerging tech trends and breakthroughs.</div>
            </div>
            <div className="cards">
                <div className="title">Variety</div>
                <div className="info">Articles cover fields like AI, robotics, biotechnology, and more.</div>
            </div>
            <div className="cards">
                <div className="title">Frequency</div>
                <div className="info">Fresh content added daily to keep you up to date.</div>
            </div>
            <div className="cards">
                <div className="title">Authoritative</div>
                <div className="info"> Written by our team of tech experts and industry professionals.</div>
            </div>
        </div>
      </div>
      <div className="feature-container">
        <div className="left">
            <img src={assets.icon1_img} alt="" />
            <span className='title'>Research Insights Blogs</span>
            <span className='subtitle'>Dive deep into future technology concepts with our research section.</span>
        </div>
        <div className="right">
            <div className="cards">
                <div className="title">Depth</div>
                <div className="info">500+ research articles for in-depth understanding.</div>
            </div>
            <div className="cards">
                <div className="title">Graphics</div>
                <div className="info">Visual aids and infographics to enhance comprehension.</div>
            </div>
            <div className="cards">
                <div className="title">Trends</div>
                <div className="info">Explore emerging trends in future technology research.</div>
            </div>
            <div className="cards">
                <div className="title">Contributors</div>
                <div className="info">Contributions from tech researchers and academics.</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Features
