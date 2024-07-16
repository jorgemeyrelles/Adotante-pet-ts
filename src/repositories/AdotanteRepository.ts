import { Repository } from "typeorm";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";

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
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } });
      if (!adotanteToUpdate) {
        return { success: false, message: "Adotante não encontrado"};
      }
      Object.assign(adotanteToUpdate, newData);

      await this.repository.save(adotanteToUpdate);
      return { success: true };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar adotante"
      };
    }
  }
  async deletaAdotante(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToDelete = await this.repository.findOne({ where: { id } });

      if (!adotanteToDelete) {
        return { success: false, message: "Adotante não encontrado"};
      }

      await this.repository.remove(adotanteToDelete);
      return { success: true };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar deletar adotante"
      }
    }
  }
  async atualizaEnderecoAdotante(
    idAdotante: number,
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string; }> {
    try {
      const adotante = await this.repository.findOne({ where: { id: idAdotante } });
      
      if (!adotante) {
        return { success: false, message: "Adotante não encontrado" };
      }
      const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
      adotante.endereco = novoEndereco;
      await this.repository.save(adotante);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar atualizar endereço de adotante"}
    }
  }
}