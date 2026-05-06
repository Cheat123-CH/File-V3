"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../shared/status");
/**
 * Represents an HTTP 400 Bad Request exception with a customizable message and error detail.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='This is a bad request.'] - Optional custom error message. Defaults to a generic bad request message if not provided.
 * @param {string} [error='Bad Request'] - Optional custom error detail. Defaults to 'Bad Request' if not provided.
 */
class BadRequestException extends Error {
    constructor(message = 'This is a bad request.', error = 'Bad Request') {
        super(message);
        this.status_code = status_1.HttpStatus.BAD_REQUEST;
        this.message = message;
        this.error = error;
    }
}
exports.default = BadRequestException;
