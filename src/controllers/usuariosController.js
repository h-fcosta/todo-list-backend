import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UsuariosController {
  static async cadastraUsuario(req, res) {
    const { nome, email, senha, confirmaSenha } = req.body;

    if (!nome) {
      return res.status(422).json({ message: "Nome obrigatório" });
    }
    if (!email) {
      return res.status(422).json({ message: "E-mail obrigatório" });
    }
    if (!senha) {
      return res.status(422).json({ message: "Senha obrigatória" });
    }
    if (senha !== confirmaSenha) {
      return res.status(422).json({ message: "As senhas não conferem" });
    }
    const usuarioExiste = await Usuario.findOne({ email: email });
    if (usuarioExiste) {
      return res.status(422).json({ message: "Usuário existente" });
    }

    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);
    const usuario = new Usuario({
      nome,
      email,
      senha: senhaHash,
    });

    try {
      await usuario.save();

      res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Usuário não pode ser criado." });
    }
  }

  static async loginUsuario(req, res) {
    const { email, senha } = req.body;

    if (!email) {
      return res.status(422).json({ message: "E-mail obrigatório" });
    }
    if (!senha) {
      return res.status(422).json({ message: "Senha obrigatória" });
    }

    const usuario = await Usuario.findOne({ email: email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const checaSenha = await bcrypt.compare(senha, usuario.senha);
    if (!checaSenha) {
      return res.status(422).json({ message: "Senha incorreta" });
    }

    try {
      const chave_jwt = process.env.SECRET_JWT;

      const token = jwt.sign(
        {
          id: usuario._id,
        },
        chave_jwt
      );

      res.status(200).json({ message: "Login efetuado com sucesso", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Login não permitido." });
    }
  }

  static async checaTokenUsuario(req, res) {
    const id = req.params.id;

    const usuario = await Usuario.findById(id, "-senha");
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ usuario });
  }
}

export default UsuariosController;
