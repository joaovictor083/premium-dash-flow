
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
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50"
          size="icon"
        >
          <Plus className="w-6 h-6 text-white" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Nova Tarefa</p>
      </TooltipContent>
    </Tooltip>
  )
}
