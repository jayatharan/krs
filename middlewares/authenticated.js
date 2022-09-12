import { NextApiRequest, NextApiResponse } from 'next'
import jwt from "jsonwebtoken"

const JWT_ACCESS_SECRET = process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET

const authenticated = (handler, options) => {
    return async (req, res) => {
        const { method } = req
        let accessToken = "";
        if(req.headers['authorization']){
            accessToken = req.headers['authorization'].replace(
                /^Bearer\s/,
                ""
            )
        }

        let decoded = {}

        try{
            decoded = jwt.verify(accessToken, JWT_ACCESS_SECRET);
            req.user = decoded;
            
        }catch (error){
            if(options[method] && options[method].active){
                return res.status(401).json({ success:false, message: "unauthorized" })
            }else{
                return handler(req, res)
            }
        }

        if(options[method] && options[method].active){
            const roles = options[method].roles;
            
            if(roles && roles.length > 0){
                const role = decoded.role;
                if(!roles.includes(role)){
                    return res.status(401).json({ success:false, message: "unauthorized" })
                }
            }

            return handler(req, res)
        }else{
            return handler(req, res)
        }
    }
}

export default authenticated;