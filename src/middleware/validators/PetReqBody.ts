import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import { TipoReqBodyPet } from "../../types/TipoPet";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";
import trataErroValidacaoYup from "../../utils/trataValidacaoYup";

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
  await trataErroValidacaoYup(schemaBodyValidator, req, res, next);
}

export { middlewareValidatorBodyPet };
