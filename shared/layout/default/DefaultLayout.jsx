import React from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import styled from "styled-components";
import { Box } from '../../Box';

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
                {children}
            </Body>
            <Footer />
        </>
    )
}

export default DefaultLayout