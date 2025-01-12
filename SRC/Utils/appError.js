class AppError {
    message;
    StatusCode;

    constructor(message, statusCode = 401) {
        this.message = message
        this.statusCode = statusCode 
    }
}

module.exports = AppError