
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
          className="fixed bottom-8 right-8 w-16 h-16 rounded-3xl gradient-primary neon-blue shadow-2xl hover:shadow-3xl transition-all duration-300 hover-scale z-50 animate-pulse-glow"
          size="icon"
        >
          <Plus className="w-8 h-8 text-white" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" className="glass-card border-cyber-blue/30 text-white font-inter">
        <p>Nova Tarefa</p>
      </TooltipContent>
    </Tooltip>
  )
}
