
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
          headerGradient: "from-red-500/80 to-red-600/80",
          textColor: "text-white",
          buttonColor: "bg-red-500 hover:bg-red-600",
          glowColor: "hover:shadow-red-500/50",
          iconColor: "text-red-400"
        };
      case "not_urgent_important":
        return {
          headerGradient: "from-cyber-blue/80 to-cyber-purple/80",
          textColor: "text-white",
          buttonColor: "gradient-primary hover:neon-blue",
          glowColor: "hover:shadow-cyber-blue/50",
          iconColor: "text-cyber-blue"
        };
      case "urgent_not_important":
        return {
          headerGradient: "from-amber-500/80 to-orange-500/80",
          textColor: "text-white",
          buttonColor: "bg-amber-500 hover:bg-amber-600",
          glowColor: "hover:shadow-amber-500/50",
          iconColor: "text-amber-400"
        };
      case "not_urgent_not_important":
        return {
          headerGradient: "from-green-500/80 to-emerald-500/80",
          textColor: "text-white",
          buttonColor: "bg-green-500 hover:bg-green-600",
          glowColor: "hover:shadow-green-500/50",
          iconColor: "text-green-400"
        };
    }
  };

  const { headerGradient, textColor, buttonColor, glowColor, iconColor } = getQuadrantConfig(id);

  return (
    <Card className={`glass-card border-cyber-blue/20 rounded-3xl overflow-hidden hover-glow transition-all duration-300 animate-scale-in ${glowColor}`}>
      <div className={`px-6 py-5 bg-gradient-to-r ${headerGradient} backdrop-blur-xl ${textColor} flex items-center justify-between`}>
        <div>
          <h2 className="text-xl font-bold font-space text-glow mb-1">{title}</h2>
          <p className="text-sm opacity-90 font-inter mb-1">{description}</p>
          <span className="text-xs font-semibold uppercase tracking-wider opacity-75 font-space">{action}</span>
        </div>
        <button 
          onClick={handleAddTask} 
          className={`rounded-2xl p-3 ${buttonColor} text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6 space-y-4 custom-scrollbar max-h-96 overflow-y-auto">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="glass-card rounded-2xl p-4 hover-scale transition-all duration-300 border border-cyber-blue/20">
              <TaskItem
                task={task}
                onUpdate={(updatedTask) => handleTaskUpdate(task.id, updatedTask)}
                onDelete={() => handleTaskDelete(task.id)}
                color={color}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className={`w-16 h-16 rounded-2xl glass-card flex items-center justify-center mx-auto mb-4`}>
              <Plus className={`h-8 w-8 ${iconColor}`} />
            </div>
            <p className="text-cyber-blue/60 font-inter">Nenhuma tarefa aqui.</p>
            <p className="text-cyber-blue/40 text-sm font-inter mt-1">Clique no + para adicionar</p>
          </div>
        )}
      </div>

      {isAddingTask && (
        <div className="p-6 border-t border-cyber-blue/20 glass-dark">
          <input
            type="text"
            placeholder="Título da tarefa"
            className="w-full p-4 glass-card border border-cyber-blue/30 rounded-2xl mb-4 focus:outline-none focus:border-cyber-blue focus:neon-blue bg-transparent text-white placeholder:text-cyber-blue/60 font-inter"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição da tarefa (opcional)"
            className="w-full p-4 glass-card border border-cyber-blue/30 rounded-2xl mb-6 focus:outline-none focus:border-cyber-blue focus:neon-blue bg-transparent text-white placeholder:text-cyber-blue/60 resize-none font-inter"
            rows={3}
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <button 
              onClick={handleCancelAddTask} 
              className="px-6 py-3 rounded-2xl text-cyber-blue hover:bg-cyber-blue/20 transition-all duration-300 font-inter"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSaveTask} 
              className={`px-6 py-3 rounded-2xl text-white ${buttonColor} transition-all duration-300 hover-scale shadow-lg font-inter`}
            >
              Salvar
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};
