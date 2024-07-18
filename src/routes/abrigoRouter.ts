import { RequestHandler, Router } from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { AppDataSource } from "../config/dataSource";
import AbrigoController from "../controllers/AbrigoController";
import { verificaIdMiddleware } from "../middleware/validators/ReqParams";
import { middlewareValidatorBodyAbrigo } from "../middleware/validators/AbrigoReqBody";
import { middlewareValidatorBodyEndereco } from "../middleware/validators/EnderecoReqBody";
import { middlewareValidatorBodyPet } from "../middleware/validators/PetReqBody";

const router = Router();

const abrigoRepository = new AbrigoRepository(
  AppDataSource.getRepository("AbrigoEntity"),
  AppDataSource.getRepository("PetEntity")
);

const abrigoController = new AbrigoController(
  abrigoRepository
);

const validaBodyAbrigo: RequestHandler =
  (req, res, next) => middlewareValidatorBodyAbrigo(req, res, next);

const validaBodyEndereco: RequestHandler =
  (req, res, next) => middlewareValidatorBodyEndereco(req, res, next);

const validaBodyPet: RequestHandler =
  (req, res, next) => middlewareValidatorBodyPet(req, res, next);

router.post("/",
  validaBodyAbrigo,
  (req, res) => abrigoController.criaAbrigo(req, res)
);
router.get("/", (req, res) => abrigoController.listaAbrigo(req, res));
router.put("/:id",
  verificaIdMiddleware,
  (req, res) => abrigoController.atualizaAbrigo(req, res)
);
router.put("/pet/:id",
  verificaIdMiddleware,
  validaBodyPet,
  (req, res) => abrigoController.atualizaPetAbrigo(req, res)
);
router.delete("/:id",
  verificaIdMiddleware,
  (req, res) => abrigoController.deleteAbrigo(req, res)
);
router.patch("/:id",
  verificaIdMiddleware,
  validaBodyEndereco,
  (req, res) => abrigoController.atualizaEnderecoAbrigo(req, res)
);

export default router;