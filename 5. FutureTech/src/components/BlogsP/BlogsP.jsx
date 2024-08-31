import React from 'react'
import Dividers from '../Dividers/Dividers'
import './Blogsp.css'

const BlogsP = () => {
  return (
    <>
      <Dividers title="Explore FutureTech's In-Depth Blog Posts" subtitle='A Knowledge Treasure Trove' linktext='View All Blogs' id='blogp'/>
      <div className="blogp">
        <div className="category">
          <div className="cards active">All</div>
          <div className="cards">Quantum Computing</div>
          <div className="cards">AI Ethics</div>
          <div className="cards">Space Exploration</div>
          <div className="cards">Biotechnology</div>
          <div className="cards">Renewable Energy</div>
        </div>
        <div className="blogs">
          <div className="div1"></div>
          <div className="div2"></div>
          <div className="div3"></div>
        </div>
      </div>
    </>
  )
}

export default BlogsP
