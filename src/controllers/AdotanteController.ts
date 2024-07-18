import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import {
  TipoReqBodyAdotante,
  TipoReqParamsAdotante,
  TipoResBodyAdotante
} from "../types/TipoAdotante";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}
  async criaAdotante(
    req: Request<{}, {}, TipoReqBodyAdotante>,
    res: Response<TipoResBodyAdotante>
  ) {
    const {
      nome,
      email,
      celular,
      endereco,
      foto,
      senha
    } = <AdotanteEntity>req.body;

    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      email,
      celular,
      foto,
      endereco
    );

    await this.repository.criaAdotante(novoAdotante);
    return res.status(201).json({
      data: {
        id: novoAdotante.id,
        email,
        celular,
        nome,
        endereco
      }
    });
  }
  async listaAdotante(
    req: Request,
    res: Response<TipoResBodyAdotante>
  ) {
    const resp = await this.repository.listaAdotante();
    const all = resp
      .map(({ id, nome, email, celular, endereco }) => ({
        id,
        nome,
        email,
        celular,
        endereco: endereco === null ? undefined : endereco
      }));
    return res.status(200).json({ data: all });
  };
  async atualizaAdotante(
    req: Request<TipoReqParamsAdotante, {}, TipoReqBodyAdotante>,
    res: Response<TipoResBodyAdotante>
  ) {
    const { id } = req.params;

    await this.repository
      .atualizaAdotante(Number(id), <AdotanteEntity>req.body);

    return res.sendStatus(204);
  }
  async deleteAdotante(
    req: Request<TipoReqParamsAdotante, {}, TipoReqBodyAdotante>,
    res: Response<TipoResBodyAdotante>
  ) {
    const { id } = req.params;
    await this.repository.deletaAdotante(Number(id));

    return res.sendStatus(204);
  }
  async atualizaEnderecoAdotante(
    req: Request<TipoReqParamsAdotante, {}, EnderecoEntity>,
    res: Response<TipoResBodyAdotante>
  ) {
    const { id } = req.params;
    
    await this.repository
      .atualizaEnderecoAdotante(Number(id), req.body);

    return res.sendStatus(204);
  }
}