import mongoose , {Schema} from "mongoose";
import jwt  from "jsonwebtoken";

const userSchema=new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //cloudinary url [services]
        required: true,
    },
    coverImage: {
        type: String
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true,'Password is required'] //in true field we can give our own message
    },  
    refreshToken: {
        type: String,
    },

},{
    timestamps: true
})

//pre hook it is a middleware function execute one after another when each middleware calls. It means the pre() working is to protect the data before it is saved
userSchema.pre("save",async function(req,res,next){

    if(!this.isModified("password"))return next();

    //here password is encrypted
    this.password=bcrypt.hash(this.password,10)
    next()
})

//Check if password is correct or not using bcrypt
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=async function(){
   return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=async function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("Users",userSchema)

