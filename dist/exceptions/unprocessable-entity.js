"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../shared/status");
/**
 * Represents a 422 Unprocessable Entity error, indicating that the server cannot process the request.
 * This is typically used when the request is syntactically correct but fails semantic validation, such as
 * incorrect JSON values.
 *
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param {string} [message='Unprocessable Entity'] - The custom error message.
 * @param {string[]} [errors=[]] - An array of strings providing additional error details.
 */
class UnprocessableEntityException extends Error {
    constructor(message = 'Unprocessable Entity', errors = []) {
        super(message);
        this.status_code = status_1.HttpStatus.UNPROCESSABLE_ENTITY;
        this.message = message || 'Ok';
        this.errors = errors;
    }
}
exports.default = UnprocessableEntityException;
