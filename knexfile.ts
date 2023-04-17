import { Knex } from "knex";
import path from "path";

const knexConfig: Knex.Config = {
  client: "postgresql",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "restuganteng",
    database: "sample"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations",
    directory: path.join(__dirname, "src/database/migrations")
  }
};

export default knexConfig;
