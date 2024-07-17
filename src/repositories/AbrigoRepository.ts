import { Repository } from "typeorm";
import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import InterfaceAbrigoRepository from "./interfaces/interfaceAbrigoRepository";
import { NotFound } from "../utils/manipulaErrors";

export default class AbrigoRepository implements InterfaceAbrigoRepository {
  constructor(private repository: Repository<AbrigoEntity>) {}
  criaAbrigo(abrigo: AbrigoEntity): void | Promise<void> {
    this.repository.save(abrigo);
  }
  async listaAbrigo(): Promise<AbrigoEntity[]> {
    return await this.repository.find();
  }
  async atualizaAbrigo(id: number, abrigo: AbrigoEntity) {
    const abrigoToUpdate = await this.repository.findOne({ where: { id } });
    if (!abrigoToUpdate) {
      throw new NotFound("Abrigo não encontrado");
      ;
    }
    Object.assign(abrigoToUpdate, abrigo);

    await this.repository.save(abrigoToUpdate);
  }
  async deletaAbrigo(id: number) {
    const abrigoToDelete = await this.repository.findOne({ where: { id } });

    if (!abrigoToDelete) {
      throw new NotFound("Abrigo não encontrado");
    }

    await this.repository.remove(abrigoToDelete);
    return { success: true };
  }
  async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity) {
    const abrigo = await this.repository.findOne({ where: { id: idAbrigo } });
    
    if (!abrigo) {
      throw new NotFound("Abrigo não encontrado");
    }
    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    abrigo.endereco = novoEndereco;
    await this.repository.save(abrigo);
    return { success: true };
  }
  
}