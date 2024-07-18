import { Router } from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { AppDataSource } from "../config/dataSource";
import AbrigoController from "../controllers/AbrigoController";

const router = Router();

const abrigoRepository = new AbrigoRepository(
  AppDataSource.getRepository("AbrigoEntity")
);

const abrigoController = new AbrigoController(
  abrigoRepository
);

router.post("/", (req, res) => abrigoController.criaAbrigo(req, res));
router.get("/", (req, res) => abrigoController.listaAbrigo(req, res));
router.put("/:id", (req, res) => abrigoController.atualizaAbrigo(req, res));
router.delete("/:id", (req, res) => abrigoController.deleteAbrigo(req, res));
router.patch("/:id", (req, res) => abrigoController.atualizaEnderecoAbrigo(req, res));

export default router;