"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../shared/status");
/**
 * Represents a 502 Bad Gateway error. This exception is used when a server acting as a gateway
 * or proxy receives an invalid response from an upstream server.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Bad Gateway'] - The custom error message.
 * @param {string} [error='Bad Gateway'] - Additional detail about the error.
 */
class BadGatewayException extends Error {
    constructor(message = 'Bad Gateway', error = 'Bad Gateway') {
        super(message);
        this.status_code = status_1.HttpStatus.BAD_GATEWAY;
        this.message = message;
        this.error = error;
    }
}
exports.default = BadGatewayException;
