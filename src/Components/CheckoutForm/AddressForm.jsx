import React, { useState, useEffect } from 'react'
import {
  InputLabel, Select, MenuItem, Button, Grid, Typography
} from '@material-ui/core'
import {FormProvider, useForm} from 'react-hook-form'
import CustomTextField from './CustomTextField'
import {commerce} from '../../lib/commerce'
import { Sync } from '@material-ui/icons'

const AddressForm = ({ checkoutToken }) => {

  const [ShippingCountries, setShippingCountries] = useState([])
  const [shippingCounty, setshippingCounty] = useState('')
  const [SubDivisions, setSubDivisions] = useState([])
  const [Subdivision, setSubdivision] = useState('')
  const [ShippingOptions, setShippingOptions] = useState([])
  const [ShippingOption, setShippingOption] = useState('')

  const methodes = useForm();


  const fetchShippingCountries = async (checkoutTokenID) => {
    const resp = await commerce.services.localeListShippingCountries(checkoutTokenID);
    // console.log(resp.countries);
    setShippingCountries(resp.countries);
    setshippingCounty(Object.keys(resp.countries)[0]);
  }
  
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
    console.log(ShippingCountries);
    console.log(shippingCounty);
  }, [])


  const countries = Object.entries(ShippingCountries).map(([ code, name ]) => (
    { id: code, label: name }
    ))
    console.log(countries);
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
      
        </Grid>
      </form>
    </FormProvider>
    </>
  )
}

export default AddressForm
