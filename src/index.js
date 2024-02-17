
// Import necessary libraries and modules
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js"

// Configure dotenv to load environment variables from './env' file
dotenv.config({
    path: './env'
});

// Connect to MongoDB using the connectDB function
connectDB()
    .then(() => {
        // If MongoDB connection is successful, start the Express server
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        // If MongoDB connection fails, log the error
        console.log("Server not connected !!", err);
    });




























// import express from "express"
// const app=express()
// //connect db in professional way

// ;(async () => { 
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/{DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("ERROR:", error);
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port  ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("ERROR: ", error)
//         throw err
//     }
// })()