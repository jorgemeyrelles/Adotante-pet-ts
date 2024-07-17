import express, { RequestHandler } from "express";
import PetController from "../controllers/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidatorBodyPet } from "../middleware/validators/PetReqBody";
import { verificaIdMiddleware } from "../middleware/validators/ReqParams";

const router = express.Router();

const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity"),
  AppDataSource.getRepository("AdotanteEntity")
);

const petController = new PetController(petRepository);

const validatorBodyPet: RequestHandler =
  (req, res, next) => middlewareValidatorBodyPet(req, res, next);

router.post("/",
  validatorBodyPet,
  (req, res) => petController.criaPet(req, res)
);
router.get("/", (req, res) => petController.listaPets(req, res));
router.put("/:id",
  verificaIdMiddleware,
  (req, res) => petController.atualizaPet(req, res)
);
router.delete("/:id",
  verificaIdMiddleware,
  (req, res) => petController.deletePet(req, res)
);
router.put("/:pet_id/:adotante_id",
  verificaIdMiddleware,
  (req, res) => petController.adotaPet(req, res)
);
router.get(
  "/filtroPorte",
  (req, res) => petController.buscaPetPeloPorte(req, res)
);
router.get(
  "/filtro",
  (req, res) => petController.buscaPetPorCampoGenerico(req, res)
);

export default router;