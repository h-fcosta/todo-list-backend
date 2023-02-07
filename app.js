import express from "express";
import routes from "./src/routes/index.js";
import db from "./src/config/dbConnect.js";
import cors from "cors";
import dotEnv from "dotenv";

dotEnv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
routes(app);

app.get("/", (req, res) => {
  return res.send("APLICAÇÃO ESTÁ RODANDO");
});

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com banco de dados feita com sucesso!");
});

export default app;
