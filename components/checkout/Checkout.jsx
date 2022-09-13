import React from 'react'
import { COLORS } from '../../application/constants/AppConstants';
import { Box } from '../../shared/Box';
import { PageContainer } from '../../shared/Container'
import { Grid } from '../../shared/Grid'
import Cart from '../cart/Cart';
import CheckoutForm from './checkoutForm/CheckoutForm';

const Checkout = () => {
    return (
        <PageContainer>
            <Box sx={{paddingY:'10px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box sx={{background:COLORS.primary.white, padding:1}}>
                            <Cart checkout={true} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box sx={{background:COLORS.primary.white, padding:1, paddingY:'30px'}}>
                            <CheckoutForm />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    )
}

export default Checkout