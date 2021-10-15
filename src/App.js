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
  }, [])  // runs for first time only
  console.log(products);
  return (
    <div>
      <Navbar products={products} />
      <Products products={products}/>
    </div>
  )
}

export default App
