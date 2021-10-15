import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography
} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'

import logo from '../../assets/logo.png'
import useStyles from './style'

const Navbar = ({ products, totalItems }) => {
  const classes = useStyles();
  const Location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="My E-Commerce" height="25px" className={classes.image} />
            My E-Commerce
          </Typography>
          <div className={classes.grow} />
          { Location.pathname === '/' ? 
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label='show cart items' color='inherit'>
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
            :
          null 
          }
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
