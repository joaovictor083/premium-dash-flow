
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onClick}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-3xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50 border-0"
          size="icon"
        >
          <Plus className="w-8 h-8 text-white" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" className="glass-card border-red-500/30 text-white font-inter">
        <p>Nova Tarefa</p>
      </TooltipContent>
    </Tooltip>
  )
}
