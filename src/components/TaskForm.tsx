
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

type Task = {
  id?: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  timeEstimated: number;
  timeSpent: number;
  createdAt?: Date;
};

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => void;
  onCancel: () => void;
  initialValues?: Task;
}

export const TaskForm = ({ onSubmit, onCancel, initialValues }: TaskFormProps) => {
  const [formData, setFormData] = useState<Omit<Task, "id" | "createdAt">>({
    title: initialValues?.title || "",
    status: initialValues?.status || "pending",
    timeEstimated: initialValues?.timeEstimated || 30,
    timeSpent: initialValues?.timeSpent || 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs
    if (name === "timeEstimated" || name === "timeSpent") {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit(formData);
  };

  return (
    <Card className="border border-slate-200">
      <CardContent className="p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="title" className="sr-only">Título</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título da tarefa"
              className="w-full"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="timeEstimated" className="text-xs text-slate-500 mb-1">
                Tempo est. (min)
              </Label>
              <Input
                type="number"
                id="timeEstimated"
                name="timeEstimated"
                value={formData.timeEstimated}
                onChange={handleChange}
                min={0}
                className="w-full"
              />
            </div>
            
            {initialValues && (
              <div>
                <Label htmlFor="timeSpent" className="text-xs text-slate-500 mb-1">
                  Tempo gasto (min)
                </Label>
                <Input
                  type="number"
                  id="timeSpent"
                  name="timeSpent"
                  value={formData.timeSpent}
                  onChange={handleChange}
                  min={0}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {initialValues && (
            <div>
              <Label htmlFor="status" className="text-xs text-slate-500 mb-1">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Task["status"] }))}
                className="w-full rounded-md border border-input px-3 py-2 text-sm"
              >
                <option value="pending">Pendente</option>
                <option value="in_progress">Em Andamento</option>
                <option value="completed">Concluído</option>
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              <X size={14} className="mr-1" /> Cancelar
            </Button>
            <Button type="submit" size="sm">
              <Check size={14} className="mr-1" /> {initialValues ? 'Salvar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
