import { Repository } from "typeorm";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NotFound } from "../utils/manipulaErrors";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  constructor(private repository: Repository<AdotanteEntity>) {}
  criaAdotante(adotante: AdotanteEntity): void | Promise<void> {
    this.repository.save(adotante);
  }
  async listaAdotante(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }
  async atualizaAdotante(
    id: number,
    newData: AdotanteEntity
  ) {
    const adotanteToUpdate = await this.repository.findOne({ where: { id } });
    if (!adotanteToUpdate) {
      throw new NotFound("Adotante não encontrado");
      ;
    }
    Object.assign(adotanteToUpdate, newData);

    await this.repository.save(adotanteToUpdate);
    return { success: true };
  }
  async deletaAdotante(
    id: number
  ) {
    const adotanteToDelete = await this.repository.findOne({ where: { id } });

    if (!adotanteToDelete) {
      throw new NotFound("Adotante não encontrado");
    }

    await this.repository.remove(adotanteToDelete);
    return { success: true };
  }
  async atualizaEnderecoAdotante(
    idAdotante: number,
    endereco: EnderecoEntity
  ) {
    const adotante = await this.repository.findOne({ where: { id: idAdotante } });
    
    if (!adotante) {
      throw new NotFound("Adotante não encontrado");
    }
    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    adotante.endereco = novoEndereco;
    await this.repository.save(adotante);
    return { success: true };
  }
}