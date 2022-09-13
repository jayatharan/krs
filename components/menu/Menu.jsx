import { ListItemIcon } from '@mui/material'
import React from 'react'
import { Box } from '../../shared/Box'
import { MenuAboutIcon, MenuBlogIcon, MenuCategoriesIcon, MenuCollapseIcon, MenuExpandIcon, MenuHomeIcon, MenuLoginIcon, MenuOrderIcon, MenuSignUpIcon } from '../../shared/Icons'
import { List, ListItem, ListItemButton, ListItemText } from '../../shared/List'
import styled from "styled-components";
import { Typography } from '../../shared/Typography'
import { COLORS } from '../../application/constants/AppConstants'
import { useRouter } from 'next/router'
import {useRecoilState} from "recoil";
import { HeaderMenuData } from '../../recoil/headerData/HeaderMenuDataAtom'
import { useState } from 'react'
import { Collapse } from '../../shared/Collapse'
import { CategoryListData } from '../../recoil/categoryList/CategoryListAtom'
import { useContext } from 'react'
import { AuthContext } from '../../auth/AuthProvider'

const NavLink = styled(Typography)`
    &&{
        font-weight:600;
        font-size:14px;
        color:${COLORS.primary.brown};
    }
`

const NavCategoryLink = styled(Typography)`
    &&{
        font-weight:500;
        font-size:14px;
        color:${COLORS.primary.brown};
    }
`

const Menu = () => {
    const router = useRouter()
    const [currMenu, setCurrMenu] = useRecoilState(HeaderMenuData);
    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useRecoilState(CategoryListData);
    const authContext = useContext(AuthContext);

    const changeRoute = (path)=>{
        router.push(path)
        setCurrMenu('')
    }

    return (
        <Box sx={{minWidth:'250px', paddingTop:'20px'}}>
            <Typography textAlign='center'>LOGO</Typography>
            <List>
                <ListItemButton onClick={() => changeRoute(`/`)}>
                    <ListItemIcon><MenuHomeIcon /></ListItemIcon>
                    <ListItemText>
                        <NavLink>Home</NavLink>
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => setShowCategories(!showCategories)}>
                    <ListItemIcon><MenuCategoriesIcon /></ListItemIcon>
                    <ListItemText>
                        <NavLink>Categories</NavLink>
                    </ListItemText>
                    {showCategories?(<MenuCollapseIcon />):(<MenuExpandIcon />)}
                </ListItemButton>
                <Collapse in={showCategories}>
                    <List>
                        {categories.map(c => (
                            <ListItemButton key={c._id} sx={{ pl: 4, marginY:1, paddingY:0 }} onClick={() => changeRoute(`/shop/${c._id}`)}>
                                <ListItemText>
                                    <NavCategoryLink>{c.name}</NavCategoryLink>
                                </ListItemText>
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
                <ListItemButton onClick={() => changeRoute(`/about`)}>
                    <ListItemIcon><MenuAboutIcon /></ListItemIcon>
                    <ListItemText>
                        <NavLink>About Us</NavLink>
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => changeRoute(`/blog`)}>
                    <ListItemIcon><MenuBlogIcon /></ListItemIcon>
                    <ListItemText>
                        <NavLink>Blog</NavLink>
                    </ListItemText>
                </ListItemButton>
                {!authContext.auth.authenticated?(
                    <>
                        <ListItemButton onClick={() => changeRoute(`/login`)}>
                            <ListItemIcon><MenuLoginIcon /></ListItemIcon>
                            <ListItemText>
                                <NavLink>Login</NavLink>
                            </ListItemText>
                        </ListItemButton>
                        <ListItemButton onClick={() => changeRoute(`/sign-up`)}>
                        <ListItemIcon><MenuSignUpIcon /></ListItemIcon>
                            <ListItemText>
                                <NavLink>Sign Up</NavLink>
                            </ListItemText>
                        </ListItemButton>
                    </>
                ):(
                    <>
                        <ListItemButton onClick={() => changeRoute(`/my-orders`)}>
                            <ListItemIcon><MenuOrderIcon /></ListItemIcon>
                            <ListItemText>
                                <NavLink>My Orders</NavLink>
                            </ListItemText>
                        </ListItemButton>
                    </>
                )}
            </List>
        </Box>
    )
}

export default Menu