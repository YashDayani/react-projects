import React from 'react'
import './Home.css'
import Header from '../../components/header/Header'
import Hero from '../../components/Hero/Hero'
import Dividers from '../../components/Dividers/Dividers'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Dividers title='' subtitle='' linktext=''/>
    </div>
  )
}

export default Home
