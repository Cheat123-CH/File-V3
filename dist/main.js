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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const sequelize_typescript_1 = require("sequelize-typescript");
const db_config_1 = __importDefault(require("./configs/db.config"));
const not_found_1 = __importDefault(require("./exceptions/not-found"));
const routers_1 = __importDefault(require("./routers"));
const exceptions_1 = __importDefault(require("./shared/exceptions"));
const app = (0, express_1.default)();
// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'view'));
// Init application
app.use(body_parser_1.default.json({ limit: '500mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '500mb', extended: true }));
app.use('/static', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
/**==================================================================
 * @noted Register a route to render the HTML file
 */
app.get('/', (_req, res) => {
    res.render('index');
});
/**==================================================================
 * @noted Use all routes with prefix service
 */
app.use('/api', routers_1.default);
/**==================================================================
 * @noted Custom Not Found handler for route request
 * Only Works for Unmatched Routes
 */
app.use((req, _res, next) => {
    next(new not_found_1.default(`Cannot ${req.method} ${req.originalUrl}`));
});
/**==================================================================
 * @noted Register global error handling filter
 */
app.use(exceptions_1.default.error());
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to the Dadabase
        const sequelize = new sequelize_typescript_1.Sequelize(db_config_1.default.getSequelizeConfig());
        yield sequelize.authenticate();
        // Port app running
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`\x1b[32mApplication running on host: \x1b[34mhttp://localhost:${PORT}\x1b[37m`);
        });
    }
    catch (error) {
        // Use a type assertion to tell TypeScript `error` is of type `Error`
        console.error('\x1b[33mUnable to connect to the database: \x1b[31m' + error.message + '\x1b[0m');
        process.exit(1); // It's common to use `1` or another non-zero value to indicate an error exit
    }
});
bootstrap();
