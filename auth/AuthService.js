import { setCookie, getCookie, deleteCookie } from '../utils/CookieAccess';
import { setAuthHeader } from '../apis/AxiosInstance';
import axios from "axios";

export const refreshAccessToken = async ()=>{
    const refreshToken = getCookie('refresh-token');
    const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;
    try{
        const response = (await axios.post(
            `${baseURL}/auth/refresh-token`,
            {
                refreshToken
            }
        )).data;
        setCookie('access-token', response.data.accessToken, 1);
        setAuthHeader(response.data.accessToken);
        return true;
    }catch (error){
        deleteCookie('access-token');
        deleteCookie('refresh-token');
        return false;
    }
}