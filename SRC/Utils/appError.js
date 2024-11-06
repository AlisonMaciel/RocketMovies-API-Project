class AppError {
    message;
    StatusCode;

    constructor(message, StatusCode = 401) {
        this.message = message
        this.StatusCode = StatusCode
    }
}

module.exports = AppError