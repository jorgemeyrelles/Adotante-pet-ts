import "express-async-errors";
import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";
import { errorMiddleware } from "./middleware/error";

const app = express();
app.use(express.json());
router(app);
console.log(process.env);

app.get("/teste", () => {
  throw new Error("Erro teste");
});

app.use(errorMiddleware);

AppDataSource
  .initialize()
  .then(() => {
    console.log("Banco de dados conectado.");
  })
  .catch(() => {
    console.error("Erro ao tentar conectar com o bando de dados");
  });

export default app;
