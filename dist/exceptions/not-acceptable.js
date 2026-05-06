"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../shared/status");
/**
 * Represents an HTTP 406 Not Acceptable exception with a customizable message and error detail.
 * This exception is used when the server cannot produce a response matching the list of acceptable values defined in the request's proactive content negotiation headers, and the server is unwilling to supply a default representation.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Not acceptable'] - Optional custom error message. Defaults to 'Not acceptable' if not provided.
 * @param {string} [error='Not Acceptable'] - Optional custom error detail. Defaults to 'Not Acceptable' if not provided.
 */
class NotAcceptableException extends Error {
    constructor(message = 'Not acceptable', error = 'Not Acceptable') {
        super(message);
        this.status_code = status_1.HttpStatus.NOT_ACCEPTABLE;
        this.message = message;
        this.error = error;
    }
}
exports.default = NotAcceptableException;
