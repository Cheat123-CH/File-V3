"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../shared/status");
/**
 * Represents an HTTP 408 Request Timeout exception with a customizable message and error detail.
 * This exception is used when a server closes a network connection because the client did not complete the request within the server's allotted timeout period.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Request timeout'] - Optional custom error message. Defaults to 'Request timeout' if not provided.
 * @param {string} [error='Request Timeout'] - Optional custom error detail. Defaults to 'Request Timeout' if not provided.
 */
class RequestTimeoutException extends Error {
    constructor(message = 'Request timeout', error = 'Request Timeout') {
        super(message);
        this.status_code = status_1.HttpStatus.REQUEST_TIMEOUT;
        this.message = message;
        this.error = error;
    }
}
exports.default = RequestTimeoutException;
