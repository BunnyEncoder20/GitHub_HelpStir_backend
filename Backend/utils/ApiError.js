// Class for creating standardized API Error Responses using the Error class of Node.js

class ApiError extends Error {
    constructor(
        statusCode,
        msg = "Defualt Error Message",
        errors = [],
    ){
        super(msg);
        this.statusCode = statusCode;
        this.data = null;
        this.msg = msg;
        this.success = false;
        this.errors = errors;
        // this.error_stack = error_stack || this.stack
    }
}

export default ApiError