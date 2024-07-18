import { Repository } from "typeorm";
import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import InterfaceAbrigoRepository from "./interfaces/interfaceAbrigoRepository";
import { NotFound } from "../utils/manipulaErrors";
import PetEntity from "../entities/PetEntity";

export default class AbrigoRepository implements InterfaceAbrigoRepository {
  constructor(
    private abrigoRepository: Repository<AbrigoEntity>,
    private petRepository: Repository<PetEntity>
  ) {
    this.petRepository = petRepository;
    this.abrigoRepository = abrigoRepository;
  };
  criaAbrigo(abrigo: AbrigoEntity): void | Promise<void> {
    this.abrigoRepository.save(abrigo);
  }
  async listaAbrigo(): Promise<AbrigoEntity[]> {
    return await this.abrigoRepository.find();
  }
  async atualizaAbrigo(id: number, abrigo: AbrigoEntity) {
    const abrigoToUpdate = await this.abrigoRepository.findOne({ where: { id } });
    if (!abrigoToUpdate) {
      throw new NotFound("Abrigo não encontrado");
      ;
    }
    Object.assign(abrigoToUpdate, abrigo);

    await this.abrigoRepository.save(abrigoToUpdate);
  }
  async deletaAbrigo(id: number) {
    const abrigoToDelete = await this.abrigoRepository.findOne({ where: { id } });

    if (!abrigoToDelete) {
      throw new NotFound("Abrigo não encontrado");
    }

    await this.abrigoRepository.remove(abrigoToDelete);
    return { success: true };
  }
  async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity) {
    const abrigo = await this.abrigoRepository.findOne({ where: { id: idAbrigo } });
    
    if (!abrigo) {
      throw new NotFound("Abrigo não encontrado");
    }
    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    abrigo.endereco = novoEndereco;
    await this.abrigoRepository.save(abrigo);
    return { success: true };
  }

  async atualizaPetAbrigo(idAbrigo: number, pet: PetEntity) {
    const abrigo = await this.abrigoRepository.findOne({ where: { id: idAbrigo } });
    
    if (!abrigo) {
      throw new NotFound("Abrigo não encontrado");
    }
    const petCheck = await this.petRepository.findOne({ where: { id: pet.id } });
    if (!petCheck) {
      throw new NotFound("Pet não encontrado");
    }

    petCheck.abrigo = abrigo;
    await this.petRepository.save(petCheck);
    return { success: true };
  };
  
}