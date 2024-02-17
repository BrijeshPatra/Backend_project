// Import necessary libraries and modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Create an Express application
const app = express();

// Middleware: Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Specify the allowed origin from environment variables
    credentials: true // Allow credentials (e.g., cookies) to be sent with cross-origin requests
}));

// Middleware: Parse incoming JSON requests with a limit of 16KB
app.use(express.json({ limit: "16kb" }));

// Middleware: Parse incoming URL-encoded requests with a limit of 16KB
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware: Serve static files from the "public" folder (e.g., favicon images)
app.use(express.static("public"));

// Middleware: Parse cookies from incoming requests
app.use(cookieParser());

//routes import ->seggregation of files
import userRouter from './routes/user.route.js'

//routes declaration {middleware}
app.use("/api/v1/users", userRouter)



// Export the configured Express application
export { app };
