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
const deleteFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs_extra_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting ${filePath}: ${err.message}`);
                reject(err);
            }
            else {
                console.log(`Deleted ${filePath} successfully.`);
                resolve();
            }
        });
    });
});
exports.default = deleteFile;
