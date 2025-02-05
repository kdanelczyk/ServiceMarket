import { default as React } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
