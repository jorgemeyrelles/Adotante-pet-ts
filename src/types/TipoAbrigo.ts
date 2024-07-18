import AbrigoEntity from '../entities/AbrigoEntity';

type TipoReqBodyAbrigo = Omit<AbrigoEntity, "id" | "pets">;

type TipoReqParamsAbrigo = { id?: string };

type TipoResBodyAbrigo = {
  data?:
    Pick<AbrigoEntity, "id" | "nome" | "celular" | "email" | "endereco">
    | Pick<AbrigoEntity, "id" | "nome" | "celular" | "email" | "endereco">[]
};

export {
  TipoReqBodyAbrigo,
  TipoResBodyAbrigo,
  TipoReqParamsAbrigo
};