
import { ArrowDownToLine, CalendarCheck, CloudUpload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const PremiumFeatures = () => {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-indigo-100">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Recursos Premium</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
            <CloudUpload className="h-8 w-8 text-indigo-500 mb-2" />
            <h3 className="font-medium text-slate-700">Salvamento na Nuvem</h3>
            <p className="text-sm text-slate-500 mt-1">Mantenha suas tarefas sincronizadas em todos os dispositivos</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
            <ArrowDownToLine className="h-8 w-8 text-indigo-500 mb-2" />
            <h3 className="font-medium text-slate-700">Exportação em PDF</h3>
            <p className="text-sm text-slate-500 mt-1">Compartilhe ou arquive seu planejamento em formato PDF</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
            <CalendarCheck className="h-8 w-8 text-indigo-500 mb-2" />
            <h3 className="font-medium text-slate-700">Integração com Calendário</h3>
            <p className="text-sm text-slate-500 mt-1">Sincronize com Google Calendar e outros serviços</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
