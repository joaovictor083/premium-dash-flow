
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend 
} from "@/components/ui/chart";
import { useState } from "react";

interface TimeAnalysisChartProps {
  taskStats: {
    urgent_important: { completed: number; total: number; timeSpent: number };
    not_urgent_important: { completed: number; total: number; timeSpent: number };
    urgent_not_important: { completed: number; total: number; timeSpent: number };
    not_urgent_not_important: { completed: number; total: number; timeSpent: number };
  };
}

interface TimeChartData {
  name: string;
  value: number;
  color: string;
}

interface TaskChartData {
  name: string;
  value: number;
  total: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  chartView: "time" | "tasks";
}

export const TimeAnalysisChart = ({ taskStats }: TimeAnalysisChartProps) => {
  const [chartView, setChartView] = useState<"time" | "tasks">("time");
  
  // Configuração para visualização de tempo gasto
  const timeData: TimeChartData[] = [
    { name: "Importante e Urgente", value: taskStats.urgent_important.timeSpent, color: "#EF4444" },
    { name: "Importante, Não Urgente", value: taskStats.not_urgent_important.timeSpent, color: "#3B82F6" },
    { name: "Urgente, Não Importante", value: taskStats.urgent_not_important.timeSpent, color: "#F59E0B" },
    { name: "Não Urgente, Não Importante", value: taskStats.not_urgent_not_important.timeSpent, color: "#10B981" }
  ];

  // Configuração para visualização de tarefas concluídas
  const tasksData: TaskChartData[] = [
    { name: "Importante e Urgente", value: taskStats.urgent_important.completed, total: taskStats.urgent_important.total, color: "#EF4444" },
    { name: "Importante, Não Urgente", value: taskStats.not_urgent_important.completed, total: taskStats.not_urgent_important.total, color: "#3B82F6" },
    { name: "Urgente, Não Importante", value: taskStats.urgent_not_important.completed, total: taskStats.urgent_not_important.total, color: "#F59E0B" },
    { name: "Não Urgente, Não Importante", value: taskStats.not_urgent_not_important.completed, total: taskStats.not_urgent_not_important.total, color: "#10B981" }
  ];

  // Dados com base na visualização selecionada
  const data = chartView === "time" ? timeData : tasksData;
  
  // Verificar se todos os valores são zero
  const hasData = data.some(item => item.value > 0);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const chartConfig = {
    "Importante e Urgente": {
      theme: { light: "#EF4444", dark: "#EF4444" }
    },
    "Importante, Não Urgente": {
      theme: { light: "#3B82F6", dark: "#3B82F6" }
    },
    "Urgente, Não Importante": {
      theme: { light: "#F59E0B", dark: "#F59E0B" }
    },
    "Não Urgente, Não Importante": {
      theme: { light: "#10B981", dark: "#10B981" }
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setChartView("time")}
          className={`text-xs px-3 py-1.5 rounded-md ${
            chartView === "time" 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Tempo Gasto
        </button>
        <button
          onClick={() => setChartView("tasks")}
          className={`text-xs px-3 py-1.5 rounded-md ${
            chartView === "tasks" 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Tarefas Concluídas
        </button>
      </div>

      <div className="h-[240px]">
        {!hasData ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-400 text-sm">Sem dados para exibir</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                  />
                ))}
              </Pie>
              <ChartTooltip content={<CustomTooltip chartView={chartView} />} />
              <Legend formatter={(value) => <span className="text-xs text-slate-700">{value}</span>} />
            </PieChart>
          </ChartContainer>
        )}
      </div>

      {/* Removemos a lista duplicada de itens abaixo do gráfico, já que o Legend do Recharts já exibe essa informação */}
    </div>
  );
};

// Componente personalizado para o tooltip do gráfico
const CustomTooltip = ({ active, payload, chartView }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-white p-2 border border-slate-200 rounded-md shadow-md">
      <p className="font-medium text-xs">{data.name}</p>
      {chartView === "time" ? (
        <p className="text-xs text-slate-600">{formatTime(data.value)}</p>
      ) : (
        <p className="text-xs text-slate-600">{data.value} de {data.total} concluídas</p>
      )}
    </div>
  );
};
