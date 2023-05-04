import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authSecret from "../../config/auth";
import { authResponse } from "../../utils/response";
import Users from "../../models/Users";

export const login = async (req: Request, res: Response) => {
  const { user, password } = req.body;

  try {
    const dataUser = await Users.query()
      .select()
      .where((q) =>
        q.where("users.username", user)
          .orWhere("users.email", user)
          .orWhere("users.phone", user)
      )
      .first();

    if (dataUser) {
      const comparePassword = bcrypt.compareSync(password, dataUser.password);

      if (!comparePassword) {
        return res.status(401).json(authResponse(false, "Invalid Password!"));
      }

      if (!dataUser.is_active) {
        return res.status(401).json(authResponse(false, "Sorry User Deactivate!"));
      }

      const token = jwt.sign({
        id: dataUser.id,
        role: dataUser.role,
        username: dataUser.username,
        email: dataUser.email,
        name: dataUser.name,
        isVerified: dataUser.is_verified,
      }, authSecret, {
        expiresIn: 1 * 12 * 60 * 60
      });

      const userData = {
        id: dataUser.id,
        name: dataUser.name,
        username: dataUser.username,
        email: dataUser.email,
        phone: dataUser.phone,
        role: dataUser.role,
        avatar: dataUser.avatar
      };

      res.status(200).json(authResponse(true, "Success!", token, userData));
    } else {
      res.status(404).json(authResponse(false, "User Not Found!"));
    }
  } catch (error) {
    res.status(500).json(authResponse(false, `ERROR! ===> ${error}`));
  }
};

export const register = async (req: Request, res: Response) => {
  res.send("Register Page");
};