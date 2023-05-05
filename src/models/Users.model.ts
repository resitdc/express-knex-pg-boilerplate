import { Model } from "objection";
import knex from "../config/connection";

Model.knex(knex);

class Users extends Model {
  id!: string;
  name?: string;
  username?: string | null;
  phone?: string | null;
  email?: string | null;
  password!: string;
  gender?: "MALE" | "FEMALE" | null;
  avatar?: string;
  role?: "SUPERUSER" | "ADMIN" | "USER";
  is_active?: boolean;
  is_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: string | null;

  static get tableName() {
    return "users";
  }
  
  static querySoftDelete(...args: any) {
    return super.query(...args).whereNull("users.deleted_at");
  }

  static async softDelete(id: string): Promise<void> {
    await Users.query()
      .findById(id)
      .patch({
        username: Users.raw("NULL"),
        phone: Users.raw("NULL"),
        email: Users.raw("NULL"),
        deleted_at: new Date().toISOString()
      });
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "password"],

      properties: {
        id: { type: "string", maxLength: 100 },
        name: { type: "string", maxLength: 200 },
        username: { type: "string", maxLength: 100 },
        phone: { type: "string", maxLength: 20 },
        email: { type: "string" },
        password: { type: "string" },
        gender: { type: "string", enum: ["MALE", "FEMALE"] },
        avatar: { type: "string" },
        role: { type: "string", enum: ["SUPERUSER", "ADMIN", "USER"] },
        is_active: { type: "boolean", default: false },
        is_verified: { type: "boolean", default: false },
        created_at: { type: "string" },
        updated_at: { type: ["string", "null"] },
        deleted_at: { type: ["string", "null"] },
      },
    };
  }
}

export default Users;
