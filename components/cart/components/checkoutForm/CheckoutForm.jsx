import { TextField } from '@mui/material'
import React from 'react'
import { Box } from '../../../../shared/Box'

const CheckoutForm = () => {
    return (
        <Box>
            <TextField 
                label="Mobile No" 
                size='small' 
                fullWidth={true}
                placeholder='+94772222222'
                helperText={'Enter Mobile No in international format'}
            />
        </Box>
    )
}

export default CheckoutForm