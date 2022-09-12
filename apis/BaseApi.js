import { HttpMethods } from "../application/constants/HttpMethods";
import axiosInstance from "./AxiosInstance";
import { refreshAccessToken } from '../auth/AuthService';

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
        let axiosPromise = null
        try{
            axiosPromise = await axiosInstance.request({
                method: method,
                url: endPoint,
                params: queryStringParameters,
                data: data,
            });
        }catch (error){
            if(error && error.response && (error.response.status == 401 || error.response.status == 403)){
                retry = true;
                const result = await refreshAccessToken();
                if (result) {
                    axiosPromise = await axiosInstance.request({
                        method: method,
                        url: endPoint,
                        params: queryStringParameters,
                        data: data,
                    });
                }
            }
        }

        return axiosPromise.data;
    }
}