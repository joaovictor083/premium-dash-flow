
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
    <div className="bg-white border-b border-slate-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Trigger para abrir sidebar no mobile */}
          <SidebarTrigger className="md:hidden text-slate-700 hover:text-red-600 hover:bg-red-50" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">
              Boas-vindas, {userName}! 
            </h1>
            <p className="text-slate-600">Que tal transformar seu tempo em resultado hoje?</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Campo de busca */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="🔍 Pesquisar tarefas, metas ou relatórios..."
              className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-red-300 focus:ring-red-200"
            />
          </div>

          {/* Botões de visualização */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className={`h-8 w-8 p-0 ${viewMode === "grid" ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50 hover:text-red-600"}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className={`h-8 w-8 p-0 ${viewMode === "list" ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50 hover:text-red-600"}`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Botão Nova Tarefa */}
          <Button 
            onClick={onNewTask}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Adicionar Tarefa</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
