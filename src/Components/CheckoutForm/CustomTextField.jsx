import React from 'react'
import {Grid, TextField} from '@material-ui/core'
import { Controller, useFormContext} from 'react-hook-form'

const CustomTextField = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
      defaultValue=""
        control={control}
        render = {()=> (
                <TextField
                    name={name}
                    fullWidth
                    label={label}
                    required={required}
                />
            )}
       />
    </Grid>
  )
}

export default CustomTextField
