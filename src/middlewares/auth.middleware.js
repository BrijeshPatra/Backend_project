import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

//Middleware: next is used to call next middleware or next response
export const verifyJwt = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
    
        if (!token) {
            throw new ApiError(401,"UnAuthorized request")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
         const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
         //check user present or not
         if(!user){
    
            throw new ApiError(401,"Invalid Access token")
         }
         req.user=user
         next()
    
    } catch (error) {
        throw new ApiError(401,error?.message||"Invalid Access Token")
    }

})