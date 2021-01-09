import config from "./config";
import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: config.dbHost,
  port: +config.dbPort,
  username: config.dbName,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: false,
  entities: ["./models/**/*.ts"],
}

export { connectionOptions };