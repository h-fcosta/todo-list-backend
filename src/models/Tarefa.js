import mongoose from "mongoose";

const tarefaSchema = new mongoose.Schema({
  tarefa: { type: String, required: true },
  checked: { type: Boolean, default: false },
  data: { type: Date, default: Date.now() },
});

const Tarefa = mongoose.model("Tarefa", tarefaSchema);

export default Tarefa;
