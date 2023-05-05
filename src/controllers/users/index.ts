import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Users from "../../models/Users.model";
import { paginationResponse, successResponse, errorResponse } from "../../utils/response";
import { generateId } from "../../utils/helpers";

export const listData = async (req: Request, res: Response) => {
  const limit: number = Number(req.query.limit) || 10;
  const page: number = Number(req.query.page) || 1;
  const searchKeywords: string | null = req.query?.s ? String(req.query.s)?.toLowerCase() : null;

  try {
    const { total, results } = await Users.querySoftDelete()
      .select(
        "users.id",
        "users.name",
        "users.username",
        "users.email",
        "users.avatar",
        "users.role",
        "users.is_active as isActive",
        "users.is_verified as isVerified",
      )
      .page(page - 1, limit)
      .modify((queryBuilder) => {
        if (searchKeywords !== null && searchKeywords !== "") {
          queryBuilder.whereRaw("LOWER(users.name) LIKE ?", [`%${searchKeywords}%`]);
          queryBuilder.orWhereRaw("LOWER(users.username) LIKE ?", [`%${searchKeywords}%`]);
          queryBuilder.orWhereRaw("LOWER(users.email) LIKE ?", [`%${searchKeywords}%`]);
          queryBuilder.orWhereRaw("LOWER(users.phone) LIKE ?", [`%${searchKeywords}%`]);
        }
      });

    let totalData = total;
    res.status(200).json(
      successResponse("SUCCESS", {
        results: {
          pagination: paginationResponse(page, limit, totalData),
          data: results
        }
      })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(
        errorResponse(error?.message, { results: null })
      );
    } else {
      res.status(500).json(
        errorResponse("Internal server error", { results: null })
      );
    }
  }
};

export const detailData = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await Users.querySoftDelete()
      .select(
        "users.id",
        "users.name",
        "users.username",
        "users.phone",
        "users.email",
        "users.gender",
        "users.avatar",
        "users.role",
        "users.is_active as isActive",
        "users.is_verified as isVerified",
        "users.created_at as createdAt",
        "users.updated_at as updatedAt",
      )
      .findById(userId);

    if (user) {
      res.status(200).json(
        successResponse("SUCCESS", { results: user })
      );
    } else {
      res.status(404).json(
        errorResponse("DATA NOT FOUND", { results: null })
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(
        errorResponse(error?.message, { results: null })
      );
    } else {
      res.status(500).json(
        errorResponse("Internal server error", { results: null })
      );
    }
  }
};

export const createData = async (req: Request, res: Response) => {
  const {
    name,
    password: formPassword,
    username,
    phone,
    email,
    gender,
    avatar,
    role,
  } = req.body;
  
  try {
    const id: string = generateId(name);
    const hashedPassword: string = await bcrypt.hash(formPassword, 13);
    
    interface FormData {
      id: string;
      name: string;
      password: string;
      email: string;
      is_verified: boolean;
      is_active: boolean;
      username?: string;
      phone?: string;
      gender?: "MALE" | "FEMALE" | undefined;
      avatar?: string;
      role?: "SUPERUSER" | "ADMIN" | "USER" | undefined;
    }
    
    const formData: FormData = {
      id,
      name,
      email,
      password: hashedPassword,
      is_verified: false,
      is_active: true,
    };

    if (username) formData["username"] = username;
    if (phone) formData["phone"] = phone;
    if (gender) formData["gender"] = gender;
    if (avatar) formData["avatar"] = avatar;
    if (role) formData["role"] = role || "USER";

    const isUserExist = await Users.querySoftDelete().findOne({"users.email": email});
    
    if (isUserExist) {
      res.status(409).json(
        errorResponse("Email already exists", { results: null })
      );
    } else {
      const user = await Users.query().insert(formData);
      const { password, is_verified, is_active, ...rest } = user;
      const updatedUser = { ...rest, isVerified: is_verified, isActive: is_active };
      
      res.status(201).json(
        successResponse("Success", {
          errors: null,
          results: updatedUser
        })
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(
        errorResponse(error?.message, {
          errors: null,
          results: null
        })
      );
    } else {
      res.status(500).json(
        errorResponse("Internal server error", {
          errors: null,
          results: null
        })
      );
    }
  }
};

export const updateData = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.querySoftDelete().findById(userId).patch({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteData = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    await Users.softDelete(userId);

    res.status(200).json(
      successResponse("Deleted", { results: null })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(
        errorResponse(error?.message, { results: null })
      );
    } else {
      res.status(500).json(
        errorResponse("Internal server error", { results: null })
      );
    }
  }
};
