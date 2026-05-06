"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../shared/status");
/**
 * Represents an HTTP 500 Internal Server Error exception with a customizable message and error detail.
 * This exception is used when the server encounters an unexpected condition that prevented it from fulfilling the request.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Internal server error'] - Optional custom error message. Defaults to 'Internal server error' if not provided.
 * @param {string} [error='Internal Server Error'] - Optional custom error detail. Defaults to 'Internal Server Error' if not provided.
 */
class InternalServerErrorException extends Error {
    constructor(message = 'Internal server error', error = 'Internal Server Error') {
        super(message);
        this.status_code = status_1.HttpStatus.INTERNAL_SERVER_ERROR;
        this.message = message;
        this.error = error;
    }
}
exports.default = InternalServerErrorException;
