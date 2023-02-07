import express from "express";
import routes from "./routes/index.js";
import db from "./config/dbConnect.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
routes(app);

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com banco de dados feita com sucesso!");
});

export default app;
