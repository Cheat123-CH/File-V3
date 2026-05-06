import { SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
dotenv.config();

class DatabaseConfig {
    static getSequelizeConfig(): SequelizeOptions {

        const dbUrl = new URL(process.env.DATABASE_URL!);

        return {
            dialect: 'postgres',
            host    : dbUrl.hostname,
            port    : Number(dbUrl.port) || 5432,
            database: dbUrl.pathname.replace('/', ''),  // removes leading "/"
            username: dbUrl.username,
            password: dbUrl.password,
            dialectOptions: {
                ssl: {
                    require           : true,
                    rejectUnauthorized: false  // ✅ Required for Render PostgreSQL
                }
            },
            models : [__dirname + '/../**/*.model.js'],  // ✅ .js not .ts in prod
            logging: false,
        };
    }
}

export default DatabaseConfig;