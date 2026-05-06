import * as dotenv from 'dotenv';
dotenv.config(); // ✅ MUST be first line before any other import

import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import DatabaseConfig from './configs/db.config';
import NotFoundException from './exceptions/not-found';
import routers from './routers';
import ErrorsFilter from './shared/exceptions';

const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
    res.render('index');
});

app.use('/api', routers);

app.use((req, _res, next) => {
    next(new NotFoundException(`Cannot ${req.method} ${req.originalUrl}`));
});

app.use(ErrorsFilter.error());

const bootstrap = async () => {
    try {
        const sequelize = new Sequelize(DatabaseConfig.getSequelizeConfig());
        await sequelize.authenticate();
        console.log('✅ Database connected successfully'); // ✅ add this to confirm
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`\x1b[32mApplication running on host: \x1b[34mhttp://localhost:${PORT}\x1b[37m`);
        });
    } catch (error) {
        console.error('\x1b[33mUnable to connect to the database: \x1b[31m' + (error as Error).message + '\x1b[0m');
        process.exit(1);
    }
}
bootstrap();