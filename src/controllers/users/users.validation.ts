import Joi from "joi";
import validate from "../../middlewares/validationMiddleware";

export const usersSchema = validate(Joi.object({
  name: Joi.string().min(3).max(200),
  username: Joi.string().min(3).max(100),
  phone: Joi.string().min(7).max(20),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  gender: Joi.string().allow("MALE", "FEMALE"),
  avatar: Joi.string(),
  role: Joi.string().allow("SUPERUSER", "ADMIN", "USER"),
  is_active: Joi.boolean(),
  is_verified: Joi.boolean(),
}));