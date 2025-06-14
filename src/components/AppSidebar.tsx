
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
    subtitle: "Visão geral",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Tarefas",
    subtitle: "Gestão de atividades",
    url: "/tarefas",
    icon: ListTodo,
  },
  {
    title: "Relatórios",
    subtitle: "Analytics & métricas",
    url: "/relatorios",
    icon: ChartBar,
  },
  {
    title: "Favoritos",
    subtitle: "Items salvos",
    url: "/favoritos",
    icon: Star,
  },
  {
    title: "Lixeira",
    subtitle: "Items descartados",
    url: "/lixeira",
    icon: Trash2,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="glass-dark border-r border-cyber-blue/20">
      <SidebarHeader className="border-b border-cyber-blue/20 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl glass-card">
            <img 
              src="/lovable-uploads/8c7f8ce3-d763-41ed-b356-5adef553f0dc.png" 
              alt="Time Hower Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-space text-glow">Time Hower</h2>
            <p className="text-sm text-cyber-blue font-inter">Matriz de Eisenhower</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-cyber-blue/70 text-xs uppercase tracking-wider font-medium mb-4 px-2 font-space">
            NAVEGAÇÃO PRINCIPAL
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-auto p-4 rounded-2xl glass-card hover:neon-blue hover-scale transition-all duration-300 group data-[active=true]:gradient-primary data-[active=true]:neon-blue">
                    <a href={item.url} className="flex items-center gap-4">
                      <item.icon className="w-5 h-5 text-cyber-blue group-hover:text-white group-data-[active=true]:text-white transition-colors" />
                      <div className="flex flex-col text-left">
                        <span className="text-white font-medium text-sm leading-tight font-inter group-hover:text-glow">{item.title}</span>
                        <span className="text-cyber-blue/70 text-xs leading-tight font-inter">{item.subtitle}</span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-cyber-blue/20 p-4">
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="h-auto p-4 rounded-2xl glass-card hover:neon-purple hover-scale transition-all duration-300 group">
            <a href="/configuracoes" className="flex items-center gap-4">
              <Settings className="w-5 h-5 text-cyber-purple group-hover:text-white transition-colors" />
              <div className="flex flex-col text-left">
                <span className="text-white font-medium text-sm font-inter">Configurações</span>
                <span className="text-cyber-purple/70 text-xs font-inter">Ajuste sua experiência</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}
