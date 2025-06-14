
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  ListTodo, 
  ChartBar, 
  Star, 
  Trash2, 
  Settings 
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    subtitle: "Visão Geral",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Minhas Tarefas",
    subtitle: "Tudo que você precisa fazer",
    url: "/tarefas",
    icon: ListTodo,
  },
  {
    title: "Relatórios",
    subtitle: "Seu progresso em tempo real",
    url: "/relatorios",
    icon: ChartBar,
  },
  {
    title: "Favoritos",
    subtitle: "Acesse rapidamente o que importa",
    url: "/favoritos",
    icon: Star,
  },
  {
    title: "Lixeira",
    subtitle: "Tarefas descartadas",
    url: "/lixeira",
    icon: Trash2,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="bg-slate-900 border-r border-slate-800">
      <SidebarHeader className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">ProductiTime</h2>
            <p className="text-sm text-slate-400">Matriz de Eisenhower</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 text-xs uppercase tracking-wide font-medium mb-3">
            Navegação Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-auto p-3 rounded-xl hover:bg-slate-800 transition-colors group">
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-sm">{item.title}</span>
                        <span className="text-slate-400 text-xs">{item.subtitle}</span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-800 p-4">
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="h-auto p-3 rounded-xl hover:bg-slate-800 transition-colors group">
            <a href="/configuracoes" className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
              <div className="flex flex-col">
                <span className="text-white font-medium text-sm">Configurações</span>
                <span className="text-slate-400 text-xs">Ajuste sua experiência</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}
