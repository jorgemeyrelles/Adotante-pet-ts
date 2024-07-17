import { NextFunction, Request, Response } from "express";
import { ReqRuim } from "../../utils/manipulaErrors";

export const verificaIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = { ...req.params };

  for (const param in params) {
    if (!Number.isInteger(Number(params[param]))) {
      throw new ReqRuim(`Parametro ${param} deve ser um número inteiro.`);
    }
  }
  return next();
}