import EnumEspecie from "../enum/EnumEspecie";
import PetEntity from '../entities/PetEntity';

type TipoReqBodyPet = Omit<PetEntity, "id">;

type TipoReqGenericPet = { campo?: string, valor?: string };

type TipoReqParamsPet = {
  id?: string,
  pet_id?: string,
  adotante_id?: string
};

type TipoResPet = {
  data?:
    Pick<PetEntity, "id" | "nome" | "porte" | "especie">
    | Pick<PetEntity, "id" | "nome" | "porte" | "especie">[],
  error?: string
}

export {
  TipoReqBodyPet,
  TipoReqParamsPet,
  TipoResPet,
  TipoReqGenericPet
};
