import { Dialect } from "sequelize";
import dotenv from 'dotenv';
import { DatabaseEnum } from "../shared/enums/database.enum";
dotenv.config();

class DatabaseConfig {
    private static commonConfig = {
        host: process.env.DB_HOST || 'dpg-d7o8gr9f9bms738v575g-a.oregon-postgres.render.com',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'auto',
        password: process.env.DB_PASSWORD || 'QPs1cJpxxKDvSmOssKfcKL1E7eKXtwEA',
        database: process.env.DB_DATABASE || 'pos_v2_uyb0',
        models: [__dirname + '/../models/**/*.model.{ts,js}'],
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    };

    public static getSequelizeConfig() {
        const dialect = (process.env.DB_CONNECTION as Dialect) || 'postgres';
        switch (dialect) {
            case DatabaseEnum.MYSQL:
            case DatabaseEnum.POSTGRES:
                return {
                    ...DatabaseConfig.commonConfig,
                    dialect
                };
            default:
                throw new Error('Invalid or unsupported database dialect');
        }
    }
}

export default DatabaseConfig;
