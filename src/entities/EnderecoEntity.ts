import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class EnderecoEntity {
  constructor(
    cidade: string,
    estado: string
  ) {
    this.cidade = cidade;
    this.estado = estado;
  }
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  cidade: string;
  @Column()
  estado: string;
}
