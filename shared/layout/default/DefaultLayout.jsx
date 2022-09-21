import React from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import styled from "styled-components";
import { Box } from '../../Box';
import CarouselSlides from './CarouselSlides/CarouselSlides';

const Body = styled(Box)`
    margin-top:70px;
    min-height:90vh;
    background:#f8f5ec;
`

const DefaultLayout = ({children}) => {
    return (
        <>
            <Header />
            <Body>
                <CarouselSlides />
                {children}
            </Body>
            <Footer />
        </>
    )
}

export default DefaultLayout