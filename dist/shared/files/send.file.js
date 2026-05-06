"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const fileSystem = __importStar(require("fs"));
const bad_request_1 = __importDefault(require("../../exceptions/bad-request"));
const sendFileResponse = (res, file, download) => __awaiter(void 0, void 0, void 0, function* () {
    // Set headers for both download and non-download responses
    const headers = {
        'Content-Type': file.mimetype,
        'Content-Length': file.size.toString(), // Ensure Content-Length is a string
    };
    // If the file is to be downloaded, adjust the content disposition header
    if (download) {
        headers['Content-Disposition'] = `attachment; filename="${file.originalname}"`; // Correct header key and use quotes around filename
    }
    try {
        res.writeHead(200, headers); // Set headers for the response
        const readStream = fileSystem.createReadStream(file.path);
        readStream.on('error', (err) => {
            throw new bad_request_1.default(err.message || 'Error while reading the file');
        });
        // Pipe the read stream to the response object
        readStream.pipe(res);
    }
    catch (err) {
        throw new bad_request_1.default(err.message || 'Error while setting up the file response');
    }
});
exports.default = sendFileResponse;
