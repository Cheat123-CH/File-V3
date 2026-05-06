import { SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config();

class DatabaseConfig {
    static getSequelizeConfig(): SequelizeOptions {

        const databaseUrl = process.env.DATABASE_URL;

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
            // ✅ Fix model path — works in both dev and prod
            models : [path.join(__dirname, '..', '**', '*.model.js')],
            logging: false,
        };
    }
}

export default DatabaseConfig;