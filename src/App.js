import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import CheckoutSummary from './Components/Order/CheckoutSummary/CheckoutSummary'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
          <CheckoutSummary />
        </Layout>
      </div>
    );
  }
}

export default App;
