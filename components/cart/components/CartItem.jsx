import React, { useContext, useState } from 'react'
import styled from "styled-components";
import { COLORS } from '../../../application/constants/AppConstants';
import { Box } from '../../../shared/Box';
import Image from 'next/image'
import { Typography } from '../../../shared/Typography';
import { Divider } from '@mui/material';
import { Collapse } from '../../../shared/Collapse';
import { Button, IconButton } from '../../../shared/Button';
import { AddIcon, BuyCloseIcon, LeftIcon, MinusIcon, RemoveIcon, RightIcon } from '../../../shared/Icons';
import OrderApi from '../../../apis/OrderApi';
import { AuthContext } from '../../../auth/AuthProvider';
import { CurrencyFormatter } from '../../../utils/StringProcess';

const CartItemContainer = styled(Box)`
    margin-bottom:15px;
    background:${COLORS.primary.white};
    padding:5px;
    box-shadow:2px 4px 8px rgba(30, 30, 30, 0.18);
`

const CartItemDetailBox = styled(Box)`
    width:100%;
`

const CartItemNameText = styled(Typography)`
    margin-top:5px;
    font-weight:700;
    font-size:17px;
    line-height:20px;
    color:${COLORS.primary.brown};
`

const CartItemPriceText = styled(Typography)`
    margin-top:5px;
    font-weight:500;
    font-size:14px;
    line-height:20px;
    color:${COLORS.primary.black};
`

const CartItemSubTotalText = styled(Typography)`
    margin-top:5px;
    font-weight:600;
    font-size:15px;
    line-height:20px;
    color:${COLORS.primary.black};
`

const CartItemActionBox = styled(Box)`
    &&{
        min-width:20px;
        height:100%;
        border-radius:3px;
        background: linear-gradient(270deg, rgba(2,0,36,0.8) 0%, rgba(61,61,61,0.8) 100%)
    }
`

const CartItem = ({cartItem, confirmOrder}) => {
    const authContext = useContext(AuthContext);

    const [showActionButtons, setShowActionButtons] = useState(false);
    const [loading, setLoading] = useState(false);

    const cartItemAction = (type)=>{
        setLoading(true)
        const data = {...cartItem}
        if(type == 'plus'){
            data.quantity+=1    
        }else if (type == 'minus'){
            data.quantity-=1
        }else if(type == 'remove'){
            data.quantity=0
        }
        const order = authContext.order;
        OrderApi.addToCart(order._id, data).then(response=>{
            authContext.setOrder(response.data);
        })
    }

    return (
        <CartItemContainer sx={{display:'flex', alignItems:'center', position:'relative'}}>
            {!confirmOrder&&(
                <CartItemActionBox sx={{position:'absolute', right:'0px', zIndex:999}} onClick={()=>{if(!showActionButtons)setShowActionButtons(true)}}>
                    <Collapse in={showActionButtons} orientation='horizontal'>
                        <Box sx={{padding:1}}>
                            {/* <Button variant='contained' size='small' color='error' onClick={()=>cartItemAction('remove')}>Remove</Button>
                            <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                                <IconButton size='small' onClick={()=>cartItemAction('plus')}>
                                    <AddIcon />
                                </IconButton>
                                <IconButton size='small' onClick={()=>cartItemAction('minus')}>
                                    <MinusIcon />
                                </IconButton>
                            </Box> */}
                            <Box sx={{display:'flex', flexDirection:'column'}}>
                                <Button size='small' variant='outlined' color='success' sx={{marginBottom:0.5}} onClick={()=>cartItemAction('plus')}><AddIcon /></Button>
                                <Button size='small' variant='outlined' color='warning' onClick={()=>cartItemAction('minus')}><MinusIcon /></Button>
                            </Box>
                            {showActionButtons&&(
                                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                                    <IconButton size='small' onClick={()=>cartItemAction('remove')}>
                                        <RemoveIcon />
                                    </IconButton>
                                        <IconButton size='small' onClick={()=>setShowActionButtons(false)}>
                                            <RightIcon />
                                        </IconButton>
                                </Box>
                            )}
                        </Box>
                    </Collapse>
                    {!showActionButtons&&(
                        <LeftIcon />
                    )}
                </CartItemActionBox>
            )}
            <Box sx={{padding:'5px'}}>
                <Image alt={cartItem.name} width={100} height={100} src={`/uploads/${cartItem.image?cartItem.image:'product-default.png'}`} />
            </Box>
            <CartItemDetailBox>
                <CartItemNameText>{cartItem.name}</CartItemNameText>
                <CartItemPriceText>Qty : {cartItem.quantity}</CartItemPriceText>
                <CartItemPriceText>Unit Price : {CurrencyFormatter.format(cartItem.price)}</CartItemPriceText>
                <Divider />
                <CartItemSubTotalText>Sub.Ttl : {CurrencyFormatter.format(cartItem.subTotal)}</CartItemSubTotalText>
            </CartItemDetailBox>
        </CartItemContainer>
    )
}

export default CartItem