
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Check, Clock, ChevronDown } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            Concluído
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            Em andamento
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-slate-700 border-slate-300">
            Pendente
          </Badge>
        );
    }
  };

  const getNextStatus = (currentStatus: "pending" | "in_progress" | "completed") => {
    switch (currentStatus) {
      case "pending":
        return "in_progress";
      case "in_progress":
        return "completed";
      case "completed":
        return "pending";
    }
  };

  const toggleStatus = () => {
    const newStatus = getNextStatus(task.status);
    onUpdate({ status: newStatus });
  };

  const getStatusTooltipText = () => {
    const nextStatus = getNextStatus(task.status);
    switch (nextStatus) {
      case "in_progress":
        return "Iniciar tarefa";
      case "completed":
        return "Marcar como concluída";
      case "pending":
        return "Voltar para pendente";
    }
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

  const handleStatusChange = (newStatus: "pending" | "in_progress" | "completed") => {
    onUpdate({ status: newStatus });
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
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={toggleStatus} 
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all
                    ${task.status === 'completed' ? 
                      `${color.replace('text-', 'bg-')} text-white` : 
                      task.status === 'in_progress' ? 
                        'bg-blue-100 border border-blue-400' : 
                        'border border-slate-300 hover:border-slate-400 hover:bg-slate-50'}`}
                  aria-label={`Marcar como ${getNextStatus(task.status)}`}
                >
                  {task.status === 'completed' && <Check size={14} />}
                  {task.status === 'in_progress' && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {getStatusTooltipText()}
              </TooltipContent>
            </Tooltip>
            <h4 className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-700'}`}>
              {task.title}
            </h4>
          </div>
          
          {/* Dropdown interativo para alterar status */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 px-2 py-0">
                {getStatusBadge()}
                <ChevronDown size={12} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                onClick={() => handleStatusChange("pending")}
                className="flex items-center gap-2"
              >
                <Checkbox 
                  checked={task.status === "pending"} 
                  className="w-4 h-4"
                />
                <span>Pendente</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleStatusChange("in_progress")}
                className="flex items-center gap-2"
              >
                <Checkbox 
                  checked={task.status === "in_progress"} 
                  className="w-4 h-4"
                />
                <span>Em andamento</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleStatusChange("completed")}
                className="flex items-center gap-2"
              >
                <Checkbox 
                  checked={task.status === "completed"} 
                  className="w-4 h-4"
                />
                <span>Concluído</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0" 
                  onClick={handleEdit}
                >
                  <Edit size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Editar tarefa</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" 
                  onClick={onDelete}
                >
                  <Trash2 size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Excluir tarefa</TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className={`mt-2 text-xs ${timerActive ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}`}
              onClick={toggleTimer}
            >
              {timerActive ? 'Pausar Timer' : 'Iniciar Timer'}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {timerActive ? 'Pausar o cronômetro' : 'Iniciar o cronômetro para esta tarefa'}
          </TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  );
};
