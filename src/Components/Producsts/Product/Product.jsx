import React from 'react'
import {Card,
CardContent,
CardActions,
CardMedia,
Typography,
IconButton } from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'

import useStyle from './style'

const Product = (props) => {
  const {product} = props;
  const classes = useStyle();
  
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} 
      image='' 
      title={product.name}
      image={product.image}
      />

      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">
            {product.price}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart">
          <AddShoppingCart/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Product
