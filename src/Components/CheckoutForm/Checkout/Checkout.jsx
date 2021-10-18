import React, { useEffect, useState } from 'react'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline
} from '@material-ui/core'
import useStyle from './style'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import {commerce} from '../../../lib/commerce'
import {Link, useHistory} from 'react-router-dom'

const steps = ['Shipping Address', 'Payment Details']




const Checkout = ({ cart,order,handleCheckout,errorMessage,refreshCart }) => {
  const classes = useStyle();
  const [activeStep, setactiveStep] = useState(0);
  const [checkoutToken, setcheckoutToken] = useState(null)
  const [ShipData, setShipData] = useState({})
  const [isFinished, seIsFinished] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const generateToken = async () => {
      try{
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
        // console.log(token);
        setcheckoutToken(token)
      }
      catch (error) {
        // console.log(error)
        history.push("/")

      }
    }
    generateToken();
  }, [])

  const nextStep = () => setactiveStep((prev) => prev + 1);
  const backStep = () => setactiveStep((prev) => prev - 1);

  const data = (data) => {
    // console.log(data);
    setShipData(data);
    nextStep();
  }


  let Confirmation = () => order.customer ? (
    <>
    <div>
      <Typography variant="h5">Thank you for shopping</Typography>
      <Divider className={classes.divider} />
      <Typography variant="subtitle1">Order ref : {order.customer_reference}</Typography>
    </div>
    <br />
    <Button component={Link} to="/" variant="outlined" type="button">Continue Shopping</Button>
    </>
  ) : isFinished ? 
  <>
      <div>
        <Typography variant="h5">Thank you for shopping</Typography>
        <Divider className={classes.divider} />
      </div>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">Continue Shopping</Button>
    </> 
    : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  )

  if(errorMessage) {
    <>
      <Typography variant="h5">Error : {errorMessage}</Typography>
      <br />
      <Button type="button" variant="outlined" component={Link} to="/">Home</Button>
    </>
  }
    
  const timeout = () => {
    setTimeout(() => {
      seIsFinished(true)
    }, 2500);
  }

  const Form = () => ( 
    activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} Sdata={data} /> 
    : 
    <PaymentForm 
    ShipData={ShipData} 
    checkoutToken={checkoutToken} 
    backStep={backStep} 
    handleCheckout={handleCheckout}
    nextSte={nextStep}
    timeout={timeout}
    refreshCart={refreshCart}
    />
  )
  // if(ShipData)
  //   console.log(ShipData);
  // console.log(checkoutToken)

  return (
    <>
      <CssBaseline />
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
