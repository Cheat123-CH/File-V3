"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../shared/status");
/**
 * Represents an HTTP 401 Unauthorized exception with a customizable message and error detail.
 * This exception is used when authentication is required and has failed or has not yet been provided.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Unauthorized'] - Optional custom error message. Defaults to 'Unauthorized' if not provided.
 * @param {string} [error='Unauthorized'] - Optional custom error detail. Defaults to 'Unauthorized' if not provided.
 */
class UnauthorizedException extends Error {
    constructor(message = 'Unauthorized', error = 'Unauthorized') {
        super(message);
        this.status_code = status_1.HttpStatus.UNAUTHORIZED;
        this.message = message;
        this.error = error;
    }
}
exports.default = UnauthorizedException;
