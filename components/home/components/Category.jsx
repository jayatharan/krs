import React from 'react'
import styled from "styled-components";
import { COLORS } from '../../../application/constants/AppConstants';
import { Box } from '../../../shared/Box';
import { Button } from '../../../shared/Button';
import { Typography } from '../../../shared/Typography';
import Image from 'next/image'
import { useRouter } from 'next/router'

const CategoryContainer = styled(Box)`
    background:${COLORS.primary.white};
    padding:10px;
    box-shadow:4px 8px 12px rgba(30, 30, 30, 0.18);
`

const ShopNowButton = styled(Button)``;

const CategoryNameText = styled(Typography)`
    font-weight:700;
    font-size:20px;
    line-height:40px;
    text-align:center;
    color:${COLORS.primary.brown};
`

const Category = ({category}) => {
    const router = useRouter()

    return (
        <CategoryContainer>
            <Image alt={category.name} width={1000} height={500} src={`/uploads/${category.image?category.image:'category-default.png'}`} />
            <CategoryNameText>{category.name}</CategoryNameText>
            <ShopNowButton fullWidth={true} variant='contained' sx={{paddingY:2}} onClick={() => router.push(`/shop/${category._id}`)}>SHOP NOW</ShopNowButton>
        </CategoryContainer>
    )
}

export default Category