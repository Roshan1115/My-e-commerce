import React, { useEffect, useState } from 'react'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button
} from '@material-ui/core'
import useStyle from './style'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import {commerce} from '../../../lib/commerce'

const steps = ['Shipping Address', 'Payment Details']




const Checkout = ({ cart }) => {
  const classes = useStyle();
  const [activeStep, setactiveStep] = useState(0);
  const [checkoutToken, setcheckoutToken] = useState(null)

  useEffect(() => {
    const generateToken = async () => {
      try{
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
        console.log(token);
        setcheckoutToken(token)
      }
      catch (error) {

      }
    }
    generateToken();
  }, [])


  const Confirmation = () => (
    <div>
      Confirmation
    </div>
  )

  const Form = () => ( 
    activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} /> : <PaymentForm />
  )

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography align="center" variant="h4">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          { activeStep === steps.length ? <Confirmation /> : (checkoutToken && <Form />)  }   
          {/* form will show only afater checkoutToken will appear */}
          
        </Paper>
      </main>
    </>
  )
}

export default Checkout
