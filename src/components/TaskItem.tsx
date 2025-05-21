
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Check, Clock } from "lucide-react";
import { TaskForm } from "./TaskForm";

type Task = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  timeEstimated: number;
  timeSpent: number;
  createdAt: Date;
};

interface TaskItemProps {
  task: Task;
  onUpdate: (updatedTask: Partial<Task>) => void;
  onDelete: () => void;
  color: string;
}

export const TaskItem = ({ task, onUpdate, onDelete, color }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Efeito para controlar o timer baseado no status da tarefa
  useEffect(() => {
    // Se o status é "in_progress", inicie o timer automaticamente
    if (task.status === "in_progress" && !timerActive) {
      startTimer();
    } 
    // Se o status mudou para "completed" ou "pending", pare o timer
    else if ((task.status === "completed" || task.status === "pending") && timerActive) {
      stopTimer();
    }
    
    // Limpeza ao desmontar o componente
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [task.status]);

  const getStatusBadge = () => {
    switch (task.status) {
      case "completed":
        return <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Concluído</span>;
      case "in_progress":
        return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Em andamento</span>;
      default:
        return <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">Pendente</span>;
    }
  };

  const toggleStatus = () => {
    let newStatus: "pending" | "in_progress" | "completed";
    
    switch (task.status) {
      case "pending":
        newStatus = "in_progress";
        break;
      case "in_progress":
        newStatus = "completed";
        break;
      case "completed":
        newStatus = "pending";
        break;
      default:
        newStatus = "pending";
    }
    
    onUpdate({ status: newStatus });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (updatedTaskData: Omit<Task, "id" | "createdAt">) => {
    onUpdate(updatedTaskData);
    setIsEditing(false);
  };

  const toggleTimer = () => {
    if (timerActive) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const startTimer = () => {
    setTimerActive(true);
    const interval = setInterval(() => {
      onUpdate({ timeSpent: task.timeSpent + 1 });
    }, 60000); // Incrementa a cada minuto
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    setTimerActive(false);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (isEditing) {
    return (
      <TaskForm 
        onSubmit={handleUpdate} 
        onCancel={() => setIsEditing(false)} 
        initialValues={task}
      />
    );
  }

  return (
    <Card className={`border border-slate-200 hover:border-${color.replace('text-', '')}-200 transition-colors`}>
      <CardContent className="p-3">
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleStatus} 
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors
                ${task.status === 'completed' ? `${color.replace('text-', 'bg-')} text-white` : 'border border-slate-300'}`}
            >
              {task.status === 'completed' && <Check size={12} />}
            </button>
            <h4 className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-700'}`}>
              {task.title}
            </h4>
          </div>
          {getStatusBadge()}
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500">
          <div className="flex flex-col xs:flex-row xs:gap-2">
            <span>Estimado: {formatTime(task.timeEstimated)}</span>
            <span className="flex items-center">
              Realizado: {formatTime(task.timeSpent)}
              {timerActive && <Clock size={12} className="ml-1 animate-pulse text-blue-500" />}
            </span>
          </div>
          
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0" 
              onClick={handleEdit}
            >
              <Edit size={14} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" 
              onClick={onDelete}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className={`mt-2 text-xs ${timerActive ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}`}
          onClick={toggleTimer}
        >
          {timerActive ? 'Pausar Timer' : 'Iniciar Timer'}
        </Button>
      </CardContent>
    </Card>
  );
};
