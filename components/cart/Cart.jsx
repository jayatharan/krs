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

const CartTitleText = styled(Typography)`
    font-weight:500;
    font-size:25px;
    line-height:30px;
    text-align:center;
    font-weight:900;
    color:${COLORS.primary.brown};
`

const Cart = () => {
    const authContext = useContext(AuthContext);
    const [confirmOrder, setConfirmOrder] = useState(false)

    return (
        <Box sx={{width:{xs:'300px', sm:'400px', md:'400px', lg:'400px', xl:'400px'},background:COLORS.primary.white, padding:1}}>
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
                        {(!confirmOrder)&&(
                            <Button variant='outlined' disabled={authContext.order.cartItems.length==0} sx={{paddingY:1}} fullWidth={true} endIcon={<ConfirmIcon />} onClick={()=>setConfirmOrder(true)}>Confirm Order</Button>
                        )}
                    </>
                )}
            </Box>
            <Collapse in={confirmOrder}>
                <CheckoutForm />
            </Collapse>
        </Box>
    )
}

export default Cart