import { NextFunction, Request, Response } from "express";
import { manipulaErrors } from "../utils/manipulaErrors";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export const errorMiddleware = (
  erro: manipulaErrors,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    erro.statusCode ?? EnumHttpStatusCode.INTERNAL_SERVER_ERROR;

  const msg = erro.statusCode ? erro.message : "Erro interno do servidor";

  res.status(statusCode).json({ message: msg });
  return next();
}