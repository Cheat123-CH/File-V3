"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filePayload = (fileName, filePath, buffer) => {
    return {
        fieldname: 'image',
        filename: fileName,
        originalname: `${fileName}.jpg`,
        mimetype: 'image/jpeg',
        destination: filePath,
        path: filePath,
        size: buffer.length,
        encoding: 'from-base64'
    };
};
exports.default = filePayload;
