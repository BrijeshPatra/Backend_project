// Define a custom class "ApiError" that extends the built-in Error class
class ApiError extends Error {
    // Constructor method for creating instances of ApiError
    constructor(
        statusCode,            // HTTP status code to be sent in the response
        message = "Something went wrong", // Default error message if not provided
        errors = [],           // Optional array of error details or additional information
        stack = ""             // Optional stack trace string
    ) {
        // Call the constructor of the parent class (Error) with the provided message
        super(message);

        // Set properties specific to the ApiError class
        this.statusCode = statusCode; // HTTP status code
        this.data = null;             // Additional data (not used in the provided code)
        this.message = message;       // Error message
        this.success = false;         // Indicates if the operation was successful (false for errors)
        this.errors = errors;         // Array of error details or additional information

        // If a stack trace is provided, set the stack property; otherwise, capture the stack trace
        if (stack) {
            this.stack = stack;
        } else {
            // Capture the stack trace by calling the captureStackTrace method
            // The second argument (this.constructor) helps to remove the constructor from the stack trace
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Export the ApiError class to be used in other parts of the application
export { ApiError };
