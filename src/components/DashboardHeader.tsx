
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Plus, Grid3x3, List } from "lucide-react"
import { useState } from "react"

interface DashboardHeaderProps {
  onNewTask: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export const DashboardHeader = ({ onNewTask, viewMode, onViewModeChange }: DashboardHeaderProps) => {
  const [userName] = useState("João");

  return (
    <div className="glass-dark border-b border-red-500/20 p-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Trigger para abrir sidebar no mobile */}
          <SidebarTrigger className="md:hidden text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl p-2 transition-all" />
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-space text-glow">
              Bem-vindo, {userName}! 
            </h1>
            <p className="text-red-300/80 font-inter text-lg">Transforme seu tempo em resultados hoje ⚡</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Campo de busca com glassmorphism */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400/60 w-5 h-5" />
            <Input 
              placeholder="🔍 Pesquisar tarefas, metas ou relatórios..."
              className="pl-12 glass-card border-red-500/30 focus:border-red-500 focus:ring-red-500/50 bg-transparent text-white placeholder:text-red-300/60 h-12 rounded-2xl font-inter"
            />
          </div>

          {/* Botões de visualização com glassmorphism */}
          <div className="flex glass-card p-1 rounded-2xl">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className={`h-10 w-10 p-0 rounded-xl transition-all duration-300 ${
                viewMode === "grid" 
                  ? "bg-gradient-to-r from-red-600 to-red-700 shadow-red-500/50 text-white" 
                  : "hover:bg-red-500/20 hover:text-red-400 text-red-300/70"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className={`h-10 w-10 p-0 rounded-xl transition-all duration-300 ${
                viewMode === "list" 
                  ? "bg-gradient-to-r from-red-600 to-red-700 shadow-red-500/50 text-white" 
                  : "hover:bg-red-500/20 hover:text-red-400 text-red-300/70"
              }`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Botão Nova Tarefa com efeito neon */}
          <Button 
            onClick={onNewTask}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg font-inter h-12"
          >
            <Plus className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Adicionar Tarefa</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
