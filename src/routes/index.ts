import { Router } from "express";
import petRouter from "./petRouter";
import adotanteRouter from "./adotanteRouter";

const router = (app: Router) => {
  app.use("/pets", petRouter);
  app.use("/adotantes", adotanteRouter);
};

export default router;
