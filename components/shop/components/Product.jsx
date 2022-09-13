import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import { useRouter } from 'next/router'
import { COLORS } from '../../../application/constants/AppConstants';
import { Box } from '../../../shared/Box';
import { Typography } from '../../../shared/Typography';
import Image from 'next/image'
import { Collapse } from '../../../shared/Collapse';
import { Button, IconButton } from '../../../shared/Button';
import { BuyCloseIcon, BuyIcon } from '../../../shared/Icons';
import OrderApi from '../../../apis/OrderApi';
import { AuthContext } from '../../../auth/AuthProvider';
import { CircularProgress } from '@mui/material';
import { CurrencyFormatter } from '../../../utils/StringProcess';

const ProductContainer = styled(Box)`
    background:${COLORS.primary.white};
    padding:10px;
    box-shadow:4px 8px 12px rgba(30, 30, 30, 0.18);
`

const ProductNameText = styled(Typography)`
    margin-top:5px;
    font-weight:500;
    font-size:14px;
    line-height:20px;
    text-align:center;
    color:${COLORS.primary.brown};
`

const ProductPriceText = styled(Typography)`
    margin-top:5px;
    font-weight:600;
    font-size:15px;
    line-height:15px;
    text-align:center;
    color:${COLORS.secondary.darkGray};
`

const ProductDiscountPriceText = styled(Typography)`
    font-weight:500;
    font-size:12px;
    line-height:15px;
    text-align:center;
    text-decoration: line-through;
    color:${COLORS.secondary.red};
`

const ProductActionButtonBox = styled(Box)`
    &&{
        width:100%;
        border-radius:3px;
        background: linear-gradient(0deg, rgba(2,0,36,0.8) 0%, rgba(61,61,61,0.8) 100%)
    }
`

const QuantityBox = styled(Box)`
    &&{
        height:25px;
        background:${COLORS.primary.brown};
        border-radius:5px;
    }
`

const Product = ({product}) => {
    const router = useRouter()
    const authContext = useContext(AuthContext);
    const [showActionButtons, setShowActionButtons] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cartItem, setCartItem] = useState(null);

    const addToCart = () => {
        setLoading(true);
        let quantity = 1;
        const order = authContext.order;
        if(cartItem) quantity = cartItem.quantity+1;
        OrderApi.addToCart(order._id, {
            productId:product._id,
            quantity
        }).then((response)=>{
            setLoading(false);
            authContext.setOrder(response.data);
        })
    }

    useEffect(()=>{
        if(authContext.order){
            const order = authContext.order;
            setCartItem(order.cartItems.find(i => i.productId == product._id))
        }
    },[authContext])

    return (
        <ProductContainer>
            <Box sx={{position:'relative'}}>
                {loading&&(
                    <Box sx={{position:'absolute', top:'0px', width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000}}>
                        <CircularProgress />
                    </Box>
                )}
                {cartItem&&(
                    <QuantityBox sx={{position:'absolute', display:'flex', alignItems:'center', right:'5px', padding:0.5, zIndex:999}}>
                        <Typography sx={{color:'#FFFFFF', fontWeight:'700', textAlign:'center', cursor:'pointer'}}>{cartItem.quantity}</Typography>
                    </QuantityBox>
                )}
                <ProductActionButtonBox sx={{position:'absolute', bottom:'0px', zIndex:999}}>
                    <Collapse in={showActionButtons}>
                        <Box sx={{display:'flex', justifyContent:'center', flexDirection:'column', padding:1}}>
                            <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                                <IconButton onClick={()=>setShowActionButtons(false)}><BuyCloseIcon /></IconButton>
                            </Box>
                            <Button disabled={loading} variant='outlined' color='warning' size='small' sx={{marginBottom:1}} onClick={()=>{router.push(`/shop/${product.categoryId}/product/${product._id}`); setLoading(true)}}>View</Button>
                            <Button disabled={loading} variant='contained' color='success' size='small' onClick={addToCart} >Add to Cart</Button>
                        </Box>
                    </Collapse>
                    <Collapse in={!showActionButtons} onClick={()=>setShowActionButtons(true)}>
                        <Button variant='contained' size='small' fullWidth={true} color={'warning'} endIcon={<BuyIcon />}>Buy</Button>
                    </Collapse>
                </ProductActionButtonBox>
                <Image alt={product.name} width={1000} height={1000} src={`/uploads/${product.image?product.image:'product-default.png'}`} />
            </Box>
            <ProductNameText>{product.name}</ProductNameText>
            <ProductPriceText>{CurrencyFormatter.format(product.price)}</ProductPriceText>
            {product.discount.type!='no'&&(
                <ProductDiscountPriceText>{CurrencyFormatter.format(product.originalPrice)}</ProductDiscountPriceText>
            )}
        </ProductContainer>
    )
}

export default Product