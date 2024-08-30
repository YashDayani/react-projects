import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import Features from '../../components/Features/Features'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features/>
      <Footer />
    </div>
  )
}

export default Home
