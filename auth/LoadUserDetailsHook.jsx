import React, {useContext, useEffect} from 'react'
import { AuthContext } from './AuthProvider';
import UserApi from '../apis/UserApi';

const useLoadUserDetails = () => {
    const authContext = useContext(AuthContext);

    const loadUserDetails = ()=>{
        authContext?.setAuth({
            loading:true,
            authenticated:false
        })
        UserApi.getUserDetails().then((response)=>{
            authContext?.setAuth({
                loading:false,
                authenticated:true,
                userDetails:response.data.user
            })
        }).catch((error)=>{
            authContext?.setAuth({
                loading:false,
                authenticated:false
            })
        })
    }

    return loadUserDetails;
}

export default useLoadUserDetails;