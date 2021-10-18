import React, { useState, useEffect } from 'react'
import{ Navbar, Products, Cart, Checkout} from './Components'
import { commerce } from './lib/commerce'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  const [products, setproducts] = useState([]);
  const [cart, setcart] = useState({});
  const [order, setOrder] = useState({});
  const [errMsg, seterrMsg] = useState('');

  const fetchProduct = async () => {
    const {data} = await commerce.products.list();
    setproducts(data);
  }


   // for cart
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

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setcart(newCart); 
  }

  const handleCheckout = async (checkoutTokenID, newOrder) => {
    try{
      const incomeOrder = await commerce.capture(checkoutTokenID, 
      newOrder)
      setOrder(incomeOrder);
      refreshCart();

    }catch(err){
      // console.log(err)
      seterrMsg(err.data.error.message)
    }
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

        <Route exact path="/checkout">
          <Checkout 
            cart={cart} 
            order={order}
            handleCheckout={handleCheckout}
            errorMessage={errMsg}
            refreshCart={refreshCart}
            />
        </Route>
      </Switch>
    </div>
    </Router>
  )
}

export default App
