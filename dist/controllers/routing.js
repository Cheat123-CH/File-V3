"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const multer_1 = __importDefault(require("./multer"));
const validation_1 = require("./validation");
const fileRouter = express_1.default.Router();
fileRouter.get("/:filename", controller_1.default.read);
fileRouter.post("/upload-single", multer_1.default, controller_1.default.upload);
fileRouter.post("/upload-base64", validation_1.UploadValidation, controller_1.default.base64);
exports.default = fileRouter;
