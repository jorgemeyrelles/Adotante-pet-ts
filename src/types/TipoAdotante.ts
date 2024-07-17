import AdotanteEntity from '../entities/AdotanteEntity';

type TipoReqBodyAdotante = Omit<AdotanteEntity, "id" | "pets">;

type TipoReqParamsAdotante = { id?: string };

type TipoResBodyAdotante = {
  data?:
    Pick<AdotanteEntity, "id" | "nome" | "celular" | "email" | "endereco">
    | Pick<AdotanteEntity, "id" | "nome" | "celular" | "email" | "endereco">[];
};

export {
  TipoReqBodyAdotante,
  TipoResBodyAdotante,
  TipoReqParamsAdotante
};
