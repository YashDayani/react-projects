import './App.css'
import TopMenu from './components/topMenu/TopMenu'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import { DataProvider } from './components/DataContext'
import Slider from './components/slider/Slider'
import Product from './components/product/Product'
import Footer from './components/footer/Footer'


function App() {
  return (
    <>
    <DataProvider>
      <TopMenu />
      <Header />
      <Hero />
      <Slider />
      <Product />
      <Footer />
    </DataProvider>
    </>
  )
}

export default App
