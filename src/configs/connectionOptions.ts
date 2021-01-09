import config from "./config";
import { ConnectionOptions } from "typeorm";
import path from "path";

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: config.dbHost,
  port: +config.dbPort,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, "../models/**/*.ts")],
}

export { connectionOptions };