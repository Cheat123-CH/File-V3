"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationRequest = exports.UploadValidation = void 0;
const express_validator_1 = require("express-validator");
const unprocessable_entity_1 = __importDefault(require("../exceptions/unprocessable-entity"));
const regex = /^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+/]+={0,2}$/;
exports.UploadValidation = [
    // Field name
    (0, express_validator_1.body)('folder').notEmpty().withMessage('Folder is required')
        .isString().withMessage('Folder must be a string')
        .isLength({ min: 2 }).withMessage('Folder must be at least 2 characters long')
        .matches(/^[A-Za-z0-9-]+$/).withMessage('Folder can only contain alphanumeric characters and hyphens'),
    // Field image
    (0, express_validator_1.body)('image')
        .notEmpty().withMessage('Image is required')
        .matches(regex).withMessage('Image must be a valid base64'),
    // Middleware to check the result of the validation above
    (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Check validate fields
            const errors = (0, express_validator_1.validationResult)(req).array();
            if (errors.length) {
                return next(new unprocessable_entity_1.default("Invalid Entity", errors.map((error) => error.msg)));
            }
            next();
        }
        catch (error) {
            next(error);
        }
    })
];
const ValidationRequest = (req) => {
    if (!req.body.folder) {
        return 'Field folder is required!';
    }
    else if (!/^[A-Za-z0-9-]+$/.test(req.body.folder)) {
        return 'Field folder is invalid!';
    }
    return null;
};
exports.ValidationRequest = ValidationRequest;
