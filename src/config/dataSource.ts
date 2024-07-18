import { DataSource } from "typeorm";
import PetEntity from "../entities/PetEntity";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import AbrigoEntity from "../entities/AbrigoEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "****",
  database: "bd_alura_typescript",
  synchronize: true,
  logging: true,
  entities: [
    PetEntity,
    AdotanteEntity,
    EnderecoEntity,
    AbrigoEntity
  ],
  subscribers: [],
  migrations: [],
});