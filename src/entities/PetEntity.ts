import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import AdotanteEntity from "./AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";
import AbrigoEntity from "./AbrigoEntity";

@Entity()
export default class PetEntity {
  constructor(
    nome: string,
    especie: EnumEspecie,
    dataNascimento: Date,
    adotado: boolean,
    porte?: EnumPorte,
    adotante?: AdotanteEntity,
  ) {
    this.adotado = adotado;
    this.dataNascimento = dataNascimento;
    this.especie = especie;
    this.porte = porte;
    this.nome = nome;
    this.adotante = adotante;
  }
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  especie: EnumEspecie;
  @Column()
  porte?: EnumPorte;
  @Column()
  dataNascimento: Date;
  @ManyToOne(() => AbrigoEntity, (abrigo) => abrigo.pets)
  abrigo!: AbrigoEntity;
  @Column()
  adotado: boolean;
  @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
  adotante?: AdotanteEntity;
}