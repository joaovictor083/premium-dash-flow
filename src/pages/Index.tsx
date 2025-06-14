
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
    console.log("✔️ Abrindo modal para nova tarefa...");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <DashboardHeader 
            onNewTask={handleNewTask}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          
          <div className="flex-1 p-6 custom-scrollbar">
            <div className="max-w-8xl mx-auto">
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Matriz Principal */}
                <div className="xl:col-span-3 animate-fade-in">
                  <EisenhowerMatrix onStatsUpdate={handleTaskStatsUpdate} />
                </div>

                {/* Painel Lateral Direito */}
                <div className="space-y-8 animate-slide-up">
                  <Card className="glass-card border-cyber-blue/20 rounded-3xl hover-glow transition-all duration-300">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-white mb-6 font-space text-glow">
                        📊 Seu Progresso da Semana
                      </h2>
                      <TimeAnalysisChart taskStats={taskStats} />
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-cyber-purple/20 rounded-3xl hover-glow transition-all duration-300 gradient-card">
                    <CardContent className="p-8">
                      <h2 className="text-xl font-semibold text-white mb-6 font-space">
                        ⭐ Recursos Premium
                      </h2>
                      <PremiumFeatures />
                    </CardContent>
                  </Card>

                  {/* Web3 Stats Card */}
                  <Card className="glass-card border-neon-green/20 rounded-3xl hover-glow transition-all duration-300">
                    <CardContent className="p-8">
                      <h2 className="text-xl font-semibold text-white mb-4 font-space text-glow">
                        ⚡ Performance
                      </h2>
                      <div className="space-y-4">
                        <div className="glass-card p-4 rounded-2xl border border-cyber-blue/20">
                          <div className="flex justify-between items-center">
                            <span className="text-cyber-blue font-inter">Produtividade</span>
                            <span className="text-white font-bold font-space">85%</span>
                          </div>
                          <div className="w-full bg-deep-black/50 rounded-full h-2 mt-2">
                            <div className="gradient-primary h-2 rounded-full neon-blue" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        
                        <div className="glass-card p-4 rounded-2xl border border-cyber-purple/20">
                          <div className="flex justify-between items-center">
                            <span className="text-cyber-purple font-inter">Foco</span>
                            <span className="text-white font-bold font-space">92%</span>
                          </div>
                          <div className="w-full bg-deep-black/50 rounded-full h-2 mt-2">
                            <div className="bg-gradient-to-r from-cyber-purple to-cyber-blue h-2 rounded-full neon-purple" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                      </div>
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
