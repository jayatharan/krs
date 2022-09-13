import React from 'react'
import { Box } from '../../shared/Box'
import { PageContainer } from '../../shared/Container'
import { useState } from 'react'
import styled from "styled-components";
import { COLORS } from '../../application/constants/AppConstants'
import { Typography } from '../../shared/Typography'
import { Divider } from '../../shared/Divider'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { TextField } from '../../shared/TextField';
import { Button } from '../../shared/Button';
import AuthApi from '../../apis/AuthApi';
import useLoadUserDetails from '../../auth/LoadUserDetailsHook';
import { setCookie } from '../../utils/CookieAccess';
import { useRouter } from 'next/router';

const TitleText = styled(Typography)`
    margin-top:5px;
    font-weight:800;
    font-size:30px;
    line-height:20px;
    text-align:center;
    color:${COLORS.primary.brown};
`

const Login = () => {
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleLogin = () => {
        setLoading(true);
        AuthApi.login({mobile, password})
        .then(response => {
            setLoading(false);
            setCookie("access-token", response.data.accessToken);
            setCookie("refresh-token", response.data.refreshToken);
            window.location.href = '/'
        }).catch((error)=>{
            setLoading(false)
            console.log (error)
        })
    }

    return (
        <PageContainer>
            <Box sx={{paddingTop:'30px'}}>
                <Box maxWidth='sm' sx={{marginX:'auto', background:COLORS.primary.white, paddingX:1, paddingY:3}}>
                    <TitleText>LOGIN</TitleText>
                    <Divider sx={{marginY:3}} />
                    <PhoneInput
                        country={'lk'}
                        value={mobile}
                        onChange={setMobile}
                        containerStyle={{width:'100%'}}
                        inputStyle={{width:'100%', height:'35px'}}
                        placeholder='+9477222222'
                        specialLabel='Mobile No'
                    />
                    <TextField 
                        size='small'
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        fullWidth={true}
                        sx={{marginTop:2}}
                    />
                    <Button disabled={(!mobile || !password || loading)} onClick={handleLogin} variant='outlined' fullWidth={true} sx={{marginTop:2}}>Login</Button>
                </Box>
            </Box>
        </PageContainer>
    )
}

export default Login