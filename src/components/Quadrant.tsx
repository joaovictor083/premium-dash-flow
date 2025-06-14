import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Task } from "@/components/Task";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface TaskType {
  id: string;
  title: string;
  description: string;
  timeSpent: number;
  completed: boolean;
}

export type QuadrantType = "urgent_important" | "not_urgent_important" | "urgent_not_important" | "not_urgent_not_important";

interface QuadrantProps {
  type: QuadrantType;
  tasks: TaskType[];
  onTaskUpdate: (type: QuadrantType, taskId: string, updatedTask: Partial<TaskType>) => void;
  onTaskDelete: (type: QuadrantType, taskId: string) => void;
}

export const Quadrant = ({ type, tasks, onTaskUpdate, onTaskDelete }: QuadrantProps) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleTaskUpdate = (taskId: string, updatedTask: Partial<TaskType>) => {
    onTaskUpdate(type, taskId, updatedTask);
  };

  const handleTaskDelete = (taskId: string) => {
    onTaskDelete(type, taskId);
  };

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const handleSaveTask = () => {
    // Aqui você adicionaria a lógica para salvar a nova tarefa
    // (e.g., chamar uma função para atualizar o estado das tarefas)
    console.log("Salvando nova tarefa:", newTaskTitle, newTaskDescription);
    setIsAddingTask(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const handleCancelAddTask = () => {
    setIsAddingTask(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const getQuadrantConfig = (type: QuadrantType) => {
    switch (type) {
      case "urgent_important":
        return {
          title: "Fazer Agora",
          subtitle: "Urgente e Importante",
          color: "bg-red-50 border-red-200",
          headerColor: "bg-red-600",
          textColor: "text-red-800",
          buttonColor: "bg-red-600 hover:bg-red-700"
        };
      case "not_urgent_important":
        return {
          title: "Agendar",
          subtitle: "Importante, Não Urgente",
          color: "bg-amber-50 border-amber-200",
          headerColor: "bg-amber-600",
          textColor: "text-amber-800",
          buttonColor: "bg-amber-600 hover:bg-amber-700"
        };
      case "urgent_not_important":
        return {
          title: "Delegar",
          subtitle: "Urgente, Não Importante",
          color: "bg-slate-50 border-slate-200",
          headerColor: "bg-slate-600",
          textColor: "text-slate-800",
          buttonColor: "bg-slate-600 hover:bg-slate-700"
        };
      case "not_urgent_not_important":
        return {
          title: "Eliminar",
          subtitle: "Não Urgente, Não Importante",
          color: "bg-green-50 border-green-200",
          headerColor: "bg-green-600",
          textColor: "text-green-800",
          buttonColor: "bg-green-600 hover:bg-green-700"
        };
    }
  };

  const { title, subtitle, color, headerColor, textColor, buttonColor } = getQuadrantConfig(type);

  return (
    <Card className={`overflow-hidden border-0 shadow-md rounded-2xl ${color}`}>
      <div className={`px-6 py-4 ${headerColor} ${textColor} flex items-center justify-between`}>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm">{subtitle}</p>
        </div>
        <button onClick={handleAddTask} className={`rounded-full p-2 ${buttonColor} text-white hover:scale-110 transition-transform`}>
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onTaskUpdate={(updatedTask) => handleTaskUpdate(task.id, updatedTask)}
              onTaskDelete={() => handleTaskDelete(task.id)}
            />
          ))
        ) : (
          <p className="text-slate-500">Nenhuma tarefa aqui.</p>
        )}
      </div>

      {isAddingTask && (
        <div className="p-6">
          <input
            type="text"
            placeholder="Título da tarefa"
            className="w-full p-2 border rounded-md mb-2"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição da tarefa"
            className="w-full p-2 border rounded-md mb-4"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button onClick={handleCancelAddTask} className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100">
              Cancelar
            </button>
            <button onClick={handleSaveTask} className={`px-4 py-2 rounded-md text-white ${buttonColor}`}>
              Salvar
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};
