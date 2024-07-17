import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import EnderecoEntity from "../../entities/EnderecoEntity";
import { pt } from "yup-locale-pt";
import trataErroValidacaoYup from "../../utils/trataValidacaoYup";

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
  await trataErroValidacaoYup(schemaBodyValidator, req, res, next);
}

export { middlewareValidatorBodyEndereco };
