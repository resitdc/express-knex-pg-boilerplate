import { Knex } from "knex";
import bcrypt from "bcryptjs";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  is_verified: boolean;
  is_active: boolean;
}

const users: User[] = [
  {
    id: "A000000000000001",
    name: "Administrator",
    username: "admin",
    email: "admin@admin.com",
    password: "admin",
    is_verified: true,
    is_active: true,
  }
];

export const seed = async (knex: Knex): Promise<void> => {
  await knex("users").truncate();

  await Promise.all(
    users.map(async (user: User) => {
      const hashedPassword = await bcrypt.hash(user.password, 13);
      user.password = hashedPassword;
      return knex("users").insert(user);
    })
  );
}
