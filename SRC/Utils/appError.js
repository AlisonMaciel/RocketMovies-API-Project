class AppError {
    message;
    StatusCode;

<<<<<<< HEAD
    constructor(message, statusCode = 401) {
        this.message = message
        this.statusCode = statusCode
=======
    constructor(message, StatusCode = 401) {
        this.message = message
        this.StatusCode = StatusCode
>>>>>>> 9259820b5542c29def31dbf21abd83603dc57208
    }
}

module.exports = AppError