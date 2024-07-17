import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnderecoEntity from "./EnderecoEntity";
import { criptografarSenha } from "../utils/criptoSenha";

@Entity()
export default class AbrigoEntity {
  constructor(
    id: number,
    nome: string,
    email: string,
    senha: string,
    celular: string,
    endereco: EnderecoEntity
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.celular = celular;
    this.endereco = endereco;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async criptoSenha() {
    if (this.senha) {
      this.senha = criptografarSenha(this.senha);
    }
  }

  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column({
    unique: true,
    nullable: false
  })
  email: string;
  @Column()
  senha: string;
  @Column({
    unique: true,
    nullable: false
  })
  celular: string;
  @OneToOne(() => EnderecoEntity, {
    nullable: true,
    cascade: true,
    eager: true
  })
  @JoinColumn()
  endereco?: EnderecoEntity;
}