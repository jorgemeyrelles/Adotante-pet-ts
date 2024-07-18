import AbrigoEntity from "../../entities/AbrigoEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";
import PetEntity from "../../entities/PetEntity";

export default interface InterfaceAbrigoRepository {
  criaAbrigo(abrigo: AbrigoEntity): void | Promise<void>;
  listaAbrigo(): AbrigoEntity[] | Promise<AbrigoEntity[]>;
  atualizaAbrigo(
    id: number,
    abrigo: AbrigoEntity
  ): void;
  deletaAbrigo(id: number): void;
  atualizaEnderecoAbrigo(
    idAbrigo: number,
    endereco: EnderecoEntity
  ): void;
  atualizaPetAbrigo(
    idAbrigo: number,
    pet: PetEntity
  ): void;
}
