import AdotanteEntity from '../entities/AdotanteEntity';

type TipoReqBodyAdotante = Omit<AdotanteEntity, "id">;

type TipoReqParamsAdotante = { id: string };

type TipoResBodyAdotante = {
  data?:
    Pick<AdotanteEntity, "id" | "nome" | "celular">
    | Pick<AdotanteEntity, "id" | "nome" | "celular">[];
  error?: unknown;
};

export {
  TipoReqBodyAdotante,
  TipoResBodyAdotante,
  TipoReqParamsAdotante
};
