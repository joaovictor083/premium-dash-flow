
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TaskItem } from "./TaskItem";
import { TaskForm } from "./TaskForm";
import { Plus } from "lucide-react";

type Task = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  timeEstimated: number;
  timeSpent: number;
  createdAt: Date;
};

interface QuadrantProps {
  id: string;
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
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    onAddTask(newTask);
    setShowForm(false);
  };

  // Mapeamento das cores específicas por quadrante
  const quadrantStyles = {
    urgent_important: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      button: "bg-red-600 hover:bg-red-700",
      badge: "bg-red-100 text-red-700 border-red-200"
    },
    not_urgent_important: {
      bg: "bg-blue-50", 
      border: "border-blue-200",
      text: "text-blue-700",
      button: "bg-blue-600 hover:bg-blue-700",
      badge: "bg-blue-100 text-blue-700 border-blue-200"
    },
    urgent_not_important: {
      bg: "bg-yellow-50",
      border: "border-yellow-200", 
      text: "text-yellow-700",
      button: "bg-yellow-600 hover:bg-yellow-700",
      badge: "bg-yellow-100 text-yellow-700 border-yellow-200"
    },
    not_urgent_not_important: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700", 
      button: "bg-green-600 hover:bg-green-700",
      badge: "bg-green-100 text-green-700 border-green-200"
    }
  };

  const styles = quadrantStyles[id] || quadrantStyles.urgent_important;

  return (
    <Card className={`${styles.bg} ${styles.border} border-2 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden`}>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap justify-between items-start gap-3">
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${styles.text} mb-1`}>{title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${styles.badge} border`}>
              {action}
            </span>
            <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full">
              {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={(updatedTask) => onUpdateTask(task.id, updatedTask)}
              onDelete={() => onDeleteTask(task.id)}
              color={styles.text}
            />
          ))}

          {tasks.length === 0 && !showForm && (
            <div className="text-center py-8 text-slate-400">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium">Nenhuma tarefa adicionada</p>
              <p className="text-xs">Clique abaixo para começar</p>
            </div>
          )}

          {showForm ? (
            <TaskForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
          ) : (
            <Button 
              variant="outline" 
              className={`w-full mt-4 border-dashed border-2 h-12 text-sm font-medium transition-all duration-200 hover:scale-[1.02] ${styles.border} hover:${styles.bg}`}
              onClick={() => setShowForm(true)}
            >
              <Plus size={16} className="mr-2" />
              + Adicionar Tarefa
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
