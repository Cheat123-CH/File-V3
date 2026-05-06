"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routing_1 = __importDefault(require("../controllers/routing"));
const routers = express_1.default.Router();
// File Route
routers.use('/file', routing_1.default);
exports.default = routers;
