import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import dotenv from "dotenv";

dotenv.config();

interface UserPayload {
  id: string;
  role: string;
  username: string;
  email: string;
  name: string;
  isVerified: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(400).json(errorResponse("LOGIN NEEDED!"));
    }

    const payload = jwt.verify(token, process.env.JWTSECRET!) as UserPayload;
    req.currentUser = payload;

    next();
  } catch (err) {
    return res.status(401).json(errorResponse("Authentication failed"));
  }
};

export default requireAuth;
