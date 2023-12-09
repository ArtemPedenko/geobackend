import "dotenv/config";
import { DataSource } from "typeorm";

const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ["src/entity/*.ts"],
  logging: false,
  synchronize: true,
});

export default myDataSource;
