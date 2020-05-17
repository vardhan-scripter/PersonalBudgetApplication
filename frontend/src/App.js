import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ItemList from './components/ItemList';
import GeneralApp from './components/GeneralApp';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isUserLoggedIn: false
    }
  }

  componentDidMount(){
    const token = sessionStorage.getItem('auth');
    if(token !== null){
      this.setState({
        isUserLoggedIn: true
      })
    }
  }

  confirmFromUser(){
    const items = JSON.parse(sessionStorage.getItem('items'));
    if(items !== null && items.length > 0){
      var output = confirm("Do you want to save these items to your account");
      if(output == false){
        sessionStorage.removeItem('items');
      }
    }
  }

  render() {
    const {isUserLoggedIn} = this.state;
    if(isUserLoggedIn){
      return (
        <div className="body">
          <Header />
            <ItemList />
          <Footer />
        </div>
      );
    }else{
      return (
          <Router>
                <div className="body">
                    <header className="header">
                      <h1>Personal Budget Management</h1>
                      <ul>
                          <li>
                            <Link to="/login" onClick={() => this.confirmFromUser()}>Login</Link>
                          </li>
                          <li>
                            <Link to="/register" onClick={() => this.confirmFromUser()}>Register</Link>
                          </li>
                      </ul>
                    </header>

                    {/* A <Switch> looks through its children <Route>s and
                          <GeneralApp />
                        renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/login">
                          <Login />
                        </Route>
                        <Route path="/register">
                          <Register />
                        </Route>
                        <Route path="/">
                          <GeneralApp />
                        </Route>
                    </Switch>
                    <Footer />
                </div>
          </Router>
      );
    }
  }
}

export default App;