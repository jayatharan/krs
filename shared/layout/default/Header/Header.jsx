import React, { useContext } from 'react'
import { AppBar } from '../../../AppBar';
import styled from "styled-components";
import { AuthContext } from '../../../../auth/AuthProvider';
import { Container } from '../../../Container';
import { Typography } from '../../../Typography';
import { Box } from '../../../Box';
import { BackIcon, CartIcon, LeftIcon, NavMenuIcon } from '../../../Icons';
import { IconButton } from '@mui/material';
import { Badge } from '../../../Badge';
import { COLORS } from '../../../../application/constants/AppConstants';
import { useRouter } from 'next/router'
import { SwipeableDrawer } from '../../../Drawer';
import { useState } from 'react';
import Cart from '../../../../components/cart/Cart';
import {useRecoilState} from "recoil";
import { HeaderMenuData } from '../../../../recoil/headerData/HeaderMenuDataAtom';
import Menu from '../../../../components/menu/Menu';

const CustomAppBar = styled(AppBar)`
    &&{
        width:100%;
        height:70px;
        background:#FFFFFF;
        box-shadow:none;
        color:#000000;
        border-bottom:1px solid ${COLORS.primary.brown};
    }
`;

const NavLink = styled(Typography)`
    &&{
        font-weight:500;
        font-size:14px;
        line-height:65px;
        color:${COLORS.primary.brown};
        margin-right:24px;
        cursor:pointer;

    }
`

const styleNavActive = {
    borderBottom: `3px solid #3C1404`
}

const Header = () => {
    const authContext = useContext(AuthContext);
    const router = useRouter()
    const [currMenu, setCurrMenu] = useRecoilState(HeaderMenuData);

    const toggleDrawer = (type)=> {
        setCurrMenu(type);
    }

    return (
        <>
            <SwipeableDrawer
                anchor='left'
                open={currMenu == 'menu'}
                onClose={()=>setCurrMenu('')}
                onOpen={()=>toggleDrawer('menu')}
            >
                <Menu />
            </SwipeableDrawer>
            <SwipeableDrawer
                anchor='right'
                open={currMenu == 'cart'}
                onClose={()=>setCurrMenu('')}
                onOpen={()=>toggleDrawer('cart')}
            >
                <Box sx={{position:'relative'}}>
                    <IconButton onClick={()=>setCurrMenu('')} sx={{position:'absolute', top:'3px'}}>
                        <BackIcon />
                    </IconButton>
                    <Cart />
                </Box>
            </SwipeableDrawer>
            <CustomAppBar>
                <Container maxWidth={'xl'} sx={{ display: {xs:'none', md:'flex'}, alignItems: 'center', height: '100%', justifyContent: 'center', position:'relative' }}>
                    <Typography sx={{position:'absolute', left:'100px'}}>LOGO</Typography>
                    <Box sx={{display:'flex', alignItems:'center'}}>
                        <NavLink style={styleNavActive} onClick={() => router.push(`/`)}>HOME</NavLink>
                        <NavLink>ABOUT US</NavLink>
                        <NavLink>BLOG</NavLink>
                    </Box>
                    <IconButton sx={{position:'absolute', right:'100px'}} onClick={()=>toggleDrawer('cart')}>
                        <Badge badgeContent={authContext.order?authContext.order.cartItems.length:0} color={'warning'}>
                            <CartIcon />
                        </Badge>
                    </IconButton>
                </Container>
                <Container maxWidth={'xl'} sx={{ display: {xs:'flex', md:'none'}, alignItems: 'center', height: '100%', justifyContent: 'space-between' }}>
                    <IconButton onClick={()=>toggleDrawer('menu')}>
                        <NavMenuIcon />
                    </IconButton>
                    <Typography textAlign='center'>LOGO</Typography>
                    <IconButton onClick={()=>toggleDrawer('cart')}>
                        <Badge badgeContent={authContext.order?authContext.order.cartItems.length:0} color={'warning'}>
                            <CartIcon />
                        </Badge>
                    </IconButton>
                </Container>
            </CustomAppBar>
        </>
    )
}

export default Header