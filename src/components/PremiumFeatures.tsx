
import { ArrowDownToLine, CalendarCheck, CloudUpload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const PremiumFeatures = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFeatureClick = (feature: string) => {
    setOpenDialog(feature);
  };

  const handleCloudSave = () => {
    // Simulating cloud save
    toast({
      title: "Salvamento na nuvem",
      description: "Suas tarefas foram salvas na nuvem com sucesso!",
    });
    setOpenDialog(null);
  };

  const handlePDFExport = () => {
    // This would typically involve actual PDF generation logic
    toast({
      title: "Exportação para PDF",
      description: "O PDF foi exportado com sucesso!",
    });
    setOpenDialog(null);
  };

  const handleCalendarSync = () => {
    // This would typically connect to calendar API
    toast({
      title: "Integração de calendário",
      description: "Por favor autorize acesso ao seu calendário Google.",
    });
    setOpenDialog(null);
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-indigo-100">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">Recursos Premium</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div 
              className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-indigo-50 transition-colors"
              onClick={() => handleFeatureClick('cloud')}
            >
              <CloudUpload className="h-8 w-8 text-indigo-500 mb-2" />
              <h3 className="font-medium text-slate-700">Salvamento na Nuvem</h3>
              <p className="text-sm text-slate-500 mt-1">Mantenha suas tarefas sincronizadas em todos os dispositivos</p>
            </div>
            
            <div 
              className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-indigo-50 transition-colors"
              onClick={() => handleFeatureClick('pdf')}
            >
              <ArrowDownToLine className="h-8 w-8 text-indigo-500 mb-2" />
              <h3 className="font-medium text-slate-700">Exportação em PDF</h3>
              <p className="text-sm text-slate-500 mt-1">Compartilhe ou arquive seu planejamento em formato PDF</p>
            </div>
            
            <div 
              className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-indigo-50 transition-colors"
              onClick={() => handleFeatureClick('calendar')}
            >
              <CalendarCheck className="h-8 w-8 text-indigo-500 mb-2" />
              <h3 className="font-medium text-slate-700">Integração com Calendário</h3>
              <p className="text-sm text-slate-500 mt-1">Sincronize com Google Calendar e outros serviços</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cloud Save Dialog */}
      <Dialog open={openDialog === 'cloud'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salvamento na Nuvem</DialogTitle>
            <DialogDescription>
              Mantenha suas tarefas sincronizadas em todos os seus dispositivos automaticamente.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-500">
              Para implementar um salvamento na nuvem completo seria necessário uma integração com backend. Por enquanto, você pode simular o salvamento clicando no botão abaixo.
            </p>
            <div className="flex justify-end">
              <Button onClick={handleCloudSave}>
                <CloudUpload className="mr-2 h-4 w-4" />
                Salvar na Nuvem
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* PDF Export Dialog */}
      <Dialog open={openDialog === 'pdf'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportação em PDF</DialogTitle>
            <DialogDescription>
              Exporte sua matriz de Eisenhower e tarefas em formato PDF para compartilhar ou arquivar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-500">
              Para uma exportação PDF completa seria necessário integrar uma biblioteca como jsPDF. Por enquanto, você pode simular a exportação clicando no botão abaixo.
            </p>
            <div className="flex justify-end">
              <Button onClick={handlePDFExport}>
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Calendar Integration Dialog */}
      <Dialog open={openDialog === 'calendar'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Integração com Calendário</DialogTitle>
            <DialogDescription>
              Sincronize suas tarefas com Google Calendar e outros serviços de agenda.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-500">
              Para implementar uma integração completa com o Google Calendar seria necessário usar a API do Google. Para isso, você precisaria:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Criar um projeto no Google Cloud Console</li>
                <li>Habilitar a API do Google Calendar</li>
                <li>Configurar OAuth para autorização</li>
                <li>Implementar um backend para gerenciar tokens</li>
              </ul>
            </p>
            <div className="flex justify-end">
              <Button onClick={handleCalendarSync}>
                <CalendarCheck className="mr-2 h-4 w-4" />
                Sincronizar Calendário
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
