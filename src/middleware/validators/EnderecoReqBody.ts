import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import EnderecoEntity from "../../entities/EnderecoEntity";
import { pt } from "yup-locale-pt";

yup.setLocale(pt);

const schemaBodyValidator: yup.ObjectSchema<
    Omit<EnderecoEntity, "id">
  > = yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required(),
  });

const middlewareValidatorBodyEndereco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schemaBodyValidator.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    const yupMsg = error as yup.ValidationError;

    const validationErrors: Record<string, string> = {};
    yupMsg.inner.forEach((err) => {
      
      if (!err.path) return;
      validationErrors[err.path] = err.message;
    });

    return res.status(200).json({ error: validationErrors });
  }
}

export { middlewareValidatorBodyEndereco };
