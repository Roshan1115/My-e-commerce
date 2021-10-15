import React, { useState, useEffect } from 'react'
import{ Navbar, Products, Cart} from './Components'
import { commerce } from './lib/commerce'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  const [products, setproducts] = useState([]);
  const [cart, setcart] = useState({});

  const fetchProduct = async () => {
    const {data} = await commerce.products.list();
    setproducts(data);
  }

  const fetchCart = async () => {
    setcart(await commerce.cart.retrieve());
  }
  
  const HandleAddToCart = async (productID, quantity) => {
    const item = await commerce.cart.add(productID, quantity);
    setcart(item.cart)
  }

  const HandleUpdateQty = async (productID, qty) => {
    const item = await commerce.cart.update(productID, { quantity: qty });
    setcart(item.cart);
  }

  const HandleRemoveItem = async (productID) => {
    const item = await commerce.cart.remove(productID);
    setcart(item.cart);
  }

  const HandleEmptyCart = async () => {
    const item = await commerce.cart.empty();
    setcart(item.cart);
  }

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, []) 

  return (
    <Router>
    <div>
      <Navbar
        products={products}
        totalItems={cart.total_items}
       />
       <Switch>
        <Route exact path="/">
          <Products
          products={products}
          onAddToCart={HandleAddToCart}
        />
        </Route>

        <Route exact path="/cart">
        <Cart 
          cart= {cart}
          HandleUpdateQty={HandleUpdateQty}
          HandleRemoveItem={HandleRemoveItem}
          HandleEmptyCart={HandleEmptyCart}
        />
        </Route>
      </Switch>
    </div>
    </Router>
  )
}

export default App
