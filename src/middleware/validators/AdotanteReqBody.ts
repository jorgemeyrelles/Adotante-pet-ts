import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { TipoReqBodyAdotante } from "../../types/TipoAdotante";
import { pt } from "yup-locale-pt";
import trataErroValidacaoYup from "../../utils/trataValidacaoYup";

yup.setLocale(pt);

const phoneRegExp = /^[1-9]{2}9[7-9]{1}[0-9]{3}[0-9]{4}$/;
const passRegExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;
const txt = "Regra: um número, uma letra maiúscula, minúscula, não alfanumérico e entre 8 a 16 caracteres."

const schemaBodyValidator: yup.ObjectSchema<
    Omit<TipoReqBodyAdotante, "endereco">
  > = yup.object({
    nome: yup.string().defined().required(),
    email: yup.string().defined().required(),
    celular: yup
      .string()
      .defined()
      .required()
      .min(10)
      .max(11)
      .matches(phoneRegExp, 'Celular não corresponder ao padrão'),
    senha: yup
      .string()
      .defined()
      .required()
      .min(6)
      .matches(passRegExp, txt),
    foto: yup.string().optional()
  });

const middlewareValidatorBodyAdotante = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await trataErroValidacaoYup(schemaBodyValidator, req, res, next);
}

export { middlewareValidatorBodyAdotante };
