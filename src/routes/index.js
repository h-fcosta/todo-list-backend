import express from "express";
import usuarios from "./usuariosRoutes.js";
import tarefas from "./tarefasRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).json({ message: "Teste para Coopers" });
  });
  app.use(express.json(), usuarios, tarefas);
};

export default routes;
