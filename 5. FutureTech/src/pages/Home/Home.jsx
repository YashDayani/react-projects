import React from 'react'
import './Home.css'
import Hero from '../../components/Hero/Hero'
import Features from '../../components/Features/Features'
import BlogsP from '../../components/BlogsP/BlogsP'
import Resources from '../../components/Resources/Resources'
import Testimonials from '../../components/Testimonials/Testimonials'

const Home = () => {
  return (
    <div>
      <Hero />
      <Features/>
      <BlogsP />
      <Resources />
      <Testimonials />
    </div>
  )
}

export default Home
