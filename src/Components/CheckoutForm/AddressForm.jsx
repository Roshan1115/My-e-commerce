import React, { useState, useEffect } from 'react'
import {
  InputLabel, Select, MenuItem, Button, Grid, Typography
} from '@material-ui/core'
import {FormProvider, useForm} from 'react-hook-form'
import CustomTextField from './CustomTextField'
import {commerce} from '../../lib/commerce'
import {Link} from 'react-router-dom'

const AddressForm = ({ checkoutToken }) => {

  const [ShippingCountries, setShippingCountries] = useState([])
  const [shippingCounty, setshippingCounty] = useState('')
  const [SubDivisions, setSubDivisions] = useState([])
  const [Subdivision, setSubdivision] = useState('')
  const [ShippingOptions, setShippingOptions] = useState([])
  const [ShippingOption, setShippingOption] = useState('')

  const methodes = useForm();



  // fetching functions ........................... 

  const fetchShippingCountries = async (checkoutTokenID) => {
    const resp = await commerce.services.localeListShippingCountries(checkoutTokenID);
    // console.log(resp.countries);
    setShippingCountries(resp.countries);
    setshippingCounty(Object.keys(resp.countries)[0]);
  }

  const FetchSubDivisions = async (countryCode) => {
    const res = await commerce.services.localeListSubdivisions(countryCode)
    // console.log(res.subdivisions);
    // console.log(res);
    setSubDivisions(res.subdivisions)
    setSubdivision(Object.keys(res.subdivisions)[0]);
  }

  const fetchShippingOption = async (checkoutTokenID, country, region =null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenID, { country : country, region : region})
    // console.log("options ", options);
    setShippingOptions(options)
    setShippingOption(options[0].id)
  }
  
  // fetching function END ................................ 



  // use effects.................................

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
    // console.log(ShippingCountries);
    // console.log(shippingCounty);
  }, [])

  useEffect(() => {
    if(shippingCounty){
      FetchSubDivisions(shippingCounty);
      // console.log(SubDivisions);
    }
  }, [shippingCounty])

  useEffect(() => {
    if(Subdivision){
      fetchShippingOption(checkoutToken.id, shippingCounty, Subdivision)
    }
  }, [Subdivision])

  // use effects..........................END.........



  // essential arrays.......................................
  
  const countries = Object.entries(ShippingCountries).map(([ code, name ]) => (
    { id: code, label: name }
    ))
  const subdivisions = Object.entries(SubDivisions).map(([ code, name ]) => (
      { id: code, label: name }
    ))

  const Options = ShippingOptions.map((soElement) => (
    {
      id : soElement.id,
      label : `${soElement.description} - ${soElement.price.formatted_with_symbol}`
    }
  ))

  // essential arrays.......................................




    // console.log(countries);
    // console.log("subdivisions " , subdivisions);
    // console.log("subdivision " + Subdivision);
    // console.log("options ", ShippingOptions); 
    // console.log("choosed ", ShippingOption);
    // console.log("options formated", Options);



  return (
    <>
    <Typography variant="h6" gutterBottom>Shopping Address</Typography>
    <FormProvider {...methodes}>
      <form onSubmit=''>
        <Grid container spacing={3}>
          <CustomTextField required name='firstName' label='First Name' />
          <CustomTextField required name='lastName' label='Last Name' />
          <CustomTextField required name='address' label='Address' />
          <CustomTextField required name='city' label='City' />
          <CustomTextField required name='zip' label='ZIP/Postal code' />
          <CustomTextField required name='email' label='Email' />




          {/* countries  */}

          <Grid item xs={12} sm={6}>
            <InputLabel>Select Conutry</InputLabel>
            <Select fullwidth value={shippingCounty} onChange={(e) => setshippingCounty(e.target.value)}>
              {countries.map((country) => (
                <MenuItem value={country.id} key={country.id}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>




          {/* subdivisions  */}

          <Grid item xs={12} sm={6}>
            <InputLabel>Select Subdivision</InputLabel>
            <Select fullwidth value={Subdivision} onChange={(e) => setSubdivision(e.target.value)}>
              {subdivisions.map((subdivision) => (
                <MenuItem value={subdivision.id} key={subdivision.id}>
                  {subdivision.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
      


          {/* Shipping Options  */}

          <Grid item xs={12} sm={6}>
            <InputLabel>Select Shipping Option</InputLabel>
            <Select fullwidth value={ShippingOption} onChange={(e) => setShippingOption(e.target.value)}>
              {Options.map( (ship) => (
                <MenuItem value={ship.id} key={ship.id}>
                  {ship.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
      
          <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
            <Button variant="outlined" component={Link} to="/cart">Back to cart</Button>
            <Button variant="contained" color="primary">Proceed</Button>
          </div>

        </Grid>
      </form>
    </FormProvider>
    </>
  )
}

export default AddressForm
