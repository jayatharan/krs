import { HttpMethods } from "../application/constants/HttpMethods";
import axiosInstance from "./AxiosInstance";
import { refreshAccessToken } from '../auth/AuthService';
import { getCookie } from "../utils/CookieAccess";

export default class BaseApi {

    async getAsync(
        endPoint,
        queryStringParameters = undefined
    ) {
        return await this.executeAsync(HttpMethods.Get, endPoint, queryStringParameters)
    }

    async postAsync(
        endPoint,
        queryStringParameters = undefined,
        data = undefined
    ) {
        return await this.executeAsync(HttpMethods.Post, endPoint, queryStringParameters, data)
    }

    async putAsync(
        endPoint,
        queryStringParameters = undefined,
        data = undefined
    ) {
        return await this.executeAsync(HttpMethods.Put, endPoint, queryStringParameters, data)
    }

    async patchAsync(
        endPoint,
        queryStringParameters = undefined,
        data = undefined
    ) {
        return await this.executeAsync(HttpMethods.Patch, endPoint, queryStringParameters, data)
    }

    async deleteAsync(
        endPoint,
        queryStringParameters = undefined
    ) {
        return await this.executeAsync(HttpMethods.Delete, endPoint, queryStringParameters)
    }
    
    async executeAsync (
        method,
        endPoint,
        queryStringParameters=undefined,
        data=undefined,
    ) {
        let retry = false;
        const accessToken = getCookie('access-token');
        if(!accessToken) await refreshAccessToken();
        
        const axiosPromise = await axiosInstance.request({
            method: method,
            url: endPoint,
            params: queryStringParameters,
            data: data,
        })

        return axiosPromise.data;
    }
}