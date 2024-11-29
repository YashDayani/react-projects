import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update for React Router v6
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import News from './pages/News/News';
import Podcasts from './pages/Podcasts/Podcasts';
import Resources from './pages/Resources/Resources';
import Contact from './pages/Contact/Contact';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/News" element={<News />} />
          <Route path="/Podcasts" element={<Podcasts />} />
          <Route path="/Resources" element={<Resources />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
