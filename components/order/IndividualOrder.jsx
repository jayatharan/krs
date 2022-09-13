import React, { useContext } from 'react'
import { Box } from '../../shared/Box'
import { PageContainer } from '../../shared/Container'
import { Grid } from '../../shared/Grid'
import styled from "styled-components";
import { Typography } from '../../shared/Typography';
import { Divider } from '../../shared/Divider';
import CartItem from '../cart/components/CartItem';
import { COLORS } from '../../application/constants/AppConstants';
import { CurrencyFormatter } from '../../utils/StringProcess';
import CustomerForm from './components/customerForm/CustomerForm';
import { AuthContext } from '../../auth/AuthProvider';
import { useState } from 'react';
import { useEffect } from 'react';

const CartTitleText = styled(Typography)`
    font-weight:500;
    font-size:25px;
    line-height:30px;
    text-align:center;
    font-weight:900;
    color:${COLORS.primary.brown};
`

const CartTotalContainer = styled(Box)`
    margin-bottom:15px;
    background:${COLORS.primary.white};
    padding:5px;
    box-shadow:2px 4px 8px rgba(30, 30, 30, 0.18);
`

const CartTotalText = styled(Typography)`
    margin-top:5px;
    font-weight:600;
    font-size:16px;
    line-height:20px;
    color:${COLORS.primary.black};
`

const IndividualOrder = ({order}) => {
    
    const authContext = useContext(AuthContext);

    const [canEditCart, setCanEditCart] = useState(false);

    useEffect(()=>{
        if(authContext.auth.authenticated){
            if(["manager", "admin", "super-admin"].includes(authContext.auth.user.role) && !["delivered", "completed", "cancelled"].includes(order.status)){
                setCanEditCart(true);
            }
        }
    },[authContext])

    return (
        <PageContainer>
            <Box sx={{paddingY:'10px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box sx={{background:COLORS.primary.white, padding:1}}>
                            <CartTitleText>ORDER DETAILS</CartTitleText>
                            <Divider sx={{marginY:1}} />
                            <Box sx={{paddingBottom:'20px'}}>
                                <CustomerForm order={order} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box sx={{background:COLORS.primary.white, padding:1}}>
                            <CartTitleText>CART DETAILS</CartTitleText>
                            <Divider sx={{marginY:1}} />
                            <Box sx={{paddingBottom:'20px'}}>
                                {order.cartItems.map(i=>(
                                    <CartItem key={i._id} cartItem={i} orderId={order._id} confirmOrder={!canEditCart} />
                                ))}
                                <CartTotalContainer>
                                    <CartTotalText>Total Qty : {order.totalQuantity}</CartTotalText>
                                    <CartTotalText>Cart Total : {CurrencyFormatter.format(order.cartTotal)}</CartTotalText>
                                </CartTotalContainer>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    )
}

export default IndividualOrder