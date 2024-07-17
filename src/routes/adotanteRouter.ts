import { RequestHandler, Router } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import AdotanteController from "../controllers/AdotanteController";
import { middlewareValidatorBodyAdotante } from "../middleware/validators/AdotanteReqBody";
import { middlewareValidatorBodyEndereco } from "../middleware/validators/EnderecoReqBody";
import { verificaIdMiddleware } from "../middleware/validators/ReqParams";

const router = Router();

const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);

const adotanteController = new AdotanteController(adotanteRepository);

const validatorBodyAdotante: RequestHandler =
  (req, res, next) => middlewareValidatorBodyAdotante(req, res, next);

const validatorBodyEndereco: RequestHandler =
  (req, res, next) => middlewareValidatorBodyEndereco(req, res, next);

router.post("/",
  validatorBodyAdotante,
  (req, res) => adotanteController.criaAdotante(req, res)
);
router.get("/", (req, res) => adotanteController.listaAdotante(req, res));
router.put("/:id",
  verificaIdMiddleware,
  (req, res) => adotanteController.atualizaAdotante(req, res)
);
router.delete("/:id",
  verificaIdMiddleware,
  (req, res) => adotanteController.deleteAdotante(req, res)
);
router.patch("/:id",
  verificaIdMiddleware,
  validatorBodyEndereco,
  (req, res) => adotanteController.atualizaEnderecoAdotante(req, res)
);

export default router;
