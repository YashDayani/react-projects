import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import Features from '../../components/Features/Features'
import BlogsP from '../../components/BlogsP/BlogsP'
import Resources from '../../components/Resources/Resources'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features/>
      <BlogsP />
      <Resources />
      <Footer />
    </div>
  )
}

export default Home
