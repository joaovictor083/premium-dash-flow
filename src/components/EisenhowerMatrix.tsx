
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Quadrant } from "./Quadrant";

type QuadrantId = "urgent_important" | "not_urgent_important" | "urgent_not_important" | "not_urgent_not_important";

type Task = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  timeEstimated: number;
  timeSpent: number;
  createdAt: Date;
};

type QuadrantConfig = {
  id: QuadrantId;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  action: string;
};

interface EisenhowerMatrixProps {
  onStatsUpdate: (stats: any) => void;
}

export const EisenhowerMatrix = ({ onStatsUpdate }: EisenhowerMatrixProps) => {
  const [tasks, setTasks] = useState<Record<QuadrantId, Task[]>>({
    urgent_important: [],
    not_urgent_important: [],
    urgent_not_important: [],
    not_urgent_not_important: []
  });

  const quadrants: QuadrantConfig[] = [
    {
      id: "urgent_important",
      title: "Importante e Urgente",
      description: "Tarefas críticas que exigem atenção imediata",
      color: "text-red-700",
      bgColor: "bg-red-50 border-red-200",
      action: "FAZER AGORA"
    },
    {
      id: "not_urgent_important",
      title: "Importante, Não Urgente",
      description: "Tarefas que contribuem para objetivos de longo prazo",
      color: "text-blue-700",
      bgColor: "bg-blue-50 border-blue-200",
      action: "AGENDAR"
    },
    {
      id: "urgent_not_important",
      title: "Urgente, Não Importante",
      description: "Tarefas que podem ser delegadas para liberar seu tempo",
      color: "text-amber-700",
      bgColor: "bg-amber-50 border-amber-200",
      action: "DELEGAR"
    },
    {
      id: "not_urgent_not_important",
      title: "Não Urgente, Não Importante",
      description: "Tarefas que podem ser eliminadas ou reduzidas",
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
      action: "ELIMINAR"
    }
  ];

  // Inicialize com dados de exemplo
  useEffect(() => {
    // Verificar se já existem tarefas armazenadas
    const storedTasks = localStorage.getItem('eisenhowerTasks');
    
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        // Garantir que a tipagem esteja correta
        const typedTasks: Record<QuadrantId, Task[]> = {
          urgent_important: [],
          not_urgent_important: [],
          urgent_not_important: [],
          not_urgent_not_important: []
        };
        
        // Converter e validar o status para cada tarefa
        Object.keys(parsedTasks).forEach((quadrantId) => {
          const quadId = quadrantId as QuadrantId;
          typedTasks[quadId] = parsedTasks[quadId].map((task: any) => ({
            ...task,
            // Garantir que o status seja um dos valores permitidos
            status: ["pending", "in_progress", "completed"].includes(task.status) 
              ? task.status as "pending" | "in_progress" | "completed" 
              : "pending",
            // Garantir que a data seja um objeto Date
            createdAt: new Date(task.createdAt)
          }));
        });
        
        setTasks(typedTasks);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
        setDefaultTasks();
      }
    } else {
      setDefaultTasks();
    }
  }, []);

  const setDefaultTasks = () => {
    // Dados de exemplo para demonstração inicial
    const exampleTasks: Record<QuadrantId, Task[]> = {
      urgent_important: [
        { 
          id: '1', 
          title: 'Finalizar relatório para reunião', 
          status: 'in_progress', 
          timeEstimated: 60, 
          timeSpent: 30, 
          createdAt: new Date() 
        }
      ],
      not_urgent_important: [
        { 
          id: '2', 
          title: 'Planejar estratégia trimestral', 
          status: 'pending', 
          timeEstimated: 120, 
          timeSpent: 0, 
          createdAt: new Date() 
        }
      ],
      urgent_not_important: [
        { 
          id: '3', 
          title: 'Responder emails não críticos', 
          status: 'pending', 
          timeEstimated: 45, 
          timeSpent: 0, 
          createdAt: new Date() 
        }
      ],
      not_urgent_not_important: [
        { 
          id: '4', 
          title: 'Organizar mesa de trabalho', 
          status: 'completed', 
          timeEstimated: 30, 
          timeSpent: 20, 
          createdAt: new Date() 
        }
      ]
    };
    setTasks(exampleTasks);
  };

  // Salvar tarefas no localStorage quando houver alterações
  useEffect(() => {
    localStorage.setItem('eisenhowerTasks', JSON.stringify(tasks));
    
    // Calcular estatísticas
    const stats = {
      urgent_important: calculateStats(tasks.urgent_important),
      not_urgent_important: calculateStats(tasks.not_urgent_important),
      urgent_not_important: calculateStats(tasks.urgent_not_important),
      not_urgent_not_important: calculateStats(tasks.not_urgent_not_important)
    };
    
    onStatsUpdate(stats);
  }, [tasks]);

  const calculateStats = (quadrantTasks: Task[]) => {
    const completed = quadrantTasks.filter(task => task.status === 'completed').length;
    const total = quadrantTasks.length;
    const timeSpent = quadrantTasks.reduce((sum, task) => sum + task.timeSpent, 0);
    
    return { completed, total, timeSpent };
  };

  const handleAddTask = (quadrantId: QuadrantId, task: Task) => {
    setTasks(prev => ({
      ...prev,
      [quadrantId]: [...prev[quadrantId], task]
    }));
  };

  const handleUpdateTask = (quadrantId: QuadrantId, taskId: string, updatedTask: Partial<Task>) => {
    setTasks(prev => ({
      ...prev,
      [quadrantId]: prev[quadrantId].map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    }));
  };

  const handleDeleteTask = (quadrantId: QuadrantId, taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [quadrantId]: prev[quadrantId].filter(task => task.id !== taskId)
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fade-in">
      {quadrants.map((quadrant) => (
        <Quadrant
          key={quadrant.id}
          id={quadrant.id}
          title={quadrant.title}
          description={quadrant.description}
          color={quadrant.color}
          bgColor={quadrant.bgColor}
          action={quadrant.action}
          tasks={tasks[quadrant.id]}
          onAddTask={(task) => handleAddTask(quadrant.id, task)}
          onUpdateTask={(taskId, updatedTask) => handleUpdateTask(quadrant.id, taskId, updatedTask)}
          onDeleteTask={(taskId) => handleDeleteTask(quadrant.id, taskId)}
        />
      ))}
    </div>
  );
};
