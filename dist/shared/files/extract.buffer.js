"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractImageBuffer = (imageBase64) => {
    const imageData = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    return Buffer.from(imageData, 'base64');
};
exports.default = extractImageBuffer;
