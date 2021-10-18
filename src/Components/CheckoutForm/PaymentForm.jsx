import React from 'react'
import {
  Typography,
  Button,
  Divider
} from '@material-ui/core'
import {
  Elements, 
  CardElement, 
  ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);




const PaymentForm = ({checkoutToken, backStep, ShipData, handleCheckout,nextSte,timeout,refreshCart }) => {


  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if(!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement)

    const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement}) 

    if(error){
      // console.log("inside error" , error)
      // nextSte();
      // return
      refreshCart();  // for developing steg
    }
    else{
      const orderData = {
        list_items : checkoutToken.live.line_items,
        customer : { firstname: ShipData.firstName, lastname: ShipData.lastName, email: ShipData.email},
        shipping : {
            name: 'Primary', 
            street: ShipData.address,
            town_city : ShipData.city,
            country_state: ShipData.Subdivision,
            zip_code : ShipData.zip,
            country : ShipData.shippingCounty
            },
        fullfillment : {
          shiping_method : ShipData.ShippingOption
        },
        payment : {
          gateway : 'stripe',
          stripe : {
            payment_method_it : paymentMethod.id
          }
        }
      }

      handleCheckout(checkoutToken.id, orderData )
    }
    timeout();
    nextSte();
  }



  return (
    <>
    <Review checkoutToken={checkoutToken} />
    <Divider />
    <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment Methodes</Typography>

    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ elements, stripe }) => {

          {/* console.log("stripe", stripe); */}

          return(
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElement />
            <br /> <br />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button variant="contained" type="submit" color="primary" disabled={! stripe} >{checkoutToken.live.subtotal.formatted_with_symbol}</Button>
            </div>
          </form>
          )}}
      </ElementsConsumer>
    </Elements>
    </>
  )
}

export default PaymentForm
