import React from 'react'
import { Link } from 'react-router-dom'
import {Container, Typography, Grid, Button} from '@material-ui/core'
import CartItem from './Cartitem/CartItem'

import useStyle from './style'

const Cart = ({ cart,HandleUpdateQty,HandleRemoveItem,HandleEmptyCart }) => {
  const classes = useStyle();

  const EmptyCart = () => 
   (
      <Typography variant="subtitle1">You don't have anything in your cart, <Link to="/My-e-commerce" className={classes.link}>Continue Shopping</Link>
      </Typography>
    )
  

  const FilledCart = () => (
    <>
    <Grid container spacing={3}>
      {cart.line_items.map((item) => (
        <Grid item xs={12} sm={4} key={item.id}>
          <CartItem 
          key={item.id}
          item={item} 
          HandleUpdateQty={HandleUpdateQty}
          HandleRemoveItem={HandleRemoveItem}
          />
        </Grid>
      ))}
    </Grid>
    <div className={classes.cardDetails}>
      <Typography variant="h4">Subtotal : {cart.subtotal.formatted_with_symbol}</Typography>
      <div className={classes.allign}>
        <Button className={classes.emptyButton, classes.ButtonForSmall} type="button" size="large" variant="contained" color="secondary" onClick={HandleEmptyCart}>Empty Cart</Button>
        <Button component={Link} to="/checkout" className={classes.checkoutButton, classes.ButtonForSmall} type="button" size="large" variant="contained" color="primary">Checkout</Button>
      </div>
    </div>
    </> 
  )

  if(!cart.line_items) return (
      <Container>
        <Typography className={classes.title} variant="h5">Loading...</Typography>
      </Container>
    )

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom >Your Shopping Cart</Typography>
      { cart.total_items === 0 ? <EmptyCart/> : <FilledCart /> }
    </Container>
  )
}

export default Cart
