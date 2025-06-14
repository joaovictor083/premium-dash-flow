
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { TaskItem } from "@/components/TaskItem";
import { Plus, Pencil, Trash2 } from "lucide-react";

type Task = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  timeEstimated: number;
  timeSpent: number;
  createdAt: Date;
};

export type QuadrantType = "urgent_important" | "not_urgent_important" | "urgent_not_important" | "not_urgent_not_important";

interface QuadrantProps {
  id: QuadrantType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  action: string;
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onUpdateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

export const Quadrant = ({ 
  id, 
  title, 
  description, 
  color, 
  bgColor, 
  action, 
  tasks, 
  onAddTask, 
  onUpdateTask, 
  onDeleteTask 
}: QuadrantProps) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleTaskUpdate = (taskId: string, updatedTask: Partial<Task>) => {
    onUpdateTask(taskId, updatedTask);
  };

  const handleTaskDelete = (taskId: string) => {
    onDeleteTask(taskId);
  };

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const handleSaveTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: newTaskTitle,
        status: "pending",
        timeEstimated: 60, // Default 1 hour
        timeSpent: 0,
        createdAt: new Date()
      };
      onAddTask(newTask);
      setIsAddingTask(false);
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  const handleCancelAddTask = () => {
    setIsAddingTask(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const getQuadrantConfig = (quadrantId: QuadrantType) => {
    switch (quadrantId) {
      case "urgent_important":
        return {
          headerColor: "bg-red-600",
          textColor: "text-white",
          buttonColor: "bg-red-600 hover:bg-red-700"
        };
      case "not_urgent_important":
        return {
          headerColor: "bg-blue-600",
          textColor: "text-white",
          buttonColor: "bg-blue-600 hover:bg-blue-700"
        };
      case "urgent_not_important":
        return {
          headerColor: "bg-amber-600",
          textColor: "text-white",
          buttonColor: "bg-amber-600 hover:bg-amber-700"
        };
      case "not_urgent_not_important":
        return {
          headerColor: "bg-green-600",
          textColor: "text-white",
          buttonColor: "bg-green-600 hover:bg-green-700"
        };
    }
  };

  const { headerColor, textColor, buttonColor } = getQuadrantConfig(id);

  return (
    <Card className={`overflow-hidden border-0 shadow-md rounded-2xl ${bgColor}`}>
      <div className={`px-6 py-4 ${headerColor} ${textColor} flex items-center justify-between`}>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm opacity-90">{description}</p>
          <span className="text-xs font-semibold uppercase tracking-wider opacity-75">{action}</span>
        </div>
        <button 
          onClick={handleAddTask} 
          className={`rounded-full p-2 ${buttonColor} text-white hover:scale-110 transition-transform`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={(updatedTask) => handleTaskUpdate(task.id, updatedTask)}
              onDelete={() => handleTaskDelete(task.id)}
              color={color}
            />
          ))
        ) : (
          <p className="text-slate-500">Nenhuma tarefa aqui.</p>
        )}
      </div>

      {isAddingTask && (
        <div className="p-6 border-t border-slate-200">
          <input
            type="text"
            placeholder="Título da tarefa"
            className="w-full p-3 border border-slate-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição da tarefa (opcional)"
            className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            rows={3}
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <button 
              onClick={handleCancelAddTask} 
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSaveTask} 
              className={`px-4 py-2 rounded-lg text-white ${buttonColor} transition-colors`}
            >
              Salvar
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};
