import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void;
  listaPet(): Array<PetEntity> | Promise<PetEntity[]>;
  atualizaPet(id: number, pet: PetEntity): void;
  deletePet(id: number, pet: PetEntity): void;
  adotaPet(
    pet_id: number,
    adotante_id: number
  ): void;
  buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> | void;
  // busca generica
  buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo]
  ): Promise<PetEntity[]> | PetEntity[];
}