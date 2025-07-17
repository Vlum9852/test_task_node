import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT } from '../config';

const connection = new Sequelize({
    dialect: DB_DIALECT as any,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: false,
    models: [User],
});

export default connection;