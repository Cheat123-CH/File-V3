"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../shared/status");
/**
 * Represents an HTTP 504 Gateway Timeout exception with a customizable message and error detail.
 * This exception is used when a server acting as a gateway or proxy does not receive a timely response from an upstream server.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Gateway timeout'] - Optional custom error message. Defaults to 'Gateway timeout' if not provided.
 * @param {string} [error='Gateway Timeout'] - Optional custom error detail. Defaults to 'Gateway Timeout' if not provided.
 */
class GatewayTimeoutException extends Error {
    constructor(message = 'Gateway timeout', error = 'Gateway Timeout') {
        super(message);
        this.status_code = status_1.HttpStatus.GATEWAY_TIMEOUT;
        this.message = message;
        this.error = error;
    }
}
exports.default = GatewayTimeoutException;
