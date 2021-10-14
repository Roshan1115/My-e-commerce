import React, { useState, useEffect } from 'react'
import{ Navbar, Products} from './Components'
import { commerce } from './lib/commerce'

const App = () => {
  const [products, setproducts] = useState([]);

  const fetchProduct = async () => {
    const {data} = await commerce.products.list();
    setproducts(data);
  }

  useEffect(() => {
    fetchProduct();
  }, [])
  console.log(products);
  return (
    <div>
      <Navbar/>
      <Products/>
    </div>
  )
}

export default App
