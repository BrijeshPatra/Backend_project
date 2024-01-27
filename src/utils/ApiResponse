// Define a class "ApiResponse" to represent the structure of an API response
class ApiResponse {
    // Constructor method for creating instances of ApiResponse
    constructor(statusCode, data, message = "Success") {
        // Set properties based on the provided arguments
        this.statusCode = statusCode;             // HTTP status code of the response
        this.data = data;                         // Data to be included in the response
        this.message = message;                   // Response message (default is "Success")
        this.success = statusCode < 400;          // Indicates if the operation was successful
    }
}

// Export the ApiResponse class to be used in other parts of the application
export { ApiResponse };
