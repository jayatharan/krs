import React from 'react'
import { COLORS } from '../../application/constants/AppConstants';
import { Box } from '../../shared/Box';
import { PageContainer } from '../../shared/Container'
import { Grid } from '../../shared/Grid'
import { Typography } from '../../shared/Typography';
import Cart from '../cart/Cart';
import CheckoutForm from './checkoutForm/CheckoutForm';
import styled from "styled-components";
import { Divider } from '../../shared/Divider';

const CheckoutTitleText = styled(Typography)`
    font-weight:500;
    font-size:25px;
    line-height:30px;
    text-align:center;
    font-weight:900;
    color:${COLORS.primary.brown};
`

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
                        <Box sx={{background:COLORS.primary.white, padding:1, paddingBottom:'30px'}}>
                            <CheckoutTitleText>CHECKOUT</CheckoutTitleText>
                            <Divider sx={{marginTop:1, marginBottom:3}} />
                            <CheckoutForm />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    )
}

export default Checkout