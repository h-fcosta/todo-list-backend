import express from "express";
import UsuariosController from "../controllers/usuariosController.js";
import checaToken from "../controllers/middleware.js";

const router = express.Router();

router
  .get("/usuario/:id", checaToken, UsuariosController.checaTokenUsuario)
  .post("/auth/cadastro", UsuariosController.cadastraUsuario)
  .post("/auth/login", UsuariosController.loginUsuario);

export default router;
