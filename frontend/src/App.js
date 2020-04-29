import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ItemList from './components/ItemList';

class App extends Component {
  render() {
    return (
      <div className="body">
        <Header />
          <ItemList />
        <Footer />
      </div>
    );
  }
}

export default App;
