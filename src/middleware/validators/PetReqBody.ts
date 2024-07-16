import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import { TipoReqBodyPet } from "../../types/TipoPet";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";

yup.setLocale(pt);

const schemaBodyValidator: yup.ObjectSchema<
    Omit<TipoReqBodyPet, "adotante">
  > = yup.object({
    adotado: yup.boolean().defined().required(),
    dataNascimento: yup.date().defined().required(),
    especie: yup.string().oneOf(Object.values(EnumEspecie)).defined().required(),
    porte: yup.string().oneOf(Object.values(EnumPorte)).defined(),
    nome: yup.string().defined().required()
  });

const middlewareValidatorBodyPet = async (
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

export { middlewareValidatorBodyPet };
