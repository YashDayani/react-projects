import './App.css'
import TopMenu from './components/topMenu/TopMenu'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import { ProductProvider } from './components/DataContext'
import Slider from './components/slider/Slider'
import Product from './components/product/Product'
import Footer from './components/footer/Footer'


function App() {
  return (
    <>
    <TopMenu />
    <Header />
    <Hero />
    <ProductProvider>
      <Slider />
      <Product />
    </ProductProvider>
    <Footer />
    </>
  )
}

export default App
