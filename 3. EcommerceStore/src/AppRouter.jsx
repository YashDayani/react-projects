// src/Router.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopMenu from './components/topMenu/TopMenu';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Slider from './components/slider/Slider';
import Product from './components/product/Product';
import Footer from './components/footer/Footer';
import Faq from './pages/Faq';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={
          <>
            <TopMenu />
            <Header />
            <Hero />
            <Slider />
            <Product />
          </>
        } />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;
