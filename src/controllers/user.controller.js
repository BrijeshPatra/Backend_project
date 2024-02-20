import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//Controller for register
const registerUser=asyncHandler(async(req,res)=>{
   //get user details from frontend
    const{fullname,email,username,password} = req.body
    console.log("email",email);

   //validation - not empty
  if (
    [fullname,email,username,password].some((field)=> field?.trim()=="")
  ) {
    throw new ApiError(400,"All fields are required")
  }
   
   // check if user already exists (email,username)
   const existedUser = await User.findOne({
    $or: [{ username },{ email }]
})

    if(existedUser){
        throw new ApiError(409,"User with email or username already exist")
    }

   // check if images is available or not(check for avtar)->compulsory
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

   // upload them to cloudinary if it is available, check for avtar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

   //create user object-create entry in db 
   const user=await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || " ",
        email,
        password,
        username: username.toLowerCase()
    })
    //remove password and refresh token field from response
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

   //check for user creation
   if(!createdUser){
    throw new ApiError(500,"Something went wrong while registring the user")
   }

  //return response if it is created else throw error
   return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully ")
   )

})

//Controller for login
const loginUser=asyncHandler(async(req,res)=>{

    //req body-> Bring data from req body
    const {email,username,password} = req.body

    //check user by username or email
    if(!username || email){
        throw new ApiError(400,"Username or email is required")
    }

    //find user
    const user= await User.findOne({
        //or operator will find the username or email from user
        $or: [{username,email}]
    })

    if (!user) {
        throw new ApiError(404,"User doesnot exist")
    }   

    //Check password
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Password incorrect")
    }


    //If password is valid then generate Access and Refresh token
    const generateAccessAndRefreshToken= async(userId) => {
        try {
           const user = await User.findById(userId)
           const accessToken = user.generateAccessToken
           const refreshToken = user.generateRefreshToken

            //Add refresh token in database
            user.refreshToken=refreshToken

            //validateBeforeSave: It means save it and do not add any validation
            await user.save({validateBeforeSave: false})

            return {accessToken,refreshToken}

        } catch (error) {
            throw new ApiError(500,"Something went wrong")
        }
    }

    //store the access token and refresh token and method call by id
    const {accessToken,refreshToken} = 
    await generateAccessAndRefreshToken(user._id);

    //here user will not be able to see the password and refresh token
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    //send the cookie
    const options = {

        //we used httpOnly and secure because it is not 
        //modifiable it is only allowed to get modified by server
        httpOnly: true,
        secure: true
    }

    //return response and send the cookies
    return res.status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            //we send here loggedInUser,accessToken,refreshToken
            //because to be sure if user wants to save manually these things
            200,
            {
                user: loggedInUser,accessToken,refreshToken
            },
            "User logged in successfully"
        )
    )
})
 //Controller for logout user
 const logoutUser=asyncHandler(async(req,res)=>{
    //for logout we have to remove the cookies
    //we need middleware for logout
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {

        //we used httpOnly and secure because it is not 
        //modifiable it is only allowed to get modified by server
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out successfully"))
})
export {
    registerUser,
    loginUser,
    logoutUser
}