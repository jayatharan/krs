import React, { useState, createContext, useEffect } from 'react'
import AuthApi from '../apis/AuthApi';
import { setAuthHeader } from "../apis/AxiosInstance";
import OrderApi from '../apis/OrderApi';
import { getCookie, setCookie } from "../utils/CookieAccess";
import { useSetRecoilState } from 'recoil'
import { CategoryListData } from '../recoil/categoryList/CategoryListAtom';
import CategoryApi from '../apis/CategoryApi';
import SubCategoryApi from '../apis/SubCategoryApi';
import { SubCategoryListData } from '../recoil/subCategoryListAtom.js/SubCategoryListAtom';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        loading: true,
        authenticated: false
    });
    const [order, setOrder] = useState(null);

    const setCategoryListData = useSetRecoilState(CategoryListData)
    const setSubCategoryListData = useSetRecoilState(SubCategoryListData)

    const loadUserData = () => {
        const access_token = getCookie('access-token');
        setAuthHeader(access_token);
        setAuth({
            loading: true,
            authenticated: false
        })
        AuthApi.user().then((response) => {
            setAuth({
                loading:false,
                authenticated:true,
                user: response.data.user
            })
        }).catch((error) => {
            setAuth({
                loading: false,
                authenticated: false
            })
        })
    }

    useEffect(() => {
        loadUserData();
    }, [])

    useEffect(()=>{
        if(!auth.loading){
            let orderId = getCookie('order-id');
            let data = {}
            if(orderId){
                data = {orderId}
            }
            OrderApi.initiateOrderAsync(data).then(response => {
                setOrder(response.data);
                if(response.data._id != orderId){
                    setCookie('order-id', response.data._id, 12)
                }
            })
            CategoryApi.getCategoriesAsync().then(response => {
                setCategoryListData(response.data);
            })
            SubCategoryApi.getSubCategoriesAsync().then(response => {
                setSubCategoryListData(response.data);
            })
        }
    },[auth.loading])

    return (
        <AuthContext.Provider value= {{ auth, setAuth, order, setOrder }}>
            { auth.loading ? <div>Loading...</div> : <>{children}</>}
        </AuthContext.Provider>
    )
}

export default AuthProvider