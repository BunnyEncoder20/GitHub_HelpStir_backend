class ApiResponse {
    constructor(
        statusCode,
        message = "Default Success Message",
        data
    ){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400     // success = true only when the status code is less then 400, else false
    }
}

export default ApiResponse