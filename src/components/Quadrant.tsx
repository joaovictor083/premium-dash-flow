
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

  return (
    <Card className={`border-2 ${bgColor} shadow-sm hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap justify-between items-start gap-2">
          <div>
            <h3 className={`text-lg font-bold ${color}`}>{title}</h3>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-xs font-semibold px-2 py-1 rounded ${bgColor} border border-current ${color}`}>
              {action}
            </span>
            <span className="text-xs text-slate-500 mt-1">
              {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={(updatedTask) => onUpdateTask(task.id, updatedTask)}
              onDelete={() => onDeleteTask(task.id)}
              color={color}
            />
          ))}

          {tasks.length === 0 && !showForm && (
            <div className="text-center py-4 text-slate-400 text-sm">
              Nenhuma tarefa adicionada
            </div>
          )}

          {showForm ? (
            <TaskForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
          ) : (
            <Button 
              variant="outline" 
              className={`w-full mt-4 border-dashed border-slate-300 hover:border-${color.replace('text-', '')}-300 text-slate-500`}
              onClick={() => setShowForm(true)}
            >
              <Plus size={16} className="mr-1" />
              Adicionar Tarefa
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
