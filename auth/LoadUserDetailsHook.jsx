import React, {useContext, useEffect} from 'react'
import { AuthContext } from './AuthProvider';
import AuthApi from '../apis/AuthApi';

const useLoadUserDetails = () => {
    const authContext = useContext(AuthContext);

    const loadUserDetails = ()=>{
        authContext.setAuth({
            loading:true,
            authenticated:false
        })
        AuthApi.user().then((response)=>{
                authContext?.setAuth({
                loading:false,
                authenticated:true,
                user:response.data.user
            })
        }).catch((error) => {
            setAuth({
                loading: false,
                authenticated: false
            })
        })
    }

    return loadUserDetails;
}

export default useLoadUserDetails;