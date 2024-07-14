import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";

export default class PetRepository implements InterfacePetRepository {
  private petRepository: Repository<PetEntity>;
  private adotanteRepository: Repository<AdotanteEntity>;

  constructor(
    petRepository: Repository<PetEntity>,
    adotanteRepository: Repository<AdotanteEntity>
  ) {
    this.petRepository = petRepository;
    this.adotanteRepository = adotanteRepository;
  }
  async criaPet(pet: PetEntity): Promise<void> {
    await this.petRepository.save(pet);
  }
  async listaPet(): Promise<PetEntity[]> {
    const all = await this.petRepository.find();
    return all;
  }
  async atualizaPet(id: number, newData: PetEntity): Promise<{ success: boolean; message?: string}> {
    try {
      const petToUpdate = await this.petRepository.findOne({ where: { id } });

      if (!petToUpdate) {
        return { success: false, message: "Pet não encontrado" };
      }

      Object.assign(petToUpdate, newData);

      await this.petRepository.save(petToUpdate);

      return { success: true };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o pet."
      };
    }
  }
  async deletePet(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> {
    try {
      const petToRemove = await this.petRepository.findOne({ where: { id } });

      if (!petToRemove) {
        return { success: false, message: "Pet não encontrado" };
      }

      await this.petRepository.remove(petToRemove);
      return { success: true };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar deletar o pet."
      };
    }
  }
  async adotaPet(
    pet_id: number,
    adotante_id: number
  ): Promise<{ success: boolean; message?: string; }> {
      try {
        const pet = await this.petRepository.findOne({ where: { id: pet_id } });
        if (!pet) {
          return { success: false, message: "Pet não encontrado"};
        }
        const adotante = await this.adotanteRepository.findOne({ where: { id: adotante_id } });
        if (!adotante) {
          return { success: false, message: "Adotante não encontrado"};
        }
        
        pet.adotante = adotante;
        pet.adotado = true;
        
        await this.petRepository.save(pet);
        return { success: true };
      } catch (error) {
        console.error(error);
        return {
          success: false,
          message: "Ocorreu um erro ao tentar adotar um pet"
        };
      }
  }
  async buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> {
    const pets = await this.petRepository.find({ where: { porte } });
    return pets;
  }

  async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo]
  ): Promise<PetEntity[]> {
    const pets = await this.petRepository.find({ where: { [campo]: valor } });
    return pets;
  }
}