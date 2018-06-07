import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout'
import {Route , Switch} from 'react-router-dom'
// adding Switch is just for having alternate ways routing
// Switch tells the router to choose the first route that matches'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          {/* <BurgerBuilder />
          <Checkout /> */}
        </Layout>
      </div>
    );
  }
}

export default App;
