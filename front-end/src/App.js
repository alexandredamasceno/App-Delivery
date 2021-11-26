import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppProvider from './Context/AppProvider';

import Products from './pages/Products';
import Login from './pages/Login';
import './App.css';
import PagesOrder from './pages/PagesOrder';
import Checkout from './pages/Checkout';
import PagesOrderDetails from './pages/PagesOrderDetails';
import Register from './pages/Register';


import PagesSellerOrderDetails from './pages/PagesSellerOrderDetails';
import SellerOrders from './pages/SellerOrders';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/customer/products" component={ Products } />
          <Route path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/orders" component={ PagesOrder } />
          <Route exact path="/customer/orders/:id" component={ PagesOrderDetails } />
          <Route exact path="/seller/orders/:id" component={ PagesSellerOrderDetails } />
          <Route exact path="/seller/orders" component={ SellerOrders } />
        </Switch>
      </AppProvider>
    </div>
  );
}

export default App;
