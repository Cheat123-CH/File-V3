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
const sequelize_typescript_1 = require("sequelize-typescript");
const db_config_1 = __importDefault(require("../configs/db.config"));
require("colors");
const migrate = () => __awaiter(void 0, void 0, void 0, function* () {
    const sequelize = new sequelize_typescript_1.Sequelize(db_config_1.default.getSequelizeConfig());
    try {
        yield sequelize.authenticate();
        yield sequelize.sync({ force: true });
        console.log('Migrations have been recreate successfully !.'.green);
        process.exit(0);
    }
    catch (error) {
        console.log((error.message).red);
        process.exit(0);
    }
});
migrate();
