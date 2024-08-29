import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import Dividers from '../../components/Dividers/Dividers'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Dividers title='' subtitle='' linktext=''/>
      <Footer />
    </div>
  )
}

export default Home
