import React from 'react'
import { PageContainer } from '../../shared/Container'
import styled from "styled-components";
import { Typography } from '../../shared/Typography'
import { COLORS } from '../../application/constants/AppConstants'
import { Box } from '../../shared/Box'
import { Divider } from '../../shared/Divider'
import SignUpForm from './signupForm/SignUpForm';

const TitleText = styled(Typography)`
    margin-top:5px;
    font-weight:800;
    font-size:30px;
    line-height:20px;
    text-align:center;
    color:${COLORS.primary.brown};
`

const SignUp = () => {
    return (
        <PageContainer>
            <Box sx={{paddingTop:'30px'}}>
                <Box maxWidth='sm' sx={{marginX:'auto', background:COLORS.primary.white, paddingX:1, paddingY:3}}>
                    <TitleText>SIGN UP</TitleText>
                    <Divider sx={{marginY:3}} />
                    <SignUpForm />
                </Box>
            </Box>
        </PageContainer>
    )
}

export default SignUp