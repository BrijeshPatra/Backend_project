// Import the Mongoose library for MongoDB interactions
import mongoose from "mongoose";

// Import the database name constant from the "constants.js" file
import { DB_NAME } from "../constants.js";

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using Mongoose
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // If the connection is successful, log a message with the connected host information
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        // If there's an error during the connection attempt, log the error
        console.log("MongoDB connection error ", error);

        // Exit the Node.js process with a status code of 1 to indicate an error
        process.exit(1);
    }
};

// Export the connectDB function to be used in other parts of the application
export default connectDB;
