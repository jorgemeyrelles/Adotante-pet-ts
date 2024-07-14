import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
import { TipoReqBodyPet, TipoReqGenericPet, TipoReqParamsPet, TipoResPet } from "../types/TipoPet";

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
  constructor(private repository: PetRepository) {
  }
  async criaPet(
    req: Request<TipoReqParamsPet, {}, TipoReqBodyPet>,
    res: Response<TipoResPet>
  ) {
    const { adotado, especie, porte, dataNascimento, nome } = <PetEntity>req.body;
    
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(404).json({ error: "Espécie inválida" });
    }
    if (porte && !(porte in EnumPorte)) {
      return res.status(404).json({ error: "Porte inválido" });
    }
    const novoPet = new PetEntity(nome, especie, dataNascimento, adotado, porte);

    await this.repository.criaPet(novoPet);
    return res.status(201).json({ data: novoPet });
  }

  async listaPets(
    req: Request<TipoReqParamsPet, {}, TipoReqBodyPet>,
    res: Response<TipoResPet>
  ) {
    const all = await this.repository.listaPet();
    const data = all
      .map(({ id, nome, especie, porte }) => ({ id, nome, especie, porte }));
    return res.status(200).json({ data });
  }

  async atualizaPet(
    req: Request<TipoReqParamsPet, {}, TipoReqBodyPet>,
    res: Response<TipoResPet>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository
      .atualizaPet(Number(id), <PetEntity>req.body);
    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.sendStatus(200);
  }

  async deletePet(
    req: Request<TipoReqParamsPet, {}, TipoReqBodyPet>,
    res: Response<TipoResPet>
  ) {
    const { id } = req.params;
    const { success, message } = await this.repository
      .deletePet(Number(id), <PetEntity>req.body);
    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.sendStatus(200);
  }

  async adotaPet(
    req: Request<TipoReqParamsPet, {}, TipoReqBodyPet>,
    res: Response<TipoResPet>
  ) {
    const { pet_id, adotante_id } = req.params;
    const { success, message } = await this.repository
      .adotaPet(Number(pet_id), Number(adotante_id));
    if (!success) {
      return res.status(401).json({ error: message });
    }
    return res.sendStatus(204);
  }

  async buscaPetPeloPorte(
    req: Request<TipoReqParamsPet, {}, TipoReqBodyPet>,
    res: Response<TipoResPet>
  ) {
    const { porte } = req.body;
    const listaPets = await this.repository.buscaPetPeloPorte(<EnumPorte>porte);
    return res.status(201).json({ data: listaPets });
  }

  async buscaPetPorCampoGenerico(
    req: Request<TipoReqParamsPet, {}, TipoReqGenericPet>,
    res: Response<TipoResPet>
  ) {
    const { campo, valor } = req.body;
    const pets = await this.repository
      .buscaPetPorCampoGenerico(campo as keyof PetEntity, valor as string);
    return res.status(201).json({ data: pets });
  }
}