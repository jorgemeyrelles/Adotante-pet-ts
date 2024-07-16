import AdotanteEntity from '../entities/AdotanteEntity';

type TipoReqBodyAdotante = Omit<AdotanteEntity, "id" | "pets">;

type TipoReqParamsAdotante = { id?: string };

type TipoResBodyAdotante = {
  data?:
    Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">
    | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[];
  error?: unknown;
};

export {
  TipoReqBodyAdotante,
  TipoResBodyAdotante,
  TipoReqParamsAdotante
};
