import dotEnv from "dotenv";
import jwt from "jsonwebtoken";

dotEnv.config();

function checaToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  try {
    const chave_jwt = process.env.SECRET_JWT;

    jwt.verify(token, chave_jwt);

    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido" });
  }
}

export default checaToken;
