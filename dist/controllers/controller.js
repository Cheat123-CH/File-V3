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
const response_1 = __importDefault(require("../shared/response"));
const service_1 = __importDefault(require("./service"));
const uuid_1 = require("uuid");
const fs_extra_1 = __importDefault(require("fs-extra"));
const extract_buffer_1 = __importDefault(require("../shared/files/extract.buffer"));
const image_payload_1 = __importDefault(require("../shared/files/image.payload"));
const bad_request_1 = __importDefault(require("../exceptions/bad-request"));
class FileController {
    constructor() {
        this.read = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const filename = req.params.filename;
            const download = req.query.download === 'true';
            try {
                return yield service_1.default.read(filename, download, res);
            }
            catch (error) {
                next(error);
            }
        });
        this.upload = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, response_1.default)(res, yield service_1.default.upload(req.file));
            }
            catch (error) {
                next(error);
            }
        });
        this.base64 = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const fileDir = 'public/uploads';
            const sanitize = (text) => (text.replace(/[^\w]/gi, '') || 'unknown').toLowerCase();
            const verifyFile = (filePath) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const fileBuffer = yield fs_extra_1.default.readFile(filePath);
                    return fileBuffer && fileBuffer.length > 0;
                }
                catch (readError) {
                    console.error('Failed to read file for verification', readError);
                    return false; // Return false to indicate the verification failed
                }
            });
            try {
                yield fs_extra_1.default.ensureDir(fileDir);
                const folder = sanitize(req.body.folder);
                const buffer = (0, extract_buffer_1.default)(req.body.image);
                const destinationFolder = `${fileDir}/${folder}`;
                const fileName = (0, uuid_1.v4)();
                const filePath = `${destinationFolder}/${fileName}`;
                yield fs_extra_1.default.mkdir(destinationFolder, { recursive: true });
                yield fs_extra_1.default.writeFile(filePath, buffer);
                if (yield verifyFile(filePath)) {
                    const file = (0, image_payload_1.default)(fileName, filePath, buffer);
                    return (0, response_1.default)(res, yield service_1.default.upload(file));
                }
                else {
                    yield fs_extra_1.default.unlink(filePath).catch(e => console.error('Failed to delete unverified file', e));
                    throw new bad_request_1.default('File verification failed. The file might be corrupted or inaccessible.');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new FileController();
