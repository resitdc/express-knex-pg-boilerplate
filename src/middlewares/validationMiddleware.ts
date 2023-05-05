import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { errorResponse } from "../utils/response";

interface ValidationErrorItem {
  field: string;
  message: string;
}

const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const validationErrors: ValidationErrorItem[] = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return res.status(400).json(errorResponse(
        "Validation error",
        {
          errors: validationErrors,
          results: null
        }
      ));
    }

    next();
  };
};

export default validate;
