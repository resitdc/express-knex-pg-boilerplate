import { Knex } from "knex";

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
    directory: __dirname + "/database/migrations"
  }
};

export default knexConfig;
