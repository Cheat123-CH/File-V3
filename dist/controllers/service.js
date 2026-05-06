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
const fs_extra_1 = __importDefault(require("fs-extra"));
const bad_request_1 = __importDefault(require("../exceptions/bad-request"));
const file_model_1 = __importDefault(require("../models/file.model"));
const send_file_1 = __importDefault(require("../shared/files/send.file"));
class FileService {
    constructor() {
        this.read = (filename, download, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield file_model_1.default.findOne({
                    where: {
                        filename: filename,
                    }
                });
                if (!file) {
                    throw new bad_request_1.default('Invalid file name');
                }
                fs_extra_1.default.access(file.path, fs_extra_1.default.constants.F_OK, (err) => {
                    if (err) {
                        throw new bad_request_1.default('File not found.');
                    }
                    (0, send_file_1.default)(res, file, download);
                });
            }
            catch (error) {
                throw error;
            }
        });
        this.upload = (file) => __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `api/file/${file.filename}`;
                const fileCreate = yield file_model_1.default.create({
                    filename: file.filename,
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    path: file.path,
                    size: file.size,
                    encoding: file.encoding
                });
                const data = this.properties(uri, fileCreate);
                return {
                    data,
                    message: 'File has been uploaded successfully.'
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    properties(uri, file) {
        return {
            uri,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
        };
    }
}
exports.default = new FileService();
