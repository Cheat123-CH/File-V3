"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("./status");
/**
 * Enhances the response to include a status_code if it's not already present.
 * @author Yim Klok <yimklok.kh@gmail.com>
 * @param res - The Express response object.
 * @param data - The data to be sent in the response, which may not include a status_code.
 */
const JsonResponseSuccess = (res, data) => {
    res.status(status_1.HttpStatus.OK).json(Object.assign({ status_code: status_1.HttpStatus.OK }, data));
};
exports.default = JsonResponseSuccess;
