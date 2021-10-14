import React from 'react'
import {Grid} from '@material-ui/core'
import Product from './Product/Product'
import useStyle from './style'

const products = [
  {id: 1, name: "shoe", description: "running shoe", price: '₹10', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'},
  {id: 2, name: "macbook", description: "Apple macbook pro", price: '₹1000', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
]


const Products = () => {
  const classes = useStyle();

  return(
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => {
          return(
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
          )
        })}
      </Grid>
    </main>
  )
}

export default Products
