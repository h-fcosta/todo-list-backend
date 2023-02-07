import dotEnv from "dotenv";
import app from "./src/app.js";

dotEnv.config();

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  return res.send("APLICAÇÃO ESTÁ RODANDO");
});

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
