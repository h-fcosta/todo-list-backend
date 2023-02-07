import express from "express";
import checaToken from "../controllers/middleware.js";
import TarefasController from "../controllers/tarefasController.js";

const router = express.Router();

router
  .get("/tarefas", checaToken, TarefasController.listaTodasTarefas)
  .get("/tarefas/:id", checaToken, TarefasController.listaTarefaId)
  .post("/tarefas", checaToken, TarefasController.criaTarefa)
  .put("/tarefas/:id", checaToken, TarefasController.editaTarefa)
  .delete("/tarefas/:id", checaToken, TarefasController.deletaTarefa);

export default router;
