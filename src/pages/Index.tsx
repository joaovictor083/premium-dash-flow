
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { EisenhowerMatrix } from "@/components/EisenhowerMatrix";
import { TimeAnalysisChart } from "@/components/TimeAnalysisChart";
import { PremiumFeatures } from "@/components/PremiumFeatures";

const Index = () => {
  const [taskStats, setTaskStats] = useState({
    urgent_important: { completed: 0, total: 0, timeSpent: 0 },
    not_urgent_important: { completed: 0, total: 0, timeSpent: 0 },
    urgent_not_important: { completed: 0, total: 0, timeSpent: 0 },
    not_urgent_not_important: { completed: 0, total: 0, timeSpent: 0 }
  });

  const handleTaskStatsUpdate = (newStats) => {
    setTaskStats(newStats);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-8">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          Matriz de Eisenhower
        </h1>
        <p className="text-slate-600 text-lg mb-4">
          Organize suas tarefas com base em importância e urgência para maximizar sua produtividade
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <EisenhowerMatrix onStatsUpdate={handleTaskStatsUpdate} />
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Análise Semanal</h2>
                <TimeAnalysisChart taskStats={taskStats} />
              </CardContent>
            </Card>

            <PremiumFeatures />
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-200 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Matriz de Eisenhower - Uma ferramenta para produtividade e tomada de decisão estratégica
      </footer>
    </div>
  );
};

export default Index;
