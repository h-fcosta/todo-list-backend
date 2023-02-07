import Tarefa from "../models/Tarefa.js";

class tarefasController {
  static async listaTodasTarefas(req, res) {
    try {
      const listaTarefas = await Tarefa.find();

      return res.status(200).json(listaTarefas);
    } catch (error) {
      res.status(500).json({ message: "Não foi possível listar as tarefas." });
    }
  }

  static async listaTarefaId(req, res) {
    try {
      const tarefa = await Tarefa.findById(req.params.id);

      res.status(200).json(tarefa);
    } catch (error) {
      res.status(404).json({ message: "Tarefa não encontrada." });
    }
  }

  static async criaTarefa(req, res) {
    const { tarefa } = req.body;

    const novaTarefa = new Tarefa({
      tarefa,
    });

    if (!novaTarefa.tarefa) {
      return res.status(422).json({ message: "Tarefa obrigatória" });
    }

    try {
      await novaTarefa.save();

      return res.status(201).json({ message: "Tarefa criada com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Tarefa não pode ser criada." });
    }
  }

  static async editaTarefa(req, res) {
    try {
      await Tarefa.findByIdAndUpdate(req.params.id, { $set: req.body });

      res.status(200).json({ message: "Tarefa atualizada com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Tarefa não pode ser editada." });
    }
  }

  static async deletaTarefa(req, res) {
    try {
      await Tarefa.findByIdAndRemove(req.params.id);

      return res.status(200).json({ message: "Tarefa deletada com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Não foi possível excluir a tarefa." });
    }
  }
}

export default tarefasController;
