import { Model } from "objection";
import knex from "../config/connection";

Model.knex(knex);

class Users extends Model {
  static tableName = "users";

  id!: string;
  name?: string;
  username?: string;
  phone?: string;
  email?: string;
  password!: string;
  gender?: "MALE" | "FEMALE" | null;
  avatar?: string;
  role?: "SUPERUSER" | "ADMIN" | "USER";
  is_active?: boolean;
  is_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;

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
