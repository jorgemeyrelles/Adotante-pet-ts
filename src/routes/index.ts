import { Router } from "express";
import petRouter from "./petRouter";
import adotanteRouter from "./adotanteRouter";
import abrigoRouter from "./abrigoRouter";

const router = (app: Router) => {
  app.use("/pets", petRouter);
  app.use("/adotantes", adotanteRouter);
  app.use("/abrigos", abrigoRouter);
};

export default router;
