import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

const trataErroValidacaoYup = async (
  schema: yup.Schema<unknown>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validateSync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorYup = error as yup.ValidationError;
    const errorValidation: Record<string, string> = {};

    errorYup.inner.forEach((err) => {
      if (err.path) {
        errorValidation[err.path] = err.message;
      }
    });
    return res.status(400).json({ error: errorValidation });
  }
};

export default trataErroValidacaoYup;
