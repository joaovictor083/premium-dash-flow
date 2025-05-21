
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, CalendarCheck, CloudUpload, Save } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export const PremiumCTA = () => {
  const handlePremiumClick = () => {
    toast("Versão Premium", {
      description: "Em breve você terá acesso a todos os recursos premium!",
      action: {
        label: "OK",
        onClick: () => {},
      },
    });
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-0.5">
        <CardContent className="p-5 bg-white dark:bg-background rounded-sm">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Versão PRO</h2>
            <p className="text-slate-600 text-sm mt-1">
              Desbloqueie recursos avançados de produtividade
            </p>
          </div>

          <div className="space-y-3 mt-5">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <ArrowDownToLine size={18} />
              </div>
              <div>
                <h4 className="text-sm font-medium">Exportar para PDF</h4>
                <p className="text-xs text-slate-500">Exporte suas tarefas e análises</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <CloudUpload size={18} />
              </div>
              <div>
                <h4 className="text-sm font-medium">Salvar na nuvem</h4>
                <p className="text-xs text-slate-500">Acesse de qualquer dispositivo</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <CalendarCheck size={18} />
              </div>
              <div>
                <h4 className="text-sm font-medium">Integração com calendário</h4>
                <p className="text-xs text-slate-500">Sincronize com Google Calendar</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              onClick={handlePremiumClick}
            >
              Adquirir versão PRO
            </Button>
          </div>
        </CardContent>
      </div>

      <div className="bg-slate-50 text-center py-3 px-4">
        <p className="text-xs text-slate-600">
          <span className="font-semibold">Oferta especial:</span> Teste grátis por 7 dias
        </p>
      </div>
    </Card>
  );
};
