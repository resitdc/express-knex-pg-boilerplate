import { Knex } from "knex";
const table:string = "users";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable(table, (t) => {
    t.string("id", 100).primary().notNullable();
    t.string("name", 200);
    t.string("username", 100).nullable().unique();
    t.string("phone", 20).nullable().unique();
    t.text("email").nullable().unique();
    t.text("password").notNullable();
    t.enu("gender", ["MALE", "FEMALE"]);
    t.text("avatar");
    t.enu("role", ["SUPERUSER", "ADMIN", "USER"]).defaultTo("USER");
    t.boolean("is_active").defaultTo(false);
    t.boolean("is_verified").defaultTo(false);
    t.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true }).nullable();
    t.datetime("deleted_at").nullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable(table);
};
