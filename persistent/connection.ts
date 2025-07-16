import { Sequelize } from "sequelize-typescript";

import { User } from "./models/user";

const connection = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "test_task_node",
    logging: false,
    models: [User],
});

export default connection;