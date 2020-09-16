import React, {Component} from 'react';
import NavBar from './components/NavBar'
import ShoppingList from './components/ShoppingList'
import ItemModal from './components/ItemModal'
import { Container } from 'reactstrap'

import { Provider } from 'react-redux'

import store from './Store'
import {loadUser} from './Actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

class App extends Component{
  componentDidMount(){
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <NavBar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
