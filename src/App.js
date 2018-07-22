import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout'
import Orders from './Containers/Orders/Orders'
import {Route , Switch} from 'react-router-dom'
import Auth from './Containers/Auth/Auth'
// adding Switch is just for having alternate ways routing
// Switch tells the router to choose the first route that matches'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/orders" component={Orders}/>
          {/* <BurgerBuilder />
          <Checkout /> */}
        </Layout>
      </div>
    );
  }
}

export default App;
