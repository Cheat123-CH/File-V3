"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an HTTP Exception with a status code, message, and optional additional error information.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} message - The error message.
 * @param {number} code - The HTTP status code.
 * @param {T} [error] - Optional additional error information.
 */
class HttpException extends Error {
    constructor(message, code, error) {
        super(message);
        this.status_code = code;
        this.message = message || 'This is a bad request.';
        this.error = error;
    }
}
exports.default = HttpException;
