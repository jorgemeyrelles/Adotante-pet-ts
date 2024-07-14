import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import PetEntity from "./PetEntity";
import EnderecoEntity from "./EnderecoEntity";

@Entity()
export default class AdotanteEntity {
  constructor(
    nome: string,
    senha: number,
    celular: string,
    foto?: string,
    endereco?: EnderecoEntity
  ) {
    this.nome = nome;
    this.celular = celular;
    this.senha = senha;
    this.foto = foto;
    this.endereco = endereco;
  }
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  senha: number;
  @Column()
  celular: string;
  @Column({ nullable: true })
  foto?: string;
  @OneToOne(() => EnderecoEntity, {
    nullable: true,
    cascade: true,
    eager: true
  })
  @JoinColumn()
  endereco?: EnderecoEntity;
  @OneToMany(() => PetEntity, (pet) => pet.adotante)
  pets!: PetEntity[];
}
