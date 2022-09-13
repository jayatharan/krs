import React, { useContext, useState } from 'react'
import { COLORS } from '../../application/constants/AppConstants'
import { Box } from '../../shared/Box'
import styled from "styled-components";
import { Typography } from '../../shared/Typography';
import { Divider } from '../../shared/Divider';
import { AuthContext } from '../../auth/AuthProvider';
import CartItem from './components/CartItem';
import { CartIcon, ConfirmIcon, RightIcon } from '../../shared/Icons';
import { Button } from '../../shared/Button';
import { Collapse } from '../../shared/Collapse';
import CheckoutForm from './components/checkoutForm/CheckoutForm';
import { useRouter } from 'next/router';
import { HeaderMenuData } from '../../recoil/headerData/HeaderMenuDataAtom';
import {useRecoilState} from "recoil";
import { CurrencyFormatter } from '../../utils/StringProcess';
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

const Cart = ({checkout=false}) => {
    const authContext = useContext(AuthContext);
    const [confirmOrder, setConfirmOrder] = useState(false)
    const router = useRouter()
    const [currMenu, setCurrMenu] = useRecoilState(HeaderMenuData);
    const [total, setTotal] = useState({
        quantity:0,
        amount:0
    })
    
    useEffect(()=>{
        let quantity = 0
        let amount = 0

        if(authContext.order){
            authContext.order.cartItems.map(i => {
                quantity += i.quantity
                amount += (i.quantity*i.price)
            })
        }

        setTotal({
            quantity, 
            amount
        })
    },[authContext])

    return (
        <Box>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <CartIcon />
                <CartTitleText>SHOPPING CART</CartTitleText>
            </Box>
            <Divider sx={{marginY:1}} />
            <Box sx={{paddingBottom:'20px'}}>
                {authContext.order && (
                    <>
                        {authContext.order.cartItems.map(i=>(
                            <CartItem key={i._id} cartItem={i} confirmOrder={confirmOrder} />
                        ))}
                        <CartTotalContainer>
                            <CartTotalText>Total Qty : {total.quantity}</CartTotalText>
                            <CartTotalText>Total : {CurrencyFormatter.format(total.amount)}</CartTotalText>
                        </CartTotalContainer>
                        {(!checkout && !confirmOrder)&&(
                            <Button variant='outlined' disabled={authContext.order.cartItems.length==0} sx={{paddingY:1}} fullWidth={true} endIcon={<ConfirmIcon />} onClick={()=>{router.push('/checkout'); setCurrMenu('')}}>Confirm Order</Button>
                        )}
                    </>
                )}
            </Box>
        </Box>
    )
}

export default Cart