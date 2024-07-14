import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());
router(app);

AppDataSource
  .initialize()
  .then(() => {
    console.log("Banco de dados conectado.");
  })
  .catch(() => {
    console.error("Erro ao tentar conectar com o bando de dados");
  });

export default app;
