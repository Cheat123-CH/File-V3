"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../shared/status");
/**
 * Represents an HTTP 409 Conflict exception with a customizable message and error detail.
 * This exception should be thrown when a request conflict with the current state of the server.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Conflict'] - Optional custom error message. Defaults to 'Conflict' if not provided.
 * @param {string} [error='Conflict'] - Optional custom error detail. Defaults to 'Conflict' if not provided.
 */
class ConflictException extends Error {
    constructor(message = 'Conflict', error = 'Conflict') {
        super(message);
        this.status_code = status_1.HttpStatus.CONFLICT;
        this.message = message;
        this.error = error;
    }
}
exports.default = ConflictException;
