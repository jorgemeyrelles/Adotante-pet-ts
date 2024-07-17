import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import PetEntity from "./PetEntity";
import EnderecoEntity from "./EnderecoEntity";
import { criptografarSenha } from "../utils/criptoSenha";

@Entity()
export default class AdotanteEntity {
  constructor(
    nome: string,
    senha: string,
    email: string,
    celular: string,
    foto?: string,
    endereco?: EnderecoEntity
  ) {
    this.nome = nome;
    this.celular = celular;
    this.email = email;
    this.senha = senha;
    this.foto = foto;
    this.endereco = endereco;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async criptoSenha() {
    if (this.senha) {
      this.senha = criptografarSenha(this.senha);
    }
  };

  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  senha: string;
  @Column({
    unique: true,
    nullable: false
  })
  email: string;
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
