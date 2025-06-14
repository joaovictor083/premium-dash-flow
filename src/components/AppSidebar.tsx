
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
    title: "Visão Geral",
    subtitle: "Dashboard principal",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Tudo que você precisa fazer",
    subtitle: "Suas tarefas organizadas",
    url: "/tarefas",
    icon: ListTodo,
  },
  {
    title: "Seu progresso em tempo real",
    subtitle: "Métricas e análises",
    url: "/relatorios",
    icon: ChartBar,
  },
  {
    title: "Acesse rapidamente o que importa",
    subtitle: "Itens favoritos",
    url: "/favoritos",
    icon: Star,
  },
  {
    title: "Tarefas descartadas",
    subtitle: "Lixeira",
    url: "/lixeira",
    icon: Trash2,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="bg-slate-900 border-r border-slate-700">
      <SidebarHeader className="border-b border-slate-700 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">ProductiTime</h2>
            <p className="text-sm text-slate-300">Matriz de Eisenhower</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300 text-xs uppercase tracking-wide font-medium mb-3 px-2">
            NAVEGAÇÃO PRINCIPAL
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-auto p-3 rounded-xl hover:bg-slate-800 transition-colors group data-[active=true]:bg-blue-600 data-[active=true]:text-white">
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-slate-300 group-hover:text-blue-400 group-data-[active=true]:text-white" />
                      <div className="flex flex-col text-left">
                        <span className="text-white font-medium text-sm leading-tight">{item.title}</span>
                        <span className="text-slate-400 text-xs leading-tight">{item.subtitle}</span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-700 p-4">
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="h-auto p-3 rounded-xl hover:bg-slate-800 transition-colors group">
            <a href="/configuracoes" className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-slate-300 group-hover:text-blue-400" />
              <div className="flex flex-col text-left">
                <span className="text-white font-medium text-sm">Ajuste sua experiência</span>
                <span className="text-slate-400 text-xs">Configurações</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}
