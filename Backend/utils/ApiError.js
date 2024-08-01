// Class for creating standardized API Error Responses using the Error class of Node.js

class ApiError extends Error {
    constructor(
        statusCode,
        message = "Defualt Error Message",
        errors = [],
        error_stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if (error_stack){
            this.error_stack = error_stack 
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError