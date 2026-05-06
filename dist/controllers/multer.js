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
const multer_1 = __importDefault(require("multer"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const unlink_file_1 = __importDefault(require("../shared/fs-extra/unlink.file"));
const rename_file_1 = __importDefault(require("../shared/fs-extra/rename.file"));
const storage_multer_1 = __importDefault(require("../shared/fs-extra/storage.multer"));
const bad_request_1 = __importDefault(require("../exceptions/bad-request"));
const validation_1 = require("./validation");
// Configure multer for single file upload
const handleSingleFileUpload = (0, multer_1.default)({
    storage: storage_multer_1.default, // Custom storage configuration
    limits: {
        fileSize: 512 * 1024 * 1024, // Max file size (512MB)
        files: 1, // Limit to 1 file
    }
}).single('file'); // Specify the form field name
const singleFileMulter = (req, res, next) => {
    // Execute multer upload
    handleSingleFileUpload(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Handle multer-specific errors
            if (error instanceof multer_1.default.MulterError) {
                // Map of known multer errors to custom messages
                const errorMessages = {
                    LIMIT_FILE_SIZE: 'File size limit exceeded.',
                    LIMIT_UNEXPECTED_FILE: 'Field file is required.',
                    LIMIT_FILE_COUNT: 'Only one file allowed! Please select only one file.',
                };
                throw new bad_request_1.default(errorMessages[error.code] || 'Multer error.');
            }
            else if (error) {
                // Handle other errors
                throw new bad_request_1.default(`An unexpected error occurred: ${error.message}`);
            }
            if (!req.file) {
                // No file was uploaded
                throw new bad_request_1.default('No file uploaded! Please select a file.');
            }
            // Perform custom request validation (not shown)
            const validationError = (0, validation_1.ValidationRequest)(req);
            if (validationError) {
                // Validation failed, delete the uploaded file
                (0, unlink_file_1.default)(req.file.path);
                throw new bad_request_1.default(validationError);
            }
            // Determine the destination directory for the file
            const sanitize = (text) => (text.replace(/[^\w]/gi, '') || 'unknown').toLowerCase();
            const folder = sanitize(req.body.folder); // Derived from request body
            const destinationFolder = `public/uploads//${folder}/`;
            yield fs_extra_1.default.ensureDir(destinationFolder); // Ensure the directory exists
            // Move the file to the target location
            const sourceFilePath = req.file.path;
            const targetFilePath = `${destinationFolder}${req.file.filename}`;
            yield (0, rename_file_1.default)(sourceFilePath, targetFilePath);
            // Update request file properties to reflect new location
            req.file.path = targetFilePath;
            req.file.destination = destinationFolder;
            next(); // Proceed to the next middleware
        }
        catch (err) {
            // Pass any errors to the next error-handling middleware
            next(err);
        }
    }));
};
exports.default = singleFileMulter;
