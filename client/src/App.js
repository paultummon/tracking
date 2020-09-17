import React, {Component} from 'react';
import NavBar from './components/NavBar1'
import ShoppingList from './components/ShoppingList'
import Home from './Views/Home'
import Map from './Views/Map'
import ItemModal from './components/ItemModal'
import { Container } from 'reactstrap'

import { Provider } from 'react-redux'

import store from './Store'
import {loadUser} from './Actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css'

// import './App.css';

class App extends Component{
  componentDidMount(){
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <NavBar />
            <Home />
        </div>
      </Provider>
    );
  }
}

export default App;
