"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../shared/status");
/**
 * Represents an HTTP 403 Forbidden exception with a customizable message and error detail.
 * This exception should be thrown when the server understands the request but refuses to authorize it.
 * A server that wishes to make public why the request has been forbidden can describe that reason in the error message.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Forbidden'] - Optional custom error message. Defaults to 'Forbidden' if not provided, indicating the client does not have the rights to access the content.
 * @param {string} [error='Forbidden'] - Optional custom error detail. Defaults to 'Forbidden' if not provided, further explaining the reason why access is denied.
 */
class ForbiddenException extends Error {
    constructor(message = 'Forbidden', error = 'Forbidden') {
        super(message);
        this.status_code = status_1.HttpStatus.FORBIDDEN;
        this.message = message;
        this.error = error;
    }
}
exports.default = ForbiddenException;
