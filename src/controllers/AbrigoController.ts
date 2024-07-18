import { Request, Response } from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import AbrigoEntity from "../entities/AbrigoEntity";
import { TipoReqBodyAbrigo, TipoReqParamsAbrigo, TipoResBodyAbrigo } from "../types/TipoAbrigo";
import EnderecoEntity from "../entities/EnderecoEntity";
import PetEntity from "../entities/PetEntity";

export default class AbrigoController {
  constructor(private repository: AbrigoRepository) {};
  async criaAbrigo(
    req: Request<{}, {}, TipoReqBodyAbrigo>,
    res: Response<TipoResBodyAbrigo>
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
    res: Response<TipoResBodyAbrigo>
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
    req: Request<TipoReqParamsAbrigo, {}, TipoReqBodyAbrigo>,
    res: Response<TipoResBodyAbrigo>
  ) {
    const { id } = req.params;

    await this.repository
      .atualizaAbrigo(Number(id), <AbrigoEntity>req.body);

    return res.sendStatus(204);
  };

  async deleteAbrigo(
    req: Request<TipoReqParamsAbrigo, {}, {}>,
    res: Response<TipoResBodyAbrigo>
  ) {
    const { id } = req.params;

    await this.repository.deletaAbrigo(Number(id));

    return res.sendStatus(204);
  };

  async atualizaEnderecoAbrigo(
    req: Request<TipoReqParamsAbrigo, {}, EnderecoEntity>,
    res: Response<TipoResBodyAbrigo>
  ) {
    const { id } = req.params;

    await this.repository
      .atualizaEnderecoAbrigo(Number(id), req.body);

    return res.sendStatus(204);
  };

  async atualizaPetAbrigo(
    req: Request<TipoReqParamsAbrigo, {}, PetEntity>,
    res: Response<TipoResBodyAbrigo>
  ) {
    const { id } = req.params;

    await this.repository
      .atualizaPetAbrigo(Number(id), req.body);

    return res.sendStatus(204);
  };
}