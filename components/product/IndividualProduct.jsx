import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { COLORS } from '../../application/constants/AppConstants'
import { Box } from '../../shared/Box'
import { PageContainer } from '../../shared/Container'
import { Grid } from '../../shared/Grid'
import styled from "styled-components";
import { Typography } from '../../shared/Typography'
import { CurrencyFormatter } from '../../utils/StringProcess'
import { useContext } from 'react'
import { AuthContext } from '../../auth/AuthProvider'
import { useEffect } from 'react'
import { useState } from 'react'
import { Divider } from '../../shared/Divider'
import { Button } from '../../shared/Button'
import OrderApi from '../../apis/OrderApi'
import { Badge } from '@mui/material'
import { AddToCartIcon, CartIcon } from '../../shared/Icons'

const ProductNameText = styled(Typography)`
    margin-top:5px;
    font-weight:700;
    font-size:30px;
    line-height:35px;
    text-transform: uppercase;
    color:${COLORS.secondary.darkGray};
`

const ProductSizeText = styled(Typography)`
    margin-top:5px;
    font-weight:400;
    font-size:30px;
    line-height:35px;
    color:${COLORS.secondary.darkGray};
`

const ProductPriceText = styled(Typography)`
    margin-top:12px;    
    font-weight:500;
    font-size:20px;
    line-height:25px;
    color:${COLORS.primary.black};
`

const ProductDiscountPriceText = styled(Typography)`
    font-weight:500;
    font-size:15px;
    line-height:17px;
    text-decoration: line-through;
    color:${COLORS.secondary.red};
`

const ProductDescriptionText = styled(Typography)`
    margin-top:5px;
    font-weight:300;
    font-size:16px;
    line-height:25px;
    color:${COLORS.primary.black};
`


const IndividualProduct = ({product}) => {
    const router = useRouter()
    const {categoryId, productId} = router.query;
    const authContext = useContext(AuthContext);
    const [cartItem, setCartItem] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(authContext.order){
            const order = authContext.order;
            setCartItem(order.cartItems.find(i => i.productId == product._id))
        }
    },[authContext])

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

    return (
        <PageContainer>
            <Box maxWidth={'md'} sx={{padding:'10px', paddingY:'40px', marginX:'auto', background:COLORS.primary.white}}>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={12} md={6} item>
                        <Image alt={product.name} width={1000} height={1000} src={`/uploads/${product.image?product.image:'product-default.png'}`} />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} item>
                        <Box>
                            <ProductNameText>{product.name}</ProductNameText>
                            <ProductSizeText>{product.size}</ProductSizeText>
                            <ProductPriceText>{CurrencyFormatter.format(product.price)}</ProductPriceText>
                            {product.discount.type!='no'&&(
                                <ProductDiscountPriceText>{CurrencyFormatter.format(product.originalPrice)}</ProductDiscountPriceText>
                            )}
                            <ProductDescriptionText>{product.description}</ProductDescriptionText>
                            <Divider sx={{marginY:3}} />
                            <Button sx={{paddingY:2}} variant='contained' color='secondary' onClick={addToCart} endIcon={<Badge badgeContent={cartItem?cartItem.quantity:0} ><AddToCartIcon /></Badge>} >Add to Cart</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    )
}

export default IndividualProduct