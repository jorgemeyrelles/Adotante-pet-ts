import { Request, Response } from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import AbrigoEntity from "../entities/AbrigoEntity";

export default class AbrigoController {
  constructor(private repository: AbrigoRepository) {};
  async criaAbrigo(
    req: Request,
    res: Response
  ) {
    const {
      nome,
      email,
      celular,
      senha,
      endereco
    } = <AbrigoEntity>req.body;

    const novoAbrigo = new AbrigoEntity(
      nome,
      email,
      celular,
      senha,
      endereco
    );

    await this.repository.criaAbrigo(novoAbrigo);

    return res.status(201).json({
      data: {
        id: novoAbrigo.id,
        email,
        celular,
        endereco,
        nome
      }
    });
  };

  async listaAbrigo(
    req: Request,
    res: Response
  ) {
    const abrigos = await this.repository.listaAbrigo();

    const listAbrigos = abrigos
      .map(({ id, nome, email, celular, endereco }) => ({
        id,
        nome,
        email,
        celular,
        endereco: endereco === null ? undefined : endereco
      }));

    return res.status(200).json({ data: listAbrigos });
  };

  async atualizaAbrigo(
    req: Request,
    res: Response
  ) {
    const { id } = req.params;

    await this.repository
      .atualizaAbrigo(Number(id), <AbrigoEntity>req.body);

    return res.sendStatus(204);
  };

  async deleteAbrigo(
    req: Request,
    res: Response
  ) {
    const { id } = req.params;

    await this.repository.deletaAbrigo(Number(id));

    return res.sendStatus(204);
  };

  async atualizaEnderecoAbrigo(
    req: Request,
    res: Response
  ) {
    const { id } = req.params;

    await this.repository
      .atualizaEnderecoAbrigo(Number(id), req.body);

    return res.sendStatus(204);
  };
}