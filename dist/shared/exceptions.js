"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsFilter = void 0;
// Import all exceptions
const bad_gateway_1 = __importDefault(require("../exceptions/bad-gateway"));
const bad_request_1 = __importDefault(require("../exceptions/bad-request"));
const conflict_1 = __importDefault(require("../exceptions/conflict"));
const forbidden_1 = __importDefault(require("../exceptions/forbidden"));
const gateway_timeout_1 = __importDefault(require("../exceptions/gateway-timeout"));
const internal_server_error_1 = __importDefault(require("../exceptions/internal-server-error"));
const not_acceptable_1 = __importDefault(require("../exceptions/not-acceptable"));
const not_found_1 = __importDefault(require("../exceptions/not-found"));
const not_implemented_1 = __importDefault(require("../exceptions/not-implemented"));
const request_timeout_1 = __importDefault(require("../exceptions/request-timeout"));
const unauthorized_1 = __importDefault(require("../exceptions/unauthorized"));
const unprocessable_entity_1 = __importDefault(require("../exceptions/unprocessable-entity"));
/**
 * @author Yim Klok <yimklok.kh@gmail.com>
 */
class ErrorsFilter {
    static error() {
        return (err, _req, res, _next) => {
            // Map each exception to its status code
            const exceptionMap = new Map([
                [bad_gateway_1.default, 502],
                [bad_request_1.default, 400],
                [conflict_1.default, 409],
                [forbidden_1.default, 403],
                [gateway_timeout_1.default, 504],
                [internal_server_error_1.default, 500],
                [not_acceptable_1.default, 406],
                [not_found_1.default, 404],
                [not_implemented_1.default, 501],
                [request_timeout_1.default, 408],
                [unauthorized_1.default, 401],
                [unprocessable_entity_1.default, 422],
            ]);
            // Find the status code for the current error
            const status_code = exceptionMap.get(err.constructor) || 500; // Default to 500 if error type is not in the map
            // Send the response
            return res.status(status_code).send({
                status_code: status_code,
                message: (err === null || err === void 0 ? void 0 : err.message) || 'Something when wrong',
                error: (err === null || err === void 0 ? void 0 : err.error) || undefined,
                errors: (err === null || err === void 0 ? void 0 : err.errors) || undefined
            });
        };
    }
}
exports.ErrorsFilter = ErrorsFilter;
exports.default = ErrorsFilter;
