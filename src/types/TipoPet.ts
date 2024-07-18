import EnumEspecie from "../enum/EnumEspecie";
import PetEntity from '../entities/PetEntity';

type TipoReqBodyPet = Omit<PetEntity, "id">;

type TipoReqGenericPet = { campo?: string, valor?: string };

type TipoReqParamsPet = {
  id?: string;
  pet_id?: string;
  adotante_id?: string;
};

type TipoResPet = {
  data?:
    Pick<PetEntity, "id" | "nome" | "porte" | "especie" | "abrigo">
    | Pick<PetEntity, "id" | "nome" | "porte" | "especie" | "abrigo">[];
}

export {
  TipoReqBodyPet,
  TipoReqParamsPet,
  TipoResPet,
  TipoReqGenericPet
};
