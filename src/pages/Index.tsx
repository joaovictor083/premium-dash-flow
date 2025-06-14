
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { FloatingActionButton } from "@/components/FloatingActionButton";
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

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleTaskStatsUpdate = (newStats) => {
    setTaskStats(newStats);
  };

  const handleNewTask = () => {
    // Em um modal futuro - por enquanto apenas um console.log
    console.log("✔️ Abrindo modal para nova tarefa...");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <DashboardHeader 
            onNewTask={handleNewTask}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Matriz Principal */}
                <div className="xl:col-span-3">
                  <EisenhowerMatrix onStatsUpdate={handleTaskStatsUpdate} />
                </div>

                {/* Painel Lateral Direito */}
                <div className="space-y-6">
                  <Card className="overflow-hidden border-0 shadow-lg rounded-2xl">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 mb-4">
                        📊 Seu Progresso da Semana
                      </h2>
                      <TimeAnalysisChart taskStats={taskStats} />
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-0 shadow-lg rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50">
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-slate-900 mb-4">
                        ⭐ Recursos Premium
                      </h2>
                      <PremiumFeatures />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>

        <FloatingActionButton onClick={handleNewTask} />
      </div>
    </SidebarProvider>
  );
};

export default Index;
