import { SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
dotenv.config();

class DatabaseConfig {
    static getSequelizeConfig(): SequelizeOptions {

        const databaseUrl = process.env.DATABASE_URL;

        // ✅ Guard — catch undefined before parsing
        if (!databaseUrl) {
            throw new Error('DATABASE_URL environment variable is not set');
        }

        const dbUrl = new URL(databaseUrl);

        return {
            dialect : 'postgres',
            host    : dbUrl.hostname,
            port    : Number(dbUrl.port) || 5432,
            database: dbUrl.pathname.replace('/', ''),
            username: dbUrl.username,
            password: dbUrl.password,
            dialectOptions: {
                ssl: {
                    require           : true,
                    rejectUnauthorized: false
                }
            },
            models : [__dirname + '/../**/*.model.js'],
            logging: false,
        };
    }
}

export default DatabaseConfig;